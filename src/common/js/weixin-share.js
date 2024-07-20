import wx from 'weixin-js-sdk'
import { getWXConfig } from '@/api/index'

// 向后端请求权限验证配置的基本数据
export async function initWXShare() {
  try {
    let res = await getWXConfig({
      url: window.location.href.split('#')[0]
    });

    if (!res) return;

    if (res.result === 0 || res.result === '0') {
      initAPIs(res.data);
    }
  } catch(error) {
    console.log(error);
  }
}


function initAPIs(data) {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: data.appId, // 必填，公众号的唯一标识
    timestamp: data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.noncestr, // 必填，生成签名的随机串
    signature: data.signature,// 必填，签名
    jsApiList: [
      'updateAppMessageShareData',
      'updateTimelineShareData',
      'onMenuShareTimeline',
      'onMenuShareAppMessage'
    ] // 必填，需要使用的JS接口列表
  });

  wx.ready(function() {
    share();
  });
}

// 分享内容填充和调用分享方法
export function share() {
  var shareTitle1 = 'BUD | 全球头部的3D元宇宙UGC平台', // 分享给朋友
      shareTitle2 = 'BUD | 全球头部的3D元宇宙UGC平台', // 分享到朋友圈
      shareDesc = '科技和艺术，虚拟社交和游戏，热点和创意的完美融合。',
      shareImg = window.location.origin + '/share.jpg',
      shareLink = window.location.href.split('#')[0];
  
  if (wx.updateTimelineShareData) {
    // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
    wx.updateAppMessageShareData({ 
      title: shareTitle1, // 分享标题
      desc: shareDesc, // 分享描述
      link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareImg, // 分享图标
      success: function (e) {
        console.log('success', e);
      }
    });

    // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内
    wx.updateTimelineShareData({ 
      title: shareTitle2, // 分享标题
      link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareImg, // 分享图标
      success: function (e) {
        console.log('success', e);
      }
    });
  } else {
    // 分享到朋友圈
    wx.onMenuShareTimeline({
      title: shareTitle2, // 分享标题
      link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareImg, // 分享图标
      success: function () {}
    });

    // 分享给朋友
    wx.onMenuShareAppMessage({
      title: shareTitle1, // 分享标题
      desc: shareDesc, // 分享描述
      link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareImg, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {}
    });
  }
}