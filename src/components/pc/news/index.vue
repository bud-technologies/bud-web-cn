<template>
  <main>
    <div class="container">
      <!-- banner-container -->
      <section v-if="topNews === null" class="banner-container">
        <div class="visuel"><img v-lazy="bannerVisuel"></div>
        <div class="title fade-in-up" v-html="banner.title"></div>
      </section>
      <!-- top-news-container -->
      <section v-else class="top-news-container">
        <div v-if="topNews" class="visuel">
          <img v-lazy="topNews.pcimg ? topNews.pcimg : bannerVisuel">
        </div>
        <div v-if="topNews" class="content blocks-in-view">
          <div class="title">
            <div class="text-area">
              <div class="placeholder" v-html="topNews.title"></div>
              <div class="text" v-html="topNews.title"></div>
            </div>
          </div>
          <div class="desc">
            <div class="text-area">
              <div class="placeholder" v-html="topNews.summary"></div>
              <div class="text" v-html="topNews.summary"></div>
            </div>
          </div>
          <div v-if="topNews.source" class="info">
            <i>{{ topNews.source }}</i>{{ topNews.adddate }}
          </div>
          <div v-else class="info">{{ topNews.adddate }}</div>
          <a
            v-if="topNews.link"
            class="view-more"
            href="javascript:void(0);"
            @click="newsItemClicked(topNews)"
          >
            <span>了解更多</span>
          </a>
          <router-link
            v-else
            class="view-more"
            :to="{name: 'news-details', query: {id: topNews.id}}"
            target="_blank"
          >
            <span>了解更多</span>
          </router-link>
        </div>
      </section>
      <!-- news-container -->
      <section class="news-container">
        <div class="block-subtitle fade-in-up once">
          <h2 v-html="titles.latestNews"></h2>
        </div>
        <div class="news-wrapper">
          <div class="news-list">
            <template v-for="(item, i) in news">
              <a
                v-if="item.link"
                :key="i"
                class="news-item fade-in-up once"
                href="javascript:void(0);"
                @click="newsItemClicked(item)"
              >
                <div class="visuel-single">
                  <img v-lazy="item.preimage" alt="">
                  <loader></loader>
                </div>
                <div class="title">
                  <div class="text-area">
                    <div class="placeholder" v-html="item.title"></div>
                    <div class="text" v-html="item.title"></div>
                  </div>
                </div>
                <div class="desc">
                  <div class="text-area">
                    <div class="placeholder" v-html="item.summary"></div>
                    <div class="text" v-html="item.summary"></div>
                  </div>
                </div>
                <div v-if="item.source" class="info">
                  <i>{{ item.source }}</i>{{ item.adddate }}
                </div>
                <div v-else class="info">{{ item.adddate }}</div>
                <div class="view-more"><span>了解更多</span></div>
              </a>
              <router-link
                v-else
                :key="i"
                class="news-item fade-in-up once"
                :to="{name: 'news-details', query: {id: item.id}}"
                target="_blank"
              >
                <div class="visuel-single">
                  <img v-lazy="item.preimage" alt="">
                  <loader></loader>
                </div>
                <div class="title">
                  <div class="text-area">
                    <div class="placeholder" v-html="item.title"></div>
                    <div class="text" v-html="item.title"></div>
                  </div>
                </div>
                <div class="desc">
                  <div class="text-area">
                    <div class="placeholder" v-html="item.summary"></div>
                    <div class="text" v-html="item.summary"></div>
                  </div>
                </div>
                <div v-if="item.source" class="info">
                  <i>{{ item.source }}</i>{{ item.adddate }}
                </div>
                <div v-else class="info">{{ item.adddate }}</div>
                <div class="view-more"><span>了解更多</span></div>
              </router-link>
            </template>
          </div>
        </div>
      </section>
    </div>
    <slot></slot>
  </main>
</template>

<script>
import { inView } from '@/common/js/in-view'
import { textResponsive } from '@/common/js/text-responsive'
import { getData } from '@/api/index'

export default {
  name: 'news-pc',

  props: ['banner', 'top-news', 'titles', 'news'],

  components: {
    loader: () => import('@/components/loader')
  },

  watch: {
    topNews() {
      this.$nextTick(function() {
        if (this.$root.ready) inView();
        textResponsive();
      });
    },

    news() {
      this.$nextTick(function() {
        if (this.$root.ready) inView();
        textResponsive();
      });
    }
  },

  created() {
    // banner默认背景图
    var visuels = this.banner.visuelPc,
        r = parseInt(Math.random() * visuels.length);

    this.bannerVisuel = visuels[r];
  },

  mounted() {
    if (this.$root.ready) inView();
    textResponsive();
  },

  methods: {
    // 点击新闻
    newsItemClicked(news) {
      this.getNewsDetail(news.id, function() {
        window.open(news.link);
      });
    },

    // 新闻详情接口，浏览量+1
    async getNewsDetail(id, callback) {
      try {
        await getData('articleinfo', { id: id });
        callback && callback();
      } catch(error) {
        console.log(error);
        callback && callback();
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
