<template>
  <div class="news-page">
    <component
      :is="`news-${$root.env}`"
      :class="['main-container', {'show': showMain}]"
      :banner="banner"
      :top-news="topNews"
      :titles="titles"
      :news="news"
    >
      <!-- load-more -->
      <transition name="fade">
        <div
          v-if="(loading || pageIndex < pages) && this.$root.ready"
          :class="['load-more', {'disabled': loading}]"
          @click="loadmore"
        >
          <span v-show="loading">加载中...</span>
          <span v-show="!loading">更多动态</span>
        </div>
      </transition>
      <!-- to-top -->
      <transition name="fade">
        <div v-show="pageIndex > 1" class="to-top" @click="goToTop">
          <span></span>
        </div>
      </transition>
    </component>
  </div>
</template>

<script>
import { inViewObserver } from '@/common/js/in-view'
import { textResponsiveObserver } from '@/common/js/text-responsive'
import { getData } from '@/api/index'
import { dateFormat } from '@/common/js/date-format'
import { gsap, ScrollToPlugin } from 'gsap/all'
import { throttle } from '@/util/util'

export default {
  name: 'news',

  components: {
    newsPc: () => import('@/components/pc/news'),
    newsMobile: () => import('@/components/mobile/news')
  },

  data() {
    return {
      showMain: false,
      titles: {
        topNews: '推荐阅读',
        latestNews: '最新动态'
      },
      banner: {
        title: '新闻动态',
        visuelPc: [
          `${process.env.BASE_URL}/static/img/news/news-banner-viduel1@pc.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/news/news-banner-viduel2@pc.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/news/news-banner-viduel3@pc.jpg?${window.version}`
        ],
        visuelMobile: [
          `${process.env.BASE_URL}/static/img/news/news-banner-viduel1@mobile.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/news/news-banner-viduel2@mobile.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/news/news-banner-viduel3@mobile.jpg?${window.version}`
        ]
      },
      topNews: '',
      news: [],
      pagePerView: 6,
      pageIndex: 0,
      pages: 0,
      count: 0,
      loading: false,
      scrollTopCache: 0,
      scrollTop: 0
    }
  },

  watch: {
    showMain(cur) {
      if (!cur) return;

      var self = this;

      setTimeout(() => {
        inViewObserver(self, function() {
          self.$root.ready = true;
        });
      }, 300);
    }
  },

  created() {
    gsap.registerPlugin(ScrollToPlugin);
    this.getTopNews();

    // 判断是否读取缓存
    var newsCache = JSON.parse(localStorage.getItem('newsCache')),
        status = this.$route.params.status;

    if ((this.$root.fromHistory && newsCache) || status) {
      this.pageIndex = newsCache.pageIndex;
      this.pages = newsCache.pages;
      this.count = newsCache.count;
      this.news = newsCache.news;
      if (status) this.scrollTop = newsCache.scrollTop;
    } else {
      localStorage.removeItem('newsCache');
      this.getNewsData(this.pageIndex + 1);
    }
  },

  mounted() {    
    var self = this;

    // 记录滚动高度
    var savePositionHandler = throttle(this.savePosition);

    savePositionHandler();

    ['scroll', 'resize'].forEach(function(event) {
      window.addEventListener(event, savePositionHandler);
    });

    this.$once('hook: beforeDestroy', function() {
      ['scroll', 'resize'].forEach(function(event) {
        window.removeEventListener(event, savePositionHandler);
      });
    });

    textResponsiveObserver(this);

    // 页面渐现
    setTimeout(() => {
      if (self.scrollTop > 0) {
        gsap.to(window, {
          duration: 0.1, scrollTo: self.scrollTop, autoKill: true
        });
      }

      self.showMain = true;
    }, 300);
  },

  methods: {
    // 获取top news数据
    async getTopNews() {
      try {
        let res = await getData('topnewsinfo');

        if (res.status != 1) {
          this.topNews = null;
          return;
        }
        
        res.data.adddate = dateFormat(res.data.adddate);
        // res.data.title = upperCase(res.data.title);
        this.topNews = res.data;
      } catch(error) {
        console.log(error);
      }
    },

    // 获取新闻列表数据
    async getNewsData(page) {
      try {
        if (this.loading) return;
        this.loading = true;

        let res = await getData('articlelist', { page: page });

        if (res.status != 1 || res.data.list.length == 0) {
          this.loading = false;
          return;
        }

        this.updateNewsList(res.data);
      } catch(error) {
        console.log(error);
      }
    },

    // 更新新闻列表
    updateNewsList(data) {
      var self = this;

      this.pageIndex = this.pageIndex + 1;
      this.count = data.count;
      this.pages = Math.ceil(this.count / this.pagePerView);

      data.list.forEach(function(item) {
        item.adddate = dateFormat(item.adddate);
        self.news.push(item);
      });

      this.$nextTick(function() {
        this.loading = false;
      });

      this.updateCache();
    },

    // 记录滚动位置
    savePosition() {
      this.scrollTopCache = document.documentElement.scrollTop || window.pageYOfset || document.body.scrollTop;
    },

    // 更新缓存
    updateCache() {
      var newsCache = {
        pageIndex: this.pageIndex,
        pages: this.pages,
        count: this.count,
        news: this.news,
        scrollTop: this.scrollTopCache
      };

      localStorage.setItem('newsCache', JSON.stringify(newsCache));
    },

    // 加载更多
    loadmore() {
      if (!this.$root.ready || this.loading || this.pages <= this.pageIndex) return;
      this.getNewsData(this.pageIndex + 1);
    },

    // 返回顶部
    goToTop() {
      gsap.to(window, { duration: 0.8, scrollTo: 0, autoKill: true });
    }
  }
}
</script>

<style scoped lang="scss">
.load-more {
  @include flex-center;
  margin: 1.76rem auto 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.12rem;
  @include size(1.86rem, 0.4rem);
  cursor: pointer;

  &.disabled { pointer-events: none; }

  & > span {
    position: relative;
    padding-bottom: 1px;
    font-size: 0.16rem;
    line-height: 1;
    color: #fff;
    @include transition(#{ transform 0.15s ease-out });

    &:after {
      position: absolute;
      top: 50%;
      left: 100%;
      margin-top: -4px;
      margin-left: 8px;
      @include size(4px, 8px);
      @include bg-img("icon-arrow.svg");
      opacity: 0;
      @include transition(#{ all 0.15s ease-out });
      @include transform(#{ translateX(120%) });
      content: "";
    }
  }

  &:hover > span {
    @include transform(#{ translateX(-6px) });

    &:after {
      opacity: 1;
      @include transform(#{ translateX(0) });
    }
  }

  @media screen and (max-width: $screen-xl-max) {
    width: responsive(144);

    & > span { font-size: responsive(14); }
  }

  @media screen and (max-width: $screen-xs-max) {
    margin: 0.4rem auto 0;
    border: 0.02rem solid rgba(255, 255, 255, 0.2);
    border-radius: 0.16rem;
    @include size(2rem, 0.6rem);

    & > span {
      font-size: 0.24rem;

      &:after {
        margin-top: -0.08rem;
        margin-left: 0.1rem;
        @include size(0.08rem, 0.16rem);
      }
    }

    &:hover > span { @include transform(#{ translateX(-0.09rem) }); }
  }
}
</style>
