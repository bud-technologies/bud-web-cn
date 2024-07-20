window.ajaxList = (function() {
  let common = '';

  if (window.isAdminDebug === 0) { // 正式环境
    common = 'https://website.pointone.tech/api/index/';
  } else { // 测试环境
    common = 'http://budcn.moodhome.net/api/index/';
  }

  return {
    common: common,
    wx: 'https://pointone.tech/wx/getSignature'
  };
})();