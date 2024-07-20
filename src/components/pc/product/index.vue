<template>
  <main>
    <!-- banner-container -->
    <section class="banner-container">
      <swiper :options="bannerSwiperOptions" ref="bannerSwiper">
        <swiper-slide v-for="(item, i) in banner.visuels" :key="i">
          <img v-lazy="item.picPc" alt="">
        </swiper-slide>
      </swiper>
      <ul class="thumbs">
        <li
          v-for="(item, i) in banner.visuels"
          :key="i"
          :class="{'active': bannerSwiperActiveIndex == i}"
          @click="bannerSlide(i)"
        >
          <img v-lazy="item.thumb" alt="">
        </li>
      </ul>
      <div class="content">
        <div class="container fade-in-up">
          <div class="headline" v-html="banner.title"></div>
        </div>
      </div>
    </section>
    <!-- experience -->
    <section class="experience">
      <div class="container">
        <div class="block-subtitle fade-in-up once">
          <h2 v-html="expericence.title"></h2>
        </div>
        <ul class="visuels blocks-in-view once">
          <li
            v-for="(item, i) in expericence.visuelsPc"
            :key="i"
            class="visuel-single"
            v-lazy-container="{selector: 'img'}"
          >
            <img :data-src="item" alt="">
            <loader></loader>
          </li>
        </ul>
        <div class="content fade-in-up once">
          <div class="text-area">
            <div class="placeholder" v-html="expericence.desc"></div>
            <div class="text" v-html="expericence.desc"></div>
          </div>
        </div>
      </div>
    </section>
    <!-- creation-tool -->
    <section class="creation-tool">
      <div class="container">
        <div class="block-subtitle fade-in-up once">
          <h2 v-html="creationTool.title"></h2>
        </div>
        <div :class="['video-container', {'play': videoPlaying}]">
          <video muted preload loop autoplay @play="videoPlaying = true">
            <source :src="creationTool.videoUrl" type="video/mp4">
          </video>
          <img class="poster" v-lazy="creationTool.videoPoster" alt="">
          <div class="text1" v-html="creationTool.text1"></div>
          <div class="text2" v-html="creationTool.text2"></div>
        </div>
      </div>
    </section>
    <!-- props -->
    <section class="props">
      <div class="container">
        <div class="wrapper">
          <div class="visuel fade-in-up once">
            <img v-lazy="props.visuelPc" alt="">
          </div>
          <div class="content">
            <div class="block-subtitle fade-in-up once">
              <h2 v-html="props.title"></h2>
            </div>
            <div class="desc fade-in-up once" v-html="props.content"></div>
          </div>
        </div>
      </div>
    </section>
    <!-- avatar-clothing -->
    <section class="avatar-clothing">
      <div class="container">
        <div class="content">
          <div class="inner">
            <div class="block-subtitle fade-in-up once">
              <h2 v-html="avatarClothing.title"></h2>
            </div>
            <div class="desc fade-in-up once" v-html="avatarClothing.content"></div>
          </div>
          <div class="visuel">
            <img :src="avatarClothing.visuel" alt="">
          </div>
        </div>
      </div>
      <div class="avatar-clothing-visuels" ref="avatarClothingVisuels">
        <swiper
          v-if="avatarClothingSwiperVisible"
          :options="avatarClothingOptions"
          ref="avatarClothingSwiper"
        >
          <swiper-slide v-for="(item, i) in avatarClothing.slides" :key="i">
            <img :src="item" alt="">
          </swiper-slide>
        </swiper>
      </div>
    </section>
  </main>
</template>

<script>
import { inView } from '@/common/js/in-view'
import { textResponsive } from '@/common/js/text-responsive'
import { throttle } from '@/util/util'

export default {
  name: 'product-pc',

  props: ['banner', 'expericence', 'creation-tool', 'props', 'avatar-clothing'],

  components: {
    loader: () => import('@/components/loader')
  },

  data() {
    return {
      bannerSwiperActiveIndex: 0,
      bannerSwiperOptions: {
        speed: 500,
        allowTouchMove: false,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        effect: 'fade',
        on: {
          slideChangeTransitionStart: () => {
            this.bannerSwiperActiveIndex = this.bannerSwiper.activeIndex;
          },
          slideChangeTransitionEnd: () => {
            this.bannerSwiperActiveIndex = this.bannerSwiper.activeIndex;
          }
        }
      },
      videoPlaying: false,
      avatarClothingSwiperVisible: true,
      avatarClothingOptions: {
        observer: true,
        observeParents: true,
        watchOverflow: true,
        speed: 2000,
        slidesPerView: 'auto',
        allowTouchMove: false,
        loop: false
      }
    }
  },

  computed: {
    bannerSwiper() {
      return this.$refs.bannerSwiper.$el.swiper;
    },

    avatarClothingSwiper() {
      return this.$refs.avatarClothingSwiper.$el.swiper;
    }
  },

  mounted() {
    if (this.$root.ready) inView();
    textResponsive();

    // 更新 avatarClothingOptions
    var handler = throttle(this.updateAvatarClothingOptions);

    handler();
    window.addEventListener('resize', handler);

    this.$once('hook: beforeDestroy', function() {
      window.removeEventListener('resize', handler);
    });
  },

  methods: {
    bannerSlide(index) {
      this.bannerSwiper.slideTo(index);
    },

    updateAvatarClothingOptions() {
      if (!this.$refs.avatarClothingVisuels) return;

      var slidesWidth = this.$refs.avatarClothingVisuels.offsetHeight * this.avatarClothing.slides.length,
          sw = this.$refs.avatarClothingVisuels.offsetWidth,
          loop = true,
          autoplay = {
            delay: 0,
            disableOnInteraction: false
          };

      if (slidesWidth <= sw) {
        loop = false;
        autoplay = false;
      }

      this.avatarClothingOptions.loop = loop;
      this.avatarClothingOptions.autoplay = autoplay;
      this.avatarClothingSwiperVisible = false;

      this.$nextTick(function() {
        this.avatarClothingSwiperVisible = true;
      });
    }
  }
}
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>

<style scoped>
.avatar-clothing .swiper-container >>> .swiper-wrapper {
  -webkit-transition: transform 2s linear;
          transition: transform 2s linear;
}
</style>