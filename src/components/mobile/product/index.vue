<template>
  <main>
    <!-- banner-container -->
    <section class="banner-container">
      <swiper :options="bannerSwiperOptions" ref="bannerSwiper">
        <swiper-slide v-for="(item, i) in banner.visuels" :key="i">
          <img v-lazy="item.picMobile" alt="">
        </swiper-slide>
      </swiper>
      <div class="content blocks-in-view">
        <div class="slogan" v-html="banner.titleMobile"></div>
      </div>
    </section>
    <!-- experience -->
    <section class="experience">
      <div class="container">
        <div class="block-subtitle fade-in-up once">
          <h2 v-html="expericence.title"></h2>
        </div>
        <div class="content fade-in-up once">
          <div class="text-area">
            <div class="placeholder" v-html="expericence.desc"></div>
            <div class="text" v-html="expericence.desc"></div>
          </div>
        </div>
        <ul
          class="visuels blocks-in-view once"
          v-lazy-container="{selector: 'img'}"
        >
          <li
            v-for="(item, i) in expericence.visuelsMobile"
            :key="i"
            class="visuel-single"
          >
            <img :data-src="item" alt="">
            <loader></loader>
          </li>
        </ul>
      </div>
    </section>
    <!-- creation-tool -->
    <section class="creation-tool">
      <div class="container">
        <div class="block-subtitle fade-in-up once">
          <h2 v-html="creationTool.title"></h2>
        </div>
        <div class="text fade-in-up once">
          <div class="text-area">
            <div class="placeholder" v-html="creationTool.textMobile"></div>
            <div class="text" v-html="creationTool.textMobile"></div>
          </div>
        </div>
        <div class="visuel-single fade-in-up once">
          <img v-lazy="creationTool.visuelMobile" alt="">
          <loader></loader>
        </div>
      </div>
    </section>
    <!-- props -->
    <section class="props">
      <div class="container">
        <div class="block-subtitle fade-in-up once">
          <h2 v-html="props.title"></h2>
        </div>
        <div class="desc fade-in-up once">
          <div class="text-area">
            <div class="placeholder" v-html="props.content"></div>
            <div class="text" v-html="props.content"></div>
          </div>
        </div>
        <div class="visuel-single fade-in-up once">
          <img v-lazy="props.visuelMobile" alt="">
          <loader></loader>
        </div>
      </div>
    </section>
    <!-- avatar-clothing -->
    <section class="avatar-clothing">
      <div class="container">
        <div class="block-subtitle fade-in-up once">
          <h2 v-html="avatarClothing.title"></h2>
        </div>
        <div class="content fade-in-up once">
          <div class="text-area">
            <div class="placeholder" v-html="avatarClothing.content"></div>
            <div class="text" v-html="avatarClothing.content"></div>
          </div>
        </div>
        <div class="wrapper fade-in-up once">
          <swiper :options="avatarClothingOptions" ref="avatarClothingSwiper">
            <swiper-slide v-for="(item, i) in avatarClothing.slides" :key="i">
              <img :src="item" alt="">
            </swiper-slide>
          </swiper>
          <div class="visuel-single">
            <img :src="avatarClothing.visuel" alt="">
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { inView } from '@/common/js/in-view'
import { textResponsive } from '@/common/js/text-responsive'

export default {
  name: 'product-mobile',

  props: ['banner', 'expericence', 'creation-tool', 'props', 'avatar-clothing'],

  components: {
    loader: () => import('@/components/loader')
  },

  data() {
    return {
      bannerSwiperOptions: {
        speed: 500,
        allowTouchMove: false,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        effect: 'fade'
      },
      avatarClothingOptions: {
        observer: true,
        observeParents: true,
        watchOverflow: true,
        speed: 2000,
        slidesPerView: 'auto',
        allowTouchMove: false,
        loop: false,
        autoplay: false
      }
    }
  },

  created() {
    var length = this.avatarClothing.slides.length;

    if (length > 4) {
      this.avatarClothingOptions.loop = true;
      this.avatarClothingOptions.autoplay = { delay: 0 };
    }
  },

  mounted() {
    if (this.$root.ready) inView();
    textResponsive();
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
