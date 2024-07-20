<template>
  <main>
    <div v-if="detail" class="container fade-in-up once">
      <div class="news-title">
        <div class="text-area">
          <div class="placeholder" v-html="detail.title"></div>
          <div class="text" v-html="detail.title"></div>
        </div>
      </div>
      <div v-if="detail.source" class="info">
        <i>{{ detail.source }}</i>{{ detail.adddate }}
      </div>
      <div v-else class="info">{{ detail.adddate }}</div>
      <div class="details" v-html="detail.content" ref="details"></div>
      <router-link class="view-more go-back" :to="{name: 'news', params: {status: 1}}">
        <span>返回</span>
      </router-link>
    </div>
  </main>
</template>

<script>
import { inView } from '@/common/js/in-view'
import { textResponsive } from '@/common/js/text-responsive'

export default {
  name: 'news-details-mobile',

  props: ['detail', 'top-news', 'news'],

  watch: {
    detail() {
      this.$nextTick(function() {
        if (this.$root.ready) inView();
        textResponsive();
      });
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
