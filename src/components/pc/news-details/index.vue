<template>
  <main>
    <div class="container fade-in-up once">
      <div class="side-layer">
        <div v-if="topNews" class="top-news">
          <div :class="['block-subtitle', {'active': topNews.id === detail.id}]">
            <h2>推荐阅读</h2>
          </div>
          <a
            v-if="topNews.link"
            :class="{'active': topNews.id === detail.id}"
            href="javascript:void(0);"
            @click="newsItemClicked(topNews)"
            v-html="topNews.title"
          >
          </a>
          <router-link
            v-else
            :class="{'active': topNews.id === detail.id}"
            :to="{name: 'news-details', query: {id: topNews.id}}"
            v-html="topNews.title"
          >
          </router-link>
        </div>
        <div class="last-news">
          <div class="block-subtitle" ref="blockSubtitle"><h2>最新动态</h2></div>
          <template v-for="(item, i) in news">
            <a
              v-if="item.link"
              :key="i"
              :class="{'active': item.id === detail.id}"
              href="javascript:void(0);"
              @click="newsItemClicked(item)"
              v-html="item.title"
            >
            </a>
            <router-link
              v-else
              :class="{'active': item.id === detail.id}"
              :key="i"
              :to="{name: 'news-details', query: {id: item.id}}"
              v-html="item.title"
            >
            </router-link>
          </template>
        </div>
      </div>
      <div v-if="detail" class="news-details">
        <div class="block-subtitle">
          <h2 v-html="detail.title"></h2>
        </div>
        <div v-if="detail.source" class="info">
          <i>{{ detail.source }}</i>{{ detail.adddate }}
        </div>
        <div v-else class="info">{{ detail.adddate }}</div>
        <div class="details" v-html="detail.content"></div>
        <router-link class="view-more go-back" :to="{name: 'news', params: {status: 1}}">
          <span>返回</span>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import { inView } from '@/common/js/in-view'
import { textResponsive } from '@/common/js/text-responsive'
import { getData } from '@/api/index'

export default {
  name: 'news-details-pc',

  props: ['detail', 'top-news', 'news'],

  watch: {
    detail() {
      this.$nextTick(function() {
        if (this.$root.ready) inView();
        textResponsive();
        this.updateSideMenu();
      });
    },

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
        this.updateSideMenu();
      });
    }
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
    },

    updateSideMenu() {
      if (!this.news || this.news.length == 0 || !this.detail) return;

      this.news.forEach((item, i) => {
        if (i > 2) return;
        console.log(item.id, this.detail.id)
        if (item.id === this.detail.id) {
          this.$refs.blockSubtitle.classList.add('active');
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
