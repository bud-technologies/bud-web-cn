<template>
  <div class="news-details-page">
    <component
      :is="`news-details-${$root.env}`"
      :class="['main-container', {'show': showMain}]"
      :detail="detail"
      :top-news="topNews"
      :news="news"
    >
    </component>
  </div>
</template>

<script>
import { inViewObserver } from '@/common/js/in-view'
import { textResponsiveObserver } from '@/common/js/text-responsive'
import { getData } from '@/api/index'
import { dateFormat } from '@/common/js/date-format'

export default {
  name: 'news-details-preview',

  components: {
    newsDetailsPc: () => import('@/components/pc/news-details'),
    newsDetailsMobile: () => import('@/components/mobile/news-details')
  },

  data() {
    return {
      showMain: false,
      detail: '',
      topNews: '',
      news: []
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
    },

    $route(newVal) {
      if (newVal.name == 'news-details') this.$router.go(0);
    },

    detail() {
      var self = this;

      setTimeout(function() {
        self.showMain = true;
      }, 300);
    },
  },

  created() {
    this.getNewsDetail();
    this.getTopNews();
    this.getNewsData();
  },

  mounted() {
    textResponsiveObserver(this);
  },

  methods: {
    // 获取新闻详情
    async getNewsDetail() {
      var self = this,
          newsID = this.$route.query.id;

      try {
        let res = await getData('articleinfo', { id: newsID });

        if (res.status == 1) {
          res.data.adddate = dateFormat(res.data.adddate);
          res.data.content = this.updateContent(res.data.content)
          this.detail = res.data;
        }

        setTimeout(function() {
          self.showMain = true;
        }, 300);
      } catch(error) {
        console.log(error);
      }
    },

    // 获取top news数据
    async getTopNews() {
      try {
        let res = await getData('topnewsinfo');

        if (res.status != 1) return;
        this.topNews = res.data;
      } catch(error) {
        console.log(error);
      }
    },

    // 获取新闻列表数据
    async getNewsData() {
      try {
        let res = await getData('articlelist', { page: 1 });

        if (res.status != 1) return;

        var list = res.data.list, i, length = list.length;

        for (i = 0; i < length; i++) {
          var item = list[i];
          
          item.adddate = dateFormat(item.adddate);
          this.news.push(item);
          if (i >= 2) break;
        }
      } catch(error) {
        console.log(error);
      }
    },

    updateContent(content) {
      var reg1 = /\[video \([^\]]+\) \/video\]/gi,
          reg2 = /><\/video><img[^>]+\/>/gi,
          reg3 = /(http|https).+?(.jpg|.jpeg|png)/gi;

      // 转化成video标签
      var result = content.replace(reg1, s => {
        var output = s.replace(/\[video \(/, '<video preload controls src="');

        output = output.replace(/\) \/video\]/, '"></video>');
        return output;
      });

      // 设置视频封面
      result = result.replace(reg2, s => {
        var poster = s.match(reg3);

        if (poster.length > 0) {
          return ` poster="${poster[0]}"></video>`;
        } else {
          return s;
        }
      });

      return result;
    }
  }
}
</script>

<style>
.news-details-page .details img {
  display: block;
  margin-right: auto;
  margin-left: auto;
  border-radius: 0.12rem;
  max-width: 100%;
}

.news-details-page .details a { color: rgba(255, 255, 255, 0.5); }
.news-details-page .details a:hover { text-decoration: underline; }

.news-details-page .details video {
  display: block;
  overflow: hidden;
  border-radius: 0.12rem;
  width: 100%;
  object-fit: cover;
}
</style>
