<template>
  <main>
    <!-- banner-container -->
    <section class="banner-container">
      <div class="banner-visuel">
        <img v-lazy="banner.visuelMobile" alt="">
      </div>
      <div class="content fade-in-up">
        <div class="text-area">
          <div class="placeholder">
            <span>{{ banner.uppercase }}</span> {{ banner.contentMobile }}
          </div>
          <div class="text">
            <span>{{ banner.uppercase }}</span> {{ banner.contentMobile }}
          </div>
        </div>
      </div>
    </section>
    <!-- mission -->
    <section class="mission">
      <div class="container">
        <div class="block-subtitle fade-in-up once">
          <h2 v-html="mission.title"></h2>
        </div>
        <ul class="list" v-lazy-container="{selector: 'img'}">
          <li v-for="(item, i) in mission.list" :key="i" class="fade-in-up once">
            <div class="visuel-single">
              <img :data-src="item.visuelMobile" alt="">
              <loader></loader>
            </div>
            <div class="desc" v-html="item.descMobile"></div>
          </li>
        </ul>
      </div>
    </section>
    <!-- founder -->
    <section class="founder">
      <div class="container">
        <div class="block-subtitle fade-in-up once">
          <h2 v-html="founder.title"></h2>
        </div>
        <div class="members blocks-in-view once">
          <div
            v-for="(item, i) in founder.members"
            :key="i"
            class="item"
          >
            <div class="headline">
              <div class="founder-avatar">
                <img :src="item.avatar" alt="">
              </div>
              <div class="info">
                <div class="founder-name" v-html="item.name"></div>
                <p class="founder-post" v-html="item.post"></p>
              </div>
            </div>
            <div class="founder-introduction">
              <div class="text-area">
                <div class="placeholder" v-html="item.introductionMobile"></div>
                <div class="text" v-html="item.introductionMobile"></div>
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
        <ul class="list" v-lazy-container="{selector: 'img'}">
          <li
            v-for="(item, i) in milestones.list"
            :key="i"
            class="fade-in-up once"
          >
            <div class="pic"><img :data-src="item.pic" alt=""></div>
            <div class="desc">
              <p v-html="item.date"></p>
              <div v-html="item.content"></div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <!-- culture -->
    <section class="culture">
      <div class="container">
        <div class="block-subtitle fade-in-up once">
          <h2 v-html="culture.title"></h2>
        </div>
        <div class="list-container" v-lazy-container="{selector: 'img'}">
          <ul class="left">
            <template v-for="(item, i) in culture.listMobile">
              <li
                v-if="item.position == 'left'"
                :key="`left${i}`"
                class="fade-in-up once"
              >
                <div class="visuel-single">
                  <img :data-src="item.visuel" alt="">
                  <loader></loader>
                </div>
                <div class="content" v-html="item.content"></div>
              </li>
            </template>
          </ul>
          <ul class="right">
            <template v-for="(item, i) in culture.listMobile">
              <li
                v-if="item.position == 'right'"
                :key="`right${i}`"
                class="fade-in-up once"
              >
                <div class="visuel-single">
                  <img :data-src="item.visuel" alt="">
                  <loader></loader>
                </div>
                <div class="content" v-html="item.content"></div>
              </li>
            </template>
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

export default {
  name: 'about-mobile',

  props: ['banner', 'mission', 'founder', 'milestones', 'culture', 'locations'],

  components: {
    loader: () => import('@/components/loader')
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
