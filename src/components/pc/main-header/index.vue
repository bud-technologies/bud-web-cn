<template>
  <header :class="['header', { 'sticky': isSticky }]">
    <div class="container">
      <router-link class="logo" to="/"><img src="@/assets/img/logo.svg" alt=""></router-link>
      <nav class="navigation">
        <router-link
          v-for="(item, i) in nav"
          :key="`nav${i}`"
          :class="{'active': item.name == $route.name}"
          :to="item.link"
        >
          {{ item.content }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import { throttle } from '@/util/util'

export default {
  name: 'header-pc',

  props: ['nav'],
  
  data() {
    return {
      isSticky: false
    }
  },

  watch: {
    $route() {
      this.canStick();
    }
  },

  mounted() {
    var stickToggler = throttle(this.canStick);
    
    stickToggler();

    ['scroll', 'resize'].forEach(function(event) {
      window.addEventListener(event, stickToggler);
    });

    this.$once('hook: beforeDestroy', function() {
      ['scroll', 'resize'].forEach(function(event) {
        window.removeEventListener(event, stickToggler);
      });
    });
  },

  methods: {
    canStick() {
      var scrollTop = document.documentElement.scrollTop || window.pageYOfset || document.body.scrollTop,
          header = this.$el,
          isSticky = header.classList.contains('sticky');

      if (scrollTop >= 50 && !isSticky) {
        this.isSticky = true;
        return;
      }

      if (scrollTop < 50 && isSticky) this.isSticky = false;
    }
  }
}
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
