<template>
  <main>
    <!-- banner -->
    <section class="banner-container">
      <div class="banner-visuel">
        <img v-lazy="banner.visuelMobile" alt="" />
      </div>
      <div class="banner-inner blocks-in-view">
        <div class="slogan" v-html="banner.sloganMobile"></div>
        <div class="content" v-html="banner.contentMobile"></div>
      </div>
      <div class="banner-footer">
        <div class="container blocks-in-view">
          <div class="button-group">
            <div class="btn" @click="handleClick(banner.androidLink)">
              <img
                class="icon"
                src="@/assets/img/android.svg"
                alt="android icon"
              />
              <div
                class="text"
                style="margin-right: 5px"
                v-html="banner.androidText"
              ></div>
            </div>
            <div class="btn" @click="handleClick(banner.iosLink)">
              <img class="icon" src="@/assets/img/ios.svg" alt="android icon" />
              <div
                class="text"
                style="margin-right: 5px"
                v-html="banner.iosText"
              ></div>
            </div>
            <div class="btn" @click="handleClick(banner.taptapLink)">
              <img
                class="icon taptap"
                src="@/assets/img/taptap.png"
                alt="icon"
              />
              <div class="text" v-html="banner.taptapText"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 游戏特色 -->
    <section class="bud-club">
      <div class="container">
        <div class="block-subtitle fade-in-up once">
          <h2 v-html="budClub.title"></h2>
        </div>
        <div class="inner fade-in-up once">
          <div class="text-area">
            <div class="placeholder" v-html="budClub.content"></div>
            <div class="text" v-html="budClub.content"></div>
          </div>
        </div>
        <div class="visuels-list">
          <ul
            class="blocks-in-view once"
            v-lazy-container="{ selector: 'img' }"
          >
            <li
              v-for="(item, i) in budClub.visuels"
              :key="`f${i}`"
              class="visuel-single"
            >
              <img :data-src="item" alt="" />
              <loader></loader>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <!-- 团队 -->
    <section class="team">
      <div class="container">
        <div class="block-subtitle fade-in-up once">
          <h2 v-html="team.title"></h2>
        </div>
        <div class="inner fade-in-up once" v-html="team.content"></div>
        <!-- <div class="team-logos fade-in-up once">
          <img v-for="(item, i) in team.logos" :key="i" :src="item" alt="">
        </div> -->
        <div class="visuel-single fade-in-up once">
          <img v-lazy="team.visuelMobile" alt="" />
          <loader></loader>
        </div>
      </div>
    </section>
    <!-- 投资方 -->
    <section class="investors">
      <div class="container">
        <div class="block-subtitle fade-in-up once">
          <h2 v-html="investors.title"></h2>
        </div>
        <div class="inner fade-in-up once">
          <div class="text-area">
            <div class="placeholder" v-html="investors.contentMobile"></div>
            <div class="text" v-html="investors.contentMobile"></div>
          </div>
        </div>
        <div class="visuel-single fade-in-up once">
          <img v-lazy="investors.visuel" alt="" />
          <loader></loader>
        </div>
        <div class="investor-logos fade-in-up once">
          <img
            v-for="(item, i) in investors.logos"
            :key="i"
            :src="item"
            alt=""
          />
        </div>
      </div>
    </section>
    <!-- 新闻 -->
    <section v-if="news && news.length" class="news">
      <div class="container">
        <div class="block-subtitle fade-in-up once"><h2>新闻动态</h2></div>
        <div
          class="news-list fade-in-up once"
          v-lazy-container="{ selector: 'img' }"
        >
          <template v-for="(item, i) in news">
            <a
              v-if="item.link"
              :key="i"
              class="news-item"
              href="javascript:void(0);"
              @click="newsItemClicked(item)"
            >
              <div class="visuel-single">
                <img :data-src="item.preimage" alt="" />
                <loader></loader>
              </div>
              <div class="details">
                <div class="title">
                  <div class="text-area">
                    <div class="placeholder" v-html="item.title"></div>
                    <div class="text" v-html="item.title"></div>
                  </div>
                </div>
                <div v-if="item.source" class="info">
                  <i>{{ item.source }}</i
                  >{{ item.adddate }}
                </div>
                <div v-else class="info">{{ item.adddate }}</div>
              </div>
            </a>
            <router-link
              v-else
              :key="i"
              class="news-item"
              :to="{ path: '/news-details', query: { id: item.id } }"
              target="_blank"
            >
              <div class="visuel-single">
                <img :data-src="item.preimage" alt="" />
                <loader></loader>
              </div>
              <div class="details">
                <div class="title">
                  <div class="text-area">
                    <div class="placeholder" v-html="item.title"></div>
                    <div class="text" v-html="item.title"></div>
                  </div>
                </div>
                <div v-if="item.source" class="info">
                  <i>{{ item.source }}</i
                  >{{ item.adddate }}
                </div>
                <div v-else class="info">{{ item.adddate }}</div>
              </div>
            </router-link>
          </template>
        </div>
        <router-link class="view-more coming-soon fade-in-up once" to="/news">
          <span>更多动态</span>
        </router-link>
      </div>
    </section>
  </main>
</template>

<script>
import { inView } from "@/common/js/in-view";
import { textResponsive } from "@/common/js/text-responsive";
import { getData } from "@/api/index";

export default {
  name: "home-mobile",

  props: ["banner", "bud-club", "team", "investors", "news"],

  components: {
    loader: () => import("@/components/loader"),
  },

  watch: {
    news() {
      this.$nextTick(function () {
        textResponsive();
        if (this.$root.ready) inView();
      });
    },
  },

  mounted() {
    if (this.$root.ready) inView();
    textResponsive();
  },

  methods: {
    // 点击新闻
    newsItemClicked(news) {
      var system = this.$root.system;

      this.getNewsDetail(news.id, function () {
        if (system == "iphone" || system == "mac") {
          window.location.href = news.link;
        } else {
          window.open(news.link);
        }
      });
    },

    // 新闻详情接口，浏览量+1
    async getNewsDetail(id, callback) {
      try {
        await getData("articleinfo", { id: id });
        callback && callback();
      } catch (error) {
        console.log(error);
        callback && callback();
      }
    },

    // banner按钮跳转事件
    handleClick(item) {
      if (!item) {
        return;
      }
      window.open(item, "_blank");
    },
  },
};
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
