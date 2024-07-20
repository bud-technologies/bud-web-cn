<template>
  <footer v-if="footerData" class="footer">
    <div class="container">
      <!-- <div class="footer-links">
        <a class="wechat" href="javascript:void(0);">
          关注我们
          <div class="qrcode">
            <img src="@/assets/img/wechat-qrcode.jpg" alt="" />
          </div>
        </a>
        <a
          href="javascript:void(0);"
          @click.stop="showEmail"
          v-clipboard:copy="footerData.email"
        >
          联系我们
          <transition name="email">
            <div v-show="isEmailShow" class="email-bubble">
              <span></span>
              <i>{{ footerData.email }}</i>
              <div class="copied">已复制</div>
            </div>
          </transition>
        </a>
        <a
          :href="footerData.pp_in_link"
          target="_blank"
          v-html="footerData.pp_copywriter"
        ></a>
        <a
          :href="footerData.ts_in_link"
          target="_blank"
          v-html="footerData.ts_copywriter"
        ></a>
      </div>
      <div class="socials">
        <a
          v-for="(item, i) in footerData.inlandlist"
          :key="i"
          :href="item.link ? item.link : 'javascript:void(0);'"
          :target="item.link ? '_blank' : '_self'"
        >
          <img :src="item.image" alt="" />
          <div v-if="item.qrimg" class="qrcode">
            <img :src="item.qrimg" alt="" />
          </div>
        </a>
      </div> -->
      <div class="copyright">
        <div class="container-icon">
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
        <div class="container-right">
          <div class="text" v-html="footerData.text"></div>
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
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "footer-pc",

  props: ["footer-data"],

  data() {
    return {
      isEmailShow: false,
    };
  },

  mounted() {
    window.addEventListener("scroll", this.hideEmail);
    document.addEventListener("click", this.hideEmail);

    this.$once("hook: beforeDestroy", function () {
      window.removeEventListener("scroll", this.hideEmail);
      document.removeEventListener("click", this.hideEmail);
    });

    console.log(this.footerData);
  },

  methods: {
    showEmail() {
      this.isEmailShow = true;
    },

    hideEmail() {
      this.isEmailShow = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
