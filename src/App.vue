<template>
  <div id="app" :class="$root.system">
    <loader class="loader-full"></loader>
    <component :is="`header-${$root.env}`" :nav="nav"></component>
    <router-view class="template-page" />
    <component
      :is="`footer-${$root.env}`"
      :footer-data="footerData"
    ></component>
  </div>
</template>

<script>
import { getData } from "@/api/index";
import { initScreen } from "@/util/util";
import { gsap } from "gsap/all";
import { initWXShare } from "@/common/js/weixin-share";

export default {
  name: "App",

  components: {
    loader: () => import("@/components/loader"),
    headerPc: () => import("@/components/pc/main-header"),
    headerMobile: () => import("@/components/mobile/main-header"),
    footerPc: () => import("@/components/pc/main-footer"),
    footerMobile: () => import("@/components/mobile/main-footer"),
  },

  data() {
    return {
      nav: [
        { content: "首页", link: "/", name: "home" },
        { content: "关于我们", link: "/about", name: "about" },
        { content: "产品信息", link: "/product", name: "product" },
        // { content: '新闻动态', link: '/news', name: 'news' },
        { content: "加入我们", link: "/join-us", name: "join-us" },
      ],
      footerData: {
        // //粤ICP备19124963号-2   ->  https://www.budapp.cn
        // text:
        //   "本公司游戏产品适合8岁（含）以上玩家娱乐<br>" +
        //   "抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活<br>" +
        //   `<a style="color: rgba(0, 0, 0, 0.45)" href="https://www.beianx.cn/search/budapp.cn"  target="_blank"> 粤ICP备19124963号-2 </a>出版许可证号：网出证（粤）字第005号 出版物号：ISBN 978-7-498-13394-6 <br> 审批文号：国新出审〔2024〕796号 著作权人：深圳零点一娱乐科技有限公司 出版单位：广东海燕电子音像出版社有限公司<br>  ` +
        //   "客服邮箱：contact@pointone.tech 商务合作：bd@pointone.tech <br>" +
        //   "公司地址：深圳市南山区粤海街道高新区社区高新南十道16号金地威新中心A座1607",
        // textMobile:
        //   "本公司游戏产品适合8岁（含）以上玩家娱乐<br>" +
        //   `<a style="color: rgba(0, 0, 0, 0.45)" href="https://www.beianx.cn/search/budapp.cn"  target="_blank"> 粤ICP备19124963号-2 </a>出版许可证号：网出证（粤）字第005号 <br> 出版物号：ISBN 978-7-498-13394-6 <br> 审批文号：国新出审〔2024〕796号 著作权人：深圳零点一娱乐科技有限公司 出版单位：广东海燕电子音像出版社有限公司<br>  ` +
        //   "客服邮箱：contact@pointone.tech<br> 商务合作：bd@pointone.tech <br>" +
        //   "公司地址：深圳市南山区粤海街道高新区社区高新南十道16号金地威新中心A座1607",

        // //粤ICP备19124963号-1    ->  https://www.pointone.tech/
        text:
          "本公司游戏产品适合8岁（含）以上玩家娱乐<br>" +
          "抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活<br>" +
          `<a style="color: rgba(0, 0, 0, 0.45)" href="https://www.beianx.cn/search/pointone.tech"  target="_blank"> 粤ICP备19124963号-1  </a>出版许可证号：网出证（粤）字第005号 出版物号：ISBN 978-7-498-13394-6 <br> 审批文号：国新出审〔2024〕796号 著作权人：深圳零点一娱乐科技有限公司 出版单位：广东海燕电子音像出版社有限公司<br>  ` +
          "客服邮箱：contact@pointone.tech 商务合作：bd@pointone.tech <br>" +
          "公司地址：深圳市南山区粤海街道高新区社区高新南十道16号金地威新中心A座1607",
        textMobile:
          "本公司游戏产品适合8岁（含）以上玩家娱乐<br>" +
          `<a style="color: rgba(0, 0, 0, 0.45)" href="https://www.beianx.cn/search/pointone.tech"  target="_blank"> 粤ICP备19124963号-1  </a>出版许可证号：网出证（粤）字第005号 <br> 出版物号：ISBN 978-7-498-13394-6 <br> 审批文号：国新出审〔2024〕796号 著作权人：深圳零点一娱乐科技有限公司 出版单位：广东海燕电子音像出版社有限公司<br>  ` +
          "客服邮箱：contact@pointone.tech<br> 商务合作：bd@pointone.tech <br>" +
          "公司地址：深圳市南山区粤海街道高新区社区高新南十道16号金地威新中心A座1607",

        userAgreement: "用户协议",
        userAgreementLink: "https://buddy.budapp.cn/policy/permission.html",
        privacyPolicy: "隐私政策",
        privacyPolicyLink: "https://buddy.budapp.cn/policy/privacy.html",
        childrenPrivacyPolicy: "儿童隐私政策",
        childrenPrivacyPolicyLink:
          "https://buddy.budapp.cn/policy/childrenPolicy.html",
        mobileTipText:
          "抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当<br>适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活",
      },
    };
  },

  watch: {
    $route(to) {
      setTimeout(() => {
        this.setenv();
      }, 300);
      this.$root.ready = false;
      initWXShare();
      if (to.name != "news") this.$root.fromHistory = false;
    },
  },

  created() {
    var self = this;

    // gsap 通用配置
    gsap.defaults({
      duration: 0.5,
      overwrite: true,
      ease: "power3.out",
    });

    window.addEventListener(
      "popstate",
      function () {
        self.$root.fromHistory = true;
      },
      false
    );

    // 获取页脚信息
    this.getFooterInfo();
  },

  mounted() {
    // 判断移动还是pc
    this.setenv();
    window.addEventListener("resize", this.setenv);
    setTimeout(() => {
      this.setenv();
    }, 300);

    // 判断系统
    this.$root.system = this.getSystem();
  },

  methods: {
    setenv() {
      let size = initScreen(),
        env = "pc";

      if (size.w > 768) {
        env = "pc";
      } else {
        env = "mobile";
      }

      this.$root.env = env;
    },

    getSystem() {
      var agent = navigator.userAgent.toLowerCase(),
        iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
        MAC =
          /macintosh|mac os x/i.test(navigator.userAgent) && !window.MSStream,
        android = /Android/.test(navigator.userAgent) && !window.MSStream;

      if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
        return "windows"; // 此处根据需求调整
      }

      if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
        return "windows"; // 此处根据需求调整
      }

      if (iOS) {
        return "iphone";
      }

      if (MAC) {
        return "mac";
      }

      if (android) {
        return "andriod";
      }

      return "unknow";
    },

    // 获取页脚信息
    async getFooterInfo() {
      try {
        let res = await getData("footerinfo");

        if (res.status != 1) return;
        this.footerData = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/css/reset.css";
@import "~@/assets/css/comm.scss";
</style>
