<template>
  <main>
    <!-- banner -->
    <section class="banner-container">
      <div :class="['video-container', { play: isVideoPlay }]">
        <img class="poster" v-lazy="banner.videoPoster" alt="" />
        <div class="video-wrapper">
          <video muted preload loop autoplay ref="video" @canplay="canplay">
            <source :src="banner.videoUrl" type="video/mp4" />
          </video>
        </div>
      </div>
      <div class="banner-inner">
        <div class="container blocks-in-view">
          <div class="slogan" v-html="banner.slogan"></div>
          <div class="content" v-html="banner.contentPc"></div>
        </div>
      </div>
      <div class="banner-footer">
        <div class="container blocks-in-view">
          <div class="button-group">
            <div class="btn" @click="handleDownloadAndroid">
              <img
                class="icon"
                src="@/assets/img/android.png"
                alt="android icon"
              />
              <div class="text" v-html="banner.androidText"></div>
              <iframe id="downloadFrame" style="display: none"></iframe>
            </div>
            <div class="btn" @click="handleClick(banner.iosLink)">
              <img class="icon" src="@/assets/img/ios.png" alt="android icon" />
              <div class="text" v-html="banner.iosText"></div>
            </div>
            <div class="btn" @click="handleClick(banner.taptapLink)">
              <img
                class="taptapIcon"
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
        <div class="blocks">
          <div class="content">
            <div class="block-subtitle fade-in-up once">
              <h2 v-html="budClub.title"></h2>
            </div>
            <div class="inner fade-in-up once">
              <div class="text-area">
                <div class="placeholder" v-html="budClub.content"></div>
                <div class="text" v-html="budClub.content"></div>
              </div>
            </div>
          </div>
          <div class="visuels">
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
      </div>
    </section>
    <!-- 团队 -->
    <section class="team">
      <div class="container">
        <div class="block-subtitle fade-in-up once">
          <h2 v-html="team.title"></h2>
        </div>
        <p class="fade-in-up once" v-html="team.content"></p>
        <!-- <div class="team-logos fade-in-up once">
          <img v-for="(item, i) in team.logos" :key="i" :src="item" alt="">
        </div> -->
        <div class="visuel-single fade-in-up once">
          <img v-lazy="team.visuelPc" alt="" />
          <loader></loader>
        </div>
      </div>
    </section>
    <!-- 投资方 -->
    <section class="investors">
      <div class="container">
        <div class="blocks">
          <div class="content">
            <div class="block-subtitle fade-in-up once">
              <h2 v-html="investors.title"></h2>
            </div>
            <div class="inner fade-in-up once">
              <div class="text-area">
                <div class="placeholder" v-html="investors.content"></div>
                <div class="text" v-html="investors.content"></div>
              </div>
            </div>
          </div>
          <div class="visuel-single fade-in-up once">
            <img v-lazy="investors.visuel" alt="" />
            <loader></loader>
          </div>
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
        <div class="block-news">
          <div class="block-subtitle fade-in-up once"><h2>新闻动态</h2></div>
          <div
            class="news-list fade-in-up once"
            v-lazy-container="{ selector: 'img' }"
          >
            <template v-for="(item, i) in news">
              <a
                v-if="item.link"
                :key="`news${i}`"
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
                :key="`news${i}`"
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
        </div>
        <div class="btn-center fade-in-up once" ref="btn">
          <router-link
            class="view-more coming-soon"
            :style="btnStyle"
            to="/news"
          >
            <span>更多动态</span>
          </router-link>
          <div class="placeholder"></div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { inView } from "@/common/js/in-view";
import { textResponsive } from "@/common/js/text-responsive";
import { throttle } from "@/util/util";
import { getData } from "@/api/index";
export default {
  name: "home-pc",

  props: ["banner", "bud-club", "team", "investors", "news"],

  components: {
    loader: () => import("@/components/loader"),
  },

  data() {
    return {
      isVideoPlay: false,
      btnStyle: "",
    };
  },

  watch: {
    news() {
      this.$nextTick(function () {
        textResponsive();
        this.updateBtn();
        if (this.$root.ready) inView();
      });
    },
  },

  mounted() {
    if (this.$root.ready) inView();
    textResponsive();

    // 播放视频
    var video = this.$refs.video;

    if (video.readyState == 4) {
      video.play();
      this.isVideoPlay = true;
    }

    // 更新 more 按钮的大小
    var handler = throttle(this.updateBtn);
    handler();

    window.addEventListener("resize", handler);

    this.$once("hook: beforeDestroy", function () {
      window.removeEventListener("resize", handler);
    });
  },

  methods: {
    canplay() {
      this.$refs.video.play();
      this.isVideoPlay = true;
    },

    updateBtn() {
      var detail = this.$el.querySelector(".news .details"),
        btnWrapper = this.$refs.btn;

      if (!detail) return;

      var placeholder = btnWrapper.querySelector(".placeholder"),
        bounds1 = detail.getBoundingClientRect(),
        bounds2 = placeholder.getBoundingClientRect(),
        dis = Math.abs(bounds1.x - bounds2.x),
        w = "";

      if (bounds1.x >= bounds2.x) {
        this.btnStyle = "";
      } else {
        w = bounds2.width + dis * 2;
        this.btnStyle = { width: `${w}px` };
      }
    },

    // 点击新闻
    newsItemClicked(news) {
      this.getNewsDetail(news.id, function () {
        window.open(news.link);
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
    //下载安卓包
    handleDownloadAndroid() {
      location.href =
        "https://bud-bag.budapp.cn/android/1726637636/BUD%E7%A2%A7%E4%BC%98%E8%92%82%E7%9A%84%E4%B8%96%E7%95%8C-%E5%AE%98%E6%9C%8D.apk";
    },
  },
};
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
