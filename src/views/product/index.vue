<template>
  <div class="product-page">
    <component
      :is="`product-${$root.env}`"
      :class="['main-container', {'show': showMain}]"
      :banner="banner"
      :expericence="expericence"
      :creation-tool="creationTool"
      :props="props"
      :avatar-clothing="avatarClothing"
    >
    </component>
  </div>
</template>

<script>
import { inViewObserver } from '@/common/js/in-view'
import { textResponsiveObserver } from '@/common/js/text-responsive'

export default {
  name: 'product',

  components: {
    productPc: () => import('@/components/pc/product'),
    productMobile: () => import('@/components/mobile/product')
  },

  data() {
    return {
      showMain: false,
      banner: {
        title: '在BUD创造属于你的世界',
        titleMobile: '在BUD创造<br>属于你的世界',
        downloadUrlEn: 'https://linktr.ee/BUDcreate',
        downloadUrlCn: 'https://webcdn.m.qq.com/webapp/homepage/index.html#/appDetail?apkName=com.pointone.buddy&info=1292423CB71192DE5C6A83244B2C6198',
        visuels: [
          {
            picPc: `${process.env.BASE_URL}/static/img/product/banner-visuel1@pc.jpg?${window.version}`,
            picMobile: `${process.env.BASE_URL}/static/img/product/banner-visuel1@mobile.jpg?${window.version}`,
            thumb: `${process.env.BASE_URL}/static/img/product/thumb1.jpg?${window.version}`
          },
          {
            picPc: `${process.env.BASE_URL}/static/img/product/banner-visuel2@pc.jpg?${window.version}`,
            picMobile: `${process.env.BASE_URL}/static/img/product/banner-visuel2@mobile.jpg?${window.version}`,
            thumb: `${process.env.BASE_URL}/static/img/product/thumb2.jpg?${window.version}`
          },
          {
            picPc: `${process.env.BASE_URL}/static/img/product/banner-visuel3@pc.jpg?${window.version}`,
            picMobile: `${process.env.BASE_URL}/static/img/product/banner-visuel3@mobile.jpg?${window.version}`,
            thumb: `${process.env.BASE_URL}/static/img/product/thumb3.jpg?${window.version}`
          },
          {
            picPc: `${process.env.BASE_URL}/static/img/product/banner-visuel4@pc.jpg?${window.version}`,
            picMobile: `${process.env.BASE_URL}/static/img/product/banner-visuel4@mobile.jpg?${window.version}`,
            thumb: `${process.env.BASE_URL}/static/img/product/thumb4.jpg?${window.version}`
          }
        ]
      },
      expericence: {
        title: '沉浸式3D交互体验',
        visuelsPc: [
          `${process.env.BASE_URL}/static/img/product/experience-visuel1@pc.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/experience-visuel2@pc.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/experience-visuel3@pc.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/experience-visuel4@pc.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/experience-visuel5@pc.jpg?${window.version}`
        ],
        visuelsMobile: [
          `${process.env.BASE_URL}/static/img/product/experience-visuel1@mobile.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/experience-visuel2@mobile.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/experience-visuel3@mobile.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/experience-visuel4@mobile.jpg?${window.version}`
        ],
        desc: '用户利用BUD内置的几何模块及互动道具，便能轻松从0到1搭建出一整套精美的3D互动场景。在温馨小屋里举办生日派对，在沙滩上与好友来一场激情对战，亦或是逐步构建神秘的海底世界，更多精彩创意都可在BUD实现。',
      },
      creationTool: {
        title: '零门槛的编辑器',
        videoUrl: `${process.env.BASE_URL}/static/img/product/tool.mp4?${window.version}`,
        videoPoster: `${process.env.BASE_URL}/static/img/product/tool-poster.jpg?${window.version}`,
        visuelMobile: `${process.env.BASE_URL}/static/img/product/tool.gif?${window.version}`,
        text1: '移动原生、无代码的编辑器真正实现零操作门槛。',
        text2: '无需任何技术背景，用户利用拖拽的方式就能构建3D场景，感受超高创作自由度。BUD专注打磨底层创作工具，由用户定义更多内容和创作形式。',
        textMobile: '移动原生、无代码的编辑器真正实现零操作门槛，无需任何技术背景，用户利用拖拽的方式就能构建3D场景，感受超高创作自由度。BUD专注打磨底层创作工具，由用户定义更多内容和创作形式。'
      },
      props: {
        title: '海量实时素材库',
        content: '一桌一椅，一花一木都由用户创建，汇聚成开放共享的平台素材库。用户既可以展示和分享自己设计的素材和道具，也可以在创作中融入其他创作者的素材。',
        visuelPc: `${process.env.BASE_URL}/static/img/product/props-visuel@pc.png?${window.version}`,
        visuelMobile: `${process.env.BASE_URL}/static/img/product/props-visuel@mobile.png?${window.version}`
      },
      avatarClothing: {
        title: '个性化角色形象',
        content: '潮酷、甜美、复古、前卫，各种风格随心百变，从服装、发型和配饰的多种搭配中，用户可以自定义专属角色形象，甚至可以穿上自己设计的衣服，满足个性表达。',
        visuel: `${process.env.BASE_URL}/static/img/product/clothing-visuel.jpg?${window.version}`,
        slides: [
          `${process.env.BASE_URL}/static/img/product/clothing-slide1.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/clothing-slide2.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/clothing-slide3.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/clothing-slide4.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/clothing-slide5.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/clothing-slide6.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/clothing-slide7.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/clothing-slide8.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/clothing-slide1.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/clothing-slide2.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/clothing-slide3.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/clothing-slide4.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/clothing-slide5.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/clothing-slide6.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/clothing-slide7.jpg?${window.version}`,
          `${process.env.BASE_URL}/static/img/product/clothing-slide8.jpg?${window.version}`
        ]
      }
    }
  },

  watch: {
    showMain(cur) {
      if (!cur) return;

      var self = this;

      setTimeout(() => {
        inViewObserver(self, function() {
          self.$root.ready = true;
        });
      }, 300);
    }
  },

  mounted() {
    textResponsiveObserver(this);

    // 页面渐现
    setTimeout(() => {
      this.showMain = true;
    }, 300);
  }
}
</script>
