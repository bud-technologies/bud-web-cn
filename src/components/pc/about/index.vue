<template>
  <main>
    <!-- banner-container -->
    <section class="banner-container">
      <div class="visuel">
        <img v-lazy="banner.visuelPc" alt="">
      </div>
      <div class="container">
        <div class="content fade-in-up">
          <span>{{ banner.uppercase }}</span><i v-html="banner.content"></i>
        </div>
      </div>
    </section>
    <!-- mission -->
    <section class="mission">
      <div class="container">
        <div class="block-subtitle fade-in-up once">
          <h2 v-html="mission.title"></h2>
        </div>
        <div class="list fade-in-up once">
          <ul v-lazy-container="{selector: 'img'}">
            <li v-for="(item, i) in mission.list" :key="i">
              <div class="visuel-single">
                <img :data-src="item.visuel" alt="">
                <loader></loader>
              </div>
              <div class="desc" v-html="item.desc"></div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <!-- founder -->
    <section class="founder">
      <div class="container">
        <div class="block-subtitle fade-in-up once">
          <h2 v-html="founder.title"></h2>
        </div>
        <div class="members fade-in-up once">
          <div v-for="(item, i) in founder.members" :key="i" class="item">
            <div class="headline">
              <div class="info">
                <div class="founder-name" v-html="item.name"></div>
                <p class="founder-post" v-html="item.post"></p>
              </div>
              <div class="founder-avatar">
                <img :src="item.avatar" alt="">
              </div>
            </div>
            <div class="founder-introduction">
              <div class="text-area">
                <div class="placeholder" v-html="item.introduction"></div>
                <div class="text" v-html="item.introduction"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- milestones -->
    <section class="milestones">
      <div class="container">
        <div class="block-subtitle fade-in-up once">
          <h2 v-html="milestones.title"></h2>
        </div>
        <div class="timeline fade-in-up once">
          <swiper
            :key="swiperKey"
            :class="`view${slidePerView}`"
            ref="timelineSwiper"
            :options="timelineSwiperOptions"
          >
            <swiper-slide v-for="(item, i) in milestones.list" :key="i">
              <div class="pic"><img :src="item.pic" alt=""></div>
              <div class="date" v-html="item.date"></div>
              <div class="desc" v-html="item.content"></div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </section>
    <!-- culture -->
    <section class="culture">
      <div class="container">
        <div class="block-subtitle fade-in-up once">
          <h2 v-html="culture.title"></h2>
        </div>
        <div class="wrapper">
          <ul class="list fade-in-up once" v-lazy-container="{selector: 'img'}">
            <li
              v-for="(item, i) in culture.listPC"
              :key="i"
              :class="{'reverse': i % 2 > 0}"
            >
              <div class="visuel-single">
                <img :data-src="item.visuel" alt="">
                <loader></loader>
              </div>
              <div class="content" v-html="item.content"></div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <!-- locations -->
    <section class="locations">
      <div class="container">
        <div class="block-subtitle fade-in-up once">
          <h2 v-html="locations.title"></h2>
        </div>
        <ul class="address blocks-in-view once">
          <li v-for="(item, i) in locations.address" :key="i">{{ item }}</li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script>
import { inView } from '@/common/js/in-view'
import { textResponsive } from '@/common/js/text-responsive'
import { throttle } from '@/util/util'

export default {
  name: 'about-pc',

  props: ['banner', 'mission', 'founder', 'milestones', 'culture', 'locations'],

  components: {
    loader: () => import('@/components/loader')
  },

  data() {
    return {
      swiperKey: 0,
      slidePerView: 5,
      timelineSwiperOptions: {
        observer: true,
        autoHeight: true,
        watchOverflow: true,
        slidesPerView: 5,
        freeMode: true,
        allowTouchMove: false,
        loop: false,
        speed: 3000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false
        }
      }
    }
  },

  mounted() {
    if (this.$root.ready) inView();
    textResponsive();

    // 更新 swiper
    var handler = throttle(this.updateSwiper);

    handler();
    window.addEventListener('resize', handler);

    this.$once('hook: beforeDestroy', function() {
      window.removeEventListener('resize', handler);
    });
  },

  methods: {
    updateSwiper() {
      var sw = window.innerWidth || document.documentElement.clientWidth,
          length = this.milestones.list.length;

      if (sw < 992) {
        this.slidePerView = 3;
      } else {
        this.slidePerView = 5;
      }

      this.$set(this.timelineSwiperOptions, 'slidesPerView', this.slidePerView);

      if (length > this.slidePerView) {
        this.$set(this.timelineSwiperOptions, 'loop', true);
      } else {
        this.$set(this.timelineSwiperOptions, 'loop', false);
      }

      this.swiperKey++;
    }
  }
}
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>

<style scoped>
.milestones .timeline .swiper-container >>> .swiper-wrapper {
  align-items: stretch;
  height: auto !important;
  -webkit-transition: transform 3s linear;
          transition: transform 3s linear;
}
</style>