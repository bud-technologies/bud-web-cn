<template>
  <main>
    <!-- banner-container -->
    <section class="banner-container">
      <div class="banner-visuel">
        <img :src="banner.visuelMobile" alt="">
      </div>
      <div class="container">
        <div class="content blocks-in-view once">
          <div class="headline" v-html="banner.titleMobile"></div>
          <!-- <div class="desc" v-html="banner.contentMobile"></div> -->
        </div>
      </div>
    </section>
    <!-- values -->
    <section class="values">
      <div class="container">
        <ul class="list fade-in-up once">
          <li v-for="(item, i) in values.list" :key="i">
            <h3 v-html="item.headline"></h3>
            <div class="content" v-html="item.content"></div>
          </li>
        </ul>
      </div>
    </section>
    <!-- recuritment -->
    <section v-if="recuritmentList && recuritmentList.length" class="recuritment">
      <div class="container">
        <div class="block-subtitle fade-in-up once">
          <h2 v-html="recuritmentTitle"></h2>
        </div>
        <div class="jobs-groups">
          <template v-for="(item, i) in recuritmentList">
            <!-- 点击分组跳转链接 -->
            <a
              v-if="item.link"
              :key="i"
              class="jobs-group-item fade-in-up once"
              :href="item.link"
              target="_blank"
            >
              <div class="visuel-single">
                <img v-lazy="item.mobileimg" alt="">
                <loader></loader>
              </div>
              <div class="headline" v-html="item.title"></div>
              <div class="desc">
                <div class="text-area">
                  <div class="placeholder" v-html="item.summary"></div>
                  <div class="text" v-html="item.summary"></div>
                </div>
              </div>
              <div class="btn">
                <span>查看岗位</span>
              </div>
            </a>
            <a
              v-else
              :key="i"
              :class="['jobs-group-item', 'openings', {'open': isOpen[i]}, 'fade-in-up once']"
              href="javascript:void(0);"
              @click="toggleRoles(i)"
            >
              <div class="visuel-single">
                <img v-lazy="item.mobileimg" alt="">
                <loader></loader>
              </div>
              <div class="headline" v-html="item.title"></div>
              <div class="desc">
                <div class="text-area">
                  <div class="placeholder" v-html="item.summary"></div>
                  <div class="text" v-html="item.summary"></div>
                </div>
              </div>
              <div class="openings-bar">查看岗位</div>
              <div :class="`open-roles role${i}`" @click.stop="">
                <div class="inner">
                  <p v-for="(job, m) in item.listjobs" :key="`job${m}`">
                    <a v-if="job.link" :href="job.link" target="_blank">{{ job.title }}</a>
                    <a v-else href="mailto:careers@budcreate.xyz">{{ job.title }}</a>
                  </p>
                </div>
              </div>
            </a>
          </template>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { inView } from '@/common/js/in-view'
import { textResponsive } from '@/common/js/text-responsive'

export default {
  name: 'join-us-mobile',

  props: ['banner', 'values', 'recuritment-title', 'recuritment-list'],

  components: {
    loader: () => import('@/components/loader')
  },

  data() {
    return {
      isOpen: []
    }
  },

  watch: {
    recuritmentList() {
      if (this.isOpen.length != 0) return;

      this.isOpen = this.recuritmentList.map(function() {
        return false;
      });

      this.$nextTick(function() {
        if (this.$root.ready) inView();
        textResponsive();
      });
    }
  },

  mounted() {
    if (this.$root.ready) inView();
    textResponsive();
  },

  methods: {
    toggleRoles(index) {
      var cur = this.isOpen[index],
          openRole = this.$el.querySelector(`.open-roles.role${index}`),
          inner = openRole.querySelector('.inner');

      this.$set(this.isOpen, index, !cur);

      if (cur) {
        openRole.style.height = '0px';
      } else {
        openRole.style.height = inner.offsetHeight + 'px';
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
