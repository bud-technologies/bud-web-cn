<template>
  <div class="join-us-page">
    <component
      :is="`join-us-${$root.env}`"
      :class="['main-container', {'show': showMain}]"
      :banner="banner"
      :values=values
      :recuritment-title="recuritmentTitle"
      :recuritment-list="recuritmentList"
    >
    </component>
  </div>
</template>

<script>
import { inViewObserver } from '@/common/js/in-view'
import { textResponsiveObserver } from '@/common/js/text-responsive'
import { getData } from '@/api/index'

export default {
  name: 'join-us',

  components: {
    joinUsPc: () => import('@/components/pc/join-us'),
    joinUsMobile: () => import('@/components/mobile/join-us')
  },

  data() {
    return {
      showMain: false,
      banner: {
        visuelPc: `${process.env.BASE_URL}/static/img/join-us/banner-visuel@pc.jpg?${window.version}`,
        visuelMobile: `${process.env.BASE_URL}/static/img/join-us/banner-visuel@mobile.jpg?${window.version}`,
        title: '用科技和艺术点亮创造',
        titleMobile: '用科技和艺术<br>点亮创造',
        contentPc: '使命感&nbsp;&nbsp;&nbsp;&nbsp;热情&nbsp;&nbsp;&nbsp;&nbsp;创意&nbsp;&nbsp;&nbsp;&nbsp;执行力',
        contentMobile: '使命感&nbsp;&nbsp;&nbsp;&nbsp;热情&nbsp;&nbsp;&nbsp;&nbsp;创意&nbsp;&nbsp;&nbsp;&nbsp;执行力'
      },
      values: {
        title: 'VALUES',
        list: [
          {
            headline: '极富热情',
            content: '源于兴趣，用热爱打磨优质产品'
          },
          {
            headline: '追求创新',
            content: '小步快跑，不断探索更多可能性 '
          },
          {
            headline: '高效执行',
            content: '结果导向，让想法有序高效落地'
          }
        ]
      },
      recuritmentTitle: '热招岗位',
      recuritmentList: []
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

  created() {
    this.getRecuritment();
  },

  mounted() {
    textResponsiveObserver(this);

    // 页面渐现
    setTimeout(() => {
      this.showMain = true;
    }, 300);
  },

  methods: {
    async getRecuritment() {
      try {
        let res = await getData('joblist');

        if (res.status != 1) return;
        this.recuritmentList = res.data;
      } catch(error) {
        console.log(error);
      }
    }
  }
}
</script>
