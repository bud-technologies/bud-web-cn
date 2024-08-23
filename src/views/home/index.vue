<template>
  <div class="home-page">
    <component
      :is="`home-${$root.env}`"
      :class="['main-container', { show: showMain }]"
      :banner="banner"
      :bud-club="budClub"
      :team="team"
      :investors="investors"
      :footerData="footerData"
    >
    </component>
  </div>
</template>

<script>
import { inViewObserver } from "@/common/js/in-view";
import { textResponsiveObserver } from "@/common/js/text-responsive";
import { getData } from "@/api/index";
import { dateFormat } from "@/common/js/date-format";

export default {
  name: "home",

  components: {
    homePc: () => import("@/components/pc/home"),
    homeMobile: () => import("@/components/mobile/home"),
  },

  data() {
    return {
      showMain: false,
      banner: {
        // videoUrl: `https://cdn.joinbudapp.com/bud-website-us-video/banner.mp4?${window.version}`,
        videoPoster: `${process.env.BASE_URL}/static/img/home/banner-s2.png?${window.version}`,
        visuelMobile: `${process.env.BASE_URL}/static/img/home/banner-visuel-s2.png?${window.version}`,
        slogan: "BUD碧优蒂的世界<br>S2赛季夏浪音乐节",
        sloganMobile: "BUD碧优蒂的世界<br>S2赛季夏浪音乐节",
        contentPc:
          "8月26日“夏浪音乐节”新赛季激情开启，狂热之夏，音浪来袭，放肆狂欢！",
        contentMobile:
          "8月26日“夏浪音乐节”新赛季激情开启<br>狂热之夏，音浪来袭，放肆狂欢！",
        downloadUrlEn: "https://linktr.ee/BUDcreate",
        downloadUrlCn:
          "https://webcdn.m.qq.com/webapp/homepage/index.html#/appDetail?apkName=com.pointone.buddy&info=1292423CB71192DE5C6A83244B2C6198",
        androidText: "安卓S2赛季下载",
        androidLink:
          "https://bud-package-1318932159.cos.ap-beijing.myqcloud.com/android/%E7%A2%A7%E4%BC%98%E8%92%82%E7%9A%84%E4%B8%96%E7%95%8C-%E5%AE%98%E6%9C%8D%E5%8C%85.apk",
        iosText: "苹果S2赛季下载",
        iosLink:
          "https://apps.apple.com/cn/app/bud-%E7%A2%A7%E4%BC%98%E8%92%82%E7%9A%84%E4%B8%96%E7%95%8C/id6450975322?l=en-GB",
        taptapText: "S2赛季下载",
        taptapLink: "https://l.taptap.cn/AsVbby8e?channel=rep-rep_yx3erlajttk",
      },
      budClub: {
        title: "真正的3D形象和互动内容UGC游戏平台",
        content:
          "每一位用户都可以借助低门槛、无代码的编辑器轻松创建个性化的3D形象和内容，用创作表达自我，通过社交和互动获得更多的乐趣。从定制专属人物形象，到解锁跑酷、赛车、射击类游戏和剧情地图等更多模式和玩法，一步步搭建自己的世界",
        visuels: [
          `${process.env.BASE_URL}/static/img/home/game-features-img1.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/home/game-features-img2.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/home/game-features-img3.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/home/game-features-img4.jpg?${window.version}`,
        ],
      },
      team: {
        title: "用科技和艺术点亮创造",
        content:
          "使命感&nbsp;&nbsp;&nbsp;热情&nbsp;&nbsp;&nbsp;创意&nbsp;&nbsp;&nbsp;执行力",
        visuelPc: `${process.env.BASE_URL}/static/img/home/team-visuel@pc.jpg?${window.version}`,
        visuelMobile: `${process.env.BASE_URL}/static/img/home/team-visuel@mobile.jpg?${window.version}`,
        logos: [
          `${process.env.BASE_URL}/static/img/home/team-logo1.svg?${window.version}`,
          `${process.env.BASE_URL}/static/img/home/team-logo2.svg?${window.version}`,
          `${process.env.BASE_URL}/static/img/home/team-logo3.svg?${window.version}`,
          `${process.env.BASE_URL}/static/img/home/team-logo4.svg?${window.version}`,
          `${process.env.BASE_URL}/static/img/home/team-logo5.svg?${window.version}`,
        ],
      },
      investors: {
        title: "投资机构",
        content:
          "公司已获得红杉印度、GGV纪源资本、ClearVue锴明投资、网易、北极光创投、启明创投、源码资本以及云九资本等主流投资机构的多轮融资支持。",
        contentMobile:
          "公司已获得红杉印度、GGV纪源资本、ClearVue锴明投资、网易、北极光创投、启明创投、源码资本以及云九资本等主流投资机构的多轮融资支持。",
        visuel: `${process.env.BASE_URL}/static/img/home/investor-visuel.jpg?${window.version}`,
        logos: [
          `${process.env.BASE_URL}/static/img/home/investor1.png?${window.version}`,
          `${process.env.BASE_URL}/static/img/home/investor2.png?${window.version}`,
          `${process.env.BASE_URL}/static/img/home/investor3.png?${window.version}`,
          `${process.env.BASE_URL}/static/img/home/investor4.png?${window.version}`,
          `${process.env.BASE_URL}/static/img/home/investor5.png?${window.version}`,
          `${process.env.BASE_URL}/static/img/home/investor6.png?${window.version}`,
          `${process.env.BASE_URL}/static/img/home/investor7.png?${window.version}`,
          `${process.env.BASE_URL}/static/img/home/investor8.png?${window.version}`,
        ],
      },
      news: [],
    };
  },

  created() {
    this.getNewsData();
  },

  watch: {
    showMain(cur) {
      if (!cur) return;

      var self = this;

      setTimeout(() => {
        inViewObserver(self, function () {
          self.$root.ready = true;
        });
      }, 300);
    },
  },

  mounted() {
    textResponsiveObserver(this);

    // 页面渐现
    setTimeout(() => {
      this.showMain = true;
    }, 300);
  },

  methods: {
    async getNewsData() {
      try {
        let res = await getData("indexarticle");

        if (res.status != 1) return;

        var newsList = [],
          item,
          i,
          length = Math.min(3, res.data.length);

        for (i = 0; i < length; i++) {
          item = res.data[i];
          item.adddate = dateFormat(item.adddate);
          newsList.push(item);
        }

        this.news = newsList;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
