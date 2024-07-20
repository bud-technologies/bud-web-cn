<template>
  <div class="about-page">
    <component
      :is="`about-${$root.env}`"
      :class="['main-container', {'show': showMain}]"
      :banner="banner"
      :mission="mission"
      :founder="founder"
      :milestones="milestones"
      :culture="culture"
      :locations="locations"
    >
    </component>
  </div>
</template>

<script>
import { inViewObserver } from '@/common/js/in-view'
import { textResponsiveObserver } from '@/common/js/text-responsive'

export default {
  name: 'about',

  components: {
    aboutPc: () => import('@/components/pc/about'),
    aboutMobile: () => import('@/components/mobile/about')
  },

  data() {
    return {
      showMain: false,
      banner: {
        title: '关于我们',
        uppercase: 'BUD',
        content: '是全球头部3D元宇宙UGC平台<br>用户通过简单易用的无代码工具便可以创建个性化的3D交互内容',
        contentMobile: '是全球头部的3D元宇宙UGC平台，用户通过简单易用的无代码工具便可以创建个性化的3D交互内容。',
        visuelPc: `${process.env.BASE_URL}/static/img/about/banner-visuel@pc.jpg?${window.version}`,
        visuelMobile: `${process.env.BASE_URL}/static/img/about/banner-visuel@mobile.jpg?${window.version}`
      },
      mission: {
        title: '真正的元宇宙UGC平台',
        list: [
          {
            desc: '为全球用户打造<br>沉浸式交互3D体验',
            descMobile: '为全球用户打造沉浸式交互3D体验',
            visuel: `${process.env.BASE_URL}/static/img/about/mission-visuel1.jpg?${window.version}`,
            visuelMobile: `${process.env.BASE_URL}/static/img/about/mission-visuel1@mobile.jpg?${window.version}`
          },
          {
            desc: '为创作者提供<br>简单易用、原生移动的创作工具',
            descMobile: '为创作者提供简单易用、原生移动的创作工具',
            visuel: `${process.env.BASE_URL}/static/img/about/mission-visuel2.jpg?${window.version}`,
            visuelMobile: `${process.env.BASE_URL}/static/img/about/mission-visuel2@mobile.jpg?${window.version}`
          },
          {
            desc: '为年轻一代搭建<br>发挥想象力和创意的平台',
            descMobile: '为年轻一代搭建发挥想象力和创意的平台',
            visuel: `${process.env.BASE_URL}/static/img/about/mission-visuel3.jpg?${window.version}`,
            visuelMobile: `${process.env.BASE_URL}/static/img/about/mission-visuel3@mobile.jpg?${window.version}`
          }
        ]
      },
      founder: {
        title: '创始人',
        members: [
          {
            name: 'RISA',
            post: '联合创始人兼CEO',
            introduction: '<p>2019年创立BUD，全面负责公司整体管理、核心产品研发、运营推广及战略规划。创业前曾任职于Snap，担任全栈AR设计工程师，负责创新AR特效的研发，以及AR引擎Lens Studio从0到1的生态搭建。</p><p>Risa毕业于美国康奈尔大学，获计算机和数学本科双学位。</p>',
            introductionMobile: '<p>2019年创立BUD，全面负责公司整体管理、核心产品研发、运营推广及战略规划。创业前曾任职于Snap，担任全栈AR设计工程师。</p><p>Risa毕业于美国康奈尔大学，获计算机和数学本科双学位。</p>',
            avatar: `${process.env.BASE_URL}/static/img/about/founder1.jpg?${window.version}`
          },
          {
            name: 'SHAWN',
            post: '联合创始人',
            introduction: '<p>全面统筹公司战略和产品研发。创立BUD之前，Shawn曾在Snap担任软件工程师，是Snap早期华人工程师之一，负责移动端性能优化、移动端框架、安卓重构和用户增长方面的工作。</p><p>Shawn毕业于美国罗格斯大学计算机科学专业。</p>',
            introductionMobile: '<p>全面统筹BUD战略和产品研发。曾在Snap担任软件工程师，负责移动端性能优化、移动端框架、安卓重构和用户增长方面的工作。</p><p>Shawn毕业于美国罗格斯大学计算机科学专业。</p>',
            avatar: `${process.env.BASE_URL}/static/img/about/founder2.jpg?${window.version}`
          }
        ]
      },
      milestones: {
        title: '发展历程',
        list: [
          {
            date: '2019年7月',
            content: 'BUD创立',
            pic: `${process.env.BASE_URL}/static/img/about/milestione1.png?${window.version}`
          },
          {
            date: '2021年5月',
            content: '1.0测试版发布',
            pic: `${process.env.BASE_URL}/static/img/about/milestione2.png?${window.version}`
          },
          {
            date: '2021年11月',
            content: '产品全球上线',
            pic: `${process.env.BASE_URL}/static/img/about/milestione3.png?${window.version}`
          },
          {
            date: '2022年3月',
            content: 'UGC原创3D作品超千万',
            pic: `${process.env.BASE_URL}/static/img/about/milestione4.png?${window.version}`
          },
          {
            date: '2022年5月',
            content: '跻身38个国家社交应用<br>Top10榜单',
            pic: `${process.env.BASE_URL}/static/img/about/milestione5.png?${window.version}`
          }
        ]
      },
      culture: {
        title: '企业文化',
        listPC: [
          {
            content: '全球视野',
            visuel: `${process.env.BASE_URL}/static/img/about/culture-visuel1.jpg?${window.version}`
          },
          {
            content: '创新迭代',
            visuel: `${process.env.BASE_URL}/static/img/about/culture-visuel2.jpg?${window.version}`
          },
          {
            content: '创造力和想象力',
            visuel: `${process.env.BASE_URL}/static/img/about/culture-visuel3.jpg?${window.version}`
          },
          {
            content: '以用户为中心',
            visuel: `${process.env.BASE_URL}/static/img/about/culture-visuel4.jpg?${window.version}`
          },
          {
            content: '高效执行',
            visuel: `${process.env.BASE_URL}/static/img/about/culture-visuel5.jpg?${window.version}`
          }
        ],
        listMobile: [
          {
            content: '全球视野', position: 'left',
            visuel: `${process.env.BASE_URL}/static/img/about/culture-visuel1@mobile.jpg?${window.version}`
          },
          {
            content: '创新迭代', position: 'left',
            visuel: `${process.env.BASE_URL}/static/img/about/culture-visuel2@mobile.jpg?${window.version}`
          },
          {
            content: '创造力和想象力', position: 'right',
            visuel: `${process.env.BASE_URL}/static/img/about/culture-visuel3@mobile.jpg?${window.version}`
          },
          {
            content: '以用户为中心', position: 'right',
            visuel: `${process.env.BASE_URL}/static/img/about/culture-visuel4@mobile.jpg?${window.version}`
          },
          {
            content: '高效执行', position: 'right',
            visuel: `${process.env.BASE_URL}/static/img/about/culture-visuel5@mobile.jpg?${window.version}`
          }
          
        ]
      },
      locations: {
        title: '办公地点',
        address: ['新加坡', '美国洛杉矶', '中国深圳']
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
