<template>
  <main>
    <!-- banner-container -->
    <section class="banner-container">
      <div class="visuel">
        <img v-lazy="banner.visuelPc" alt="">
      </div>
      <div class="container blocks-in-view">
        <div class="headline" v-html="banner.title"></div>
        <!-- <div class="content" v-html="banner.contentPc"></div> -->
      </div>
    </section>
    <!-- values -->
    <section class="values">
      <div class="container">
        <div class="list fade-in-up once">
          <ul>
            <li v-for="(item, i) in values.list" :key="i">
              <h3 v-html="item.headline"></h3>
              <div class="content">
                <div class="text-area">
                  <div class="placeholder" v-html="item.content"></div>
                  <div class="text" v-html="item.content"></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <!-- recuritment -->
    <section v-if="recuritmentList && recuritmentList.length" class="recuritment">
      <div class="container">
        <div class="block-subtitle fade-in-up once">
          <h2 v-html="recuritmentTitle"></h2>
        </div>
        <div class="recuritment-items-wrapper">
          <div v-for="i in colums" :key="`col${i}`" class="colum">
            <template v-for="(item, j) in recuritmentList">
              <!-- 点击分组跳转链接 -->
              <a
                v-if="i - 1 == j % colums && item.link"
                :key="`${i}-${j}`"
                class="item fade-in-up once"
                :href="item.link"
                target="_blank"
              >
                <div class="visuel"><img v-lazy="item.pcimg" alt=""></div>
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
              <!-- 点击显示岗位 -->
              <a
                v-if="i - 1 == j % colums && !item.link"
                :key="j"
                :class="['item', 'openings', {'open': isOpen[j]}, 'fade-in-up once']"
                href="javascript:void(0);"
                @click="toggleRoles(j)"
              >
                <div class="visuel"><img v-lazy="item.pcimg" alt=""></div>
                <div class="headline" v-html="item.title"></div>
                <div class="desc">
                  <div class="text-area">
                    <div class="placeholder" v-html="item.summary"></div>
                    <div class="text" v-html="item.summary"></div>
                  </div>
                </div>
                <div class="openings-bar">查看岗位</div>
                <div :class="`open-roles role${j}`" @click.stop="">
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
      </div>
    </section>
  </main>
</template>

<script>
import { inView } from '@/common/js/in-view'
import { textResponsive } from '@/common/js/text-responsive'
import { throttle } from '@/util/util'

export default {
  name: 'join-us-pc',

  props: ['banner', 'values', 'recuritment-title', 'recuritment-list'],

  data() {
    return {
      colums: 3,
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
        this.updateRecruitment();
        if (this.$root.ready) inView();
        textResponsive();
      });
    }
  },

  mounted() {
    if (this.$root.ready) inView();
    textResponsive();

    var handler = throttle(this.updateRecruitment);

    handler();

    window.addEventListener('resize', handler);

    this.$once('hook: beforeDestroy', function() {
      window.removeEventListener('resize', handler);
    });
  },

  methods: {
    toggleRoles(index, status) {
      var cur = this.isOpen[index],
          openRole = this.$el.querySelector(`.open-roles.role${index}`),
          inner = openRole.querySelector('.inner');

      if (status) {
        switch (status) {
          case 'open':
            this.$set(this.isOpen, index, true);
            openRole.style.height = inner.offsetHeight + 'px';
            break;
          case 'close':
            this.$set(this.isOpen, index, false);
            openRole.style.height = '0px';
            break;
        }

        return;
      }

      this.$set(this.isOpen, index, !cur);

      if (cur) {
        openRole.style.height = '0px';
      } else {
        openRole.style.height = inner.offsetHeight + 'px';
      }
    },

    updateRecruitment() {
      var self = this,
          sw = window.innerWidth || document.documentElement.clientWidth;

      this.colums = sw <= 992 ? 2 : 3;

      this.$nextTick(function() {
        var recItem = this.$el.querySelectorAll('.recuritment-items-wrapper .item');

        recItem && (Array.from(recItem).forEach(function(el) {
          var openRoles = el.querySelector('.open-roles');

          if (!openRoles) return;
          
          var index = parseInt(openRoles.classList[1].split('role')[1]);

          if (self.isOpen[index]) {
            self.toggleRoles(index, 'open');
          } else {
            self.toggleRoles(index, 'close');
          }
        }));
      });
    }
  }
}
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>