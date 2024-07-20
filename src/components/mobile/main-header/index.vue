<template>
  <header :class="['header', { 'sticky': isSticky }]">
    <div class="container">
      <router-link class="logo" to="/"><img src="@/assets/img/logo.svg" alt=""></router-link>
      <p :class="{'show': isOpen}">导航</p>
      <div :class="['menu', {'open': isOpen}]" @click="toggler">
        <span></span><span></span><span></span>
      </div>
    </div>
    <div class="menu-container" ref="menuContainer">
      <ul>
        <li
          v-for="(item, i) in nav"
          :key="`nav${i}`"
          :class="{'active': item.name == $route.name}"
          @click="changePage(item)"
        >
          <router-link :to="item.link">{{ item.content }}</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { gsap } from 'gsap/all'
import { throttle } from '@/util/util'

export default {
  name: 'header-mobile',

  props: ['nav'],

  data() {
    return {
      isSticky: false,
      isOpen: false,
      tl: null
    }
  },

  watch: {
    $route() {
      // 切换页面时收起移动端导航
      var menuContainer = this.$refs.menuContainer;

      this.isOpen = false;

      gsap.to(menuContainer, {
        duration: 0.01,
        opacity: 0,
        onComplete() {
          gsap.set(menuContainer, { visibility: 'hidden' });
        }
      });

      this.tl.duration(0.01).reverse();

      // update 导航栏 sticky 状态
      this.canStick();
    },

    isOpen(cur) {
      var docBody = document.body;

      if (cur) {
        docBody.addEventListener('touchmove', this.stopScroll, { passive: false });
      } else {
        docBody.removeEventListener('touchmove', this.stopScroll, { passive: false });
      }
    }
  },

  mounted() {
    var self = this;

    // 移动端菜单动画
    this.tl = gsap.timeline({ paused: true, delay: 0.1 });

    this.tl.fromTo('.menu-container li', {
      opacity: 0,
      xPercent: -100
    }, {
      stagger: 0.1,
      opacity: 1,
      xPercent: 0
    }, 0.3);

    // 导航栏sticky状态
    var stickToggler = throttle(this.canStick);
    
    stickToggler();

    ['scroll', 'resize'].forEach(function(event) {
      window.addEventListener(event, stickToggler);
    });

    this.$once('hook: beforeDestroy', function() {
      ['scroll', 'resize'].forEach(function(event) {
        window.removeEventListener(event, stickToggler);
      });

      document.body.removeEventListener('touchmove', self.stopScroll, { passive: false });
    });
  },

  methods: {
    toggler() {
      var menuContainer = this.$refs.menuContainer;

      if (!menuContainer) return;
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        gsap.set(menuContainer, { visibility: 'visible' });
        gsap.to(menuContainer, { opacity: 1 });
        this.tl.duration(0.7).play();
      } else {
        gsap.to(menuContainer, {
          delay: 0.2,
          opacity: 0,
          onComplete() {
            gsap.set(menuContainer, { visibility: 'hidden' });
          }
        });

        this.tl.duration(0.6).reverse();
      }
    },

    canStick() {
      var scrollTop = document.documentElement.scrollTop || window.pageYOfset || document.body.scrollTop,
          header = this.$el,
          isSticky = header.classList.contains('sticky');

      if (scrollTop >= 50 && !isSticky) {
        this.isSticky = true;
        return;
      }

      if (scrollTop < 50 && isSticky) this.isSticky = false;
    },

    changePage(item) {
      if (item.name != this.$route.name) return;
      this.toggler();
    },

    stopScroll(e) {
      if (!this.isOpen) return;
      e.preventDefault();
    }
  }
}
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
