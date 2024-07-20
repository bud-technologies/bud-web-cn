<template>
  <footer v-if="footerData" class="footer">
    <div class="container">
      <!-- <div class="footer-links">
        <p>
          <a class="wechat" href="javascript:void(0);" @touchstart.stop="showWechat(item, i)">
            关注我们
            <div :class="['qrcode', {'show': wechatShow}]">
              <img src="@/assets/img/wechat-qrcode.jpg" alt="">
            </div>
          </a>
        </p>
        <p>
          <a
            href="javascript:void(0);"
            @touchstart.stop="showEmail"
            v-clipboard:copy="footerData.email"
          >
            联系我们
            <div :class="['email-bubble', {'show': isEmailShow}]">
              <span></span>
              <i>{{ footerData.email }}</i>
              <div class="copied">已复制</div>
            </div>
          </a>
        </p>
        <p><a :href="footerData.pp_in_link" target="_blank" v-html="footerData.pp_copywriter"></a></p>
        <p><a :href="footerData.ts_in_link" target="_blank" v-html="footerData.ts_copywriter"></a></p>
      </div> -->
      <div class="copyright">
        <div class="icon-tab">
          <img
            class="logo-icon"
            src="@/assets/img/footer-icons/logo.png"
            alt="footer logo"
          />
          <img
            class="age-icon"
            src="@/assets/img/footer-icons/age.png"
            alt="android icon"
          />
        </div>
        <div class="text-tab">
          <div class="text" v-html="footerData.textMobile"></div>
          <div class="links-tab">
            <a
              class="link"
              :href="footerData.userAgreementLink"
              target="_blank"
              >{{ footerData.userAgreement }}</a
            >
            <p class="link-span">｜</p>
            <a
              class="link"
              :href="footerData.privacyPolicyLink"
              target="_blank"
              >{{ footerData.privacyPolicy }}</a
            >
            <p class="link-span">｜</p>
            <a
              class="link"
              :href="footerData.childrenPrivacyPolicyLink"
              target="_blank"
              >{{ footerData.childrenPrivacyPolicy }}</a
            >
          </div>
          <div class="text tip" v-html="footerData.mobileTipText"></div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "footer-mobile",

  props: ["footer-data"],

  data() {
    return {
      isEmailShow: false,
      showIndex: "",
      wechatShow: false,
    };
  },

  mounted() {
    document.addEventListener("touchstart", this.hideEmail);
    document.addEventListener("touchstart", this.hideQrcode);
    document.addEventListener("touchstart", this.hideWechat);

    this.$once("hook: beforeDestroy", function () {
      document.removeEventListener("touchstart", this.hideEmail);
      document.removeEventListener("touchstart", this.hideQrcode);
      document.removeEventListener("touchstart", this.hideWechat);
    });
  },

  updated() {
    console.log(this.footerData);
  },

  methods: {
    showEmail() {
      this.isEmailShow = true;
      this.hideQrcode();
    },

    hideEmail() {
      this.isEmailShow = false;
    },

    showQrcode(data, i) {
      if (!data.qrimg) return;
      this.showIndex = i;
      this.hideEmail();
    },

    hideQrcode() {
      this.showIndex = "";
    },

    showWechat() {
      this.wechatShow = true;
      this.hideQrcode();
      this.hideEmail();
    },

    hideWechat() {
      this.wechatShow = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
