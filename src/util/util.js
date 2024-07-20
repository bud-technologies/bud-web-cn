exports.initScreen = function () {
  var sw = window.innerWidth || document.documentElement.clientWidth,
      swInner = document.documentElement.clientWidth || window.innerWidth,
      sh = window.innerHeight || document.documentElement.clientHeight,
      size = { w: sw, h: sh, d: 'w' },
      html = document.getElementsByTagName('html')[0],
      fontSize = '';

  var innerWidth = '';
  
  switch (true) {
    case (sw < 540):
      fontSize = sw / 750 * 2 * 312.5;
      break;
    case (sw <= 768):
      fontSize = 540 / 750 * 2 * 312.5;
      break;
    case (sw < 1460):
      innerWidth = swInner * 0.85 - 100;
      if (innerWidth > 1224) innerWidth = 1224; 
      fontSize = innerWidth / 1224 * 2 * 312.5;
      if (fontSize < 437.5) fontSize = 437.5;
      break;
    default:
      innerWidth = swInner * 0.8 - 160;
      if (innerWidth > 1224) innerWidth = 1224; 
      fontSize = innerWidth / 1224 * 2 * 312.5;
      if (fontSize < 437.5) fontSize = 437.5;
  }

  html.style.fontSize = fontSize + '%';
  return size;
}

// 节流
exports.throttle = function (action, delay, isElapsed, context) {
  var timer = null,
      lastRun = 0;

  if (!delay && delay !== 0) delay = 50;

  return function() {
    if (timer) {
      if (isElapsed) return false;
      clearTimeout(timer);
      timer = null;
    }

    var remaining = delay - (Date.now() - lastRun),
        args = arguments;

    if (remaining <= 0) {
      runCallback();
    } else {
      timer = setTimeout(runCallback, remaining);
    }

    // 执行回调
    function runCallback() {
      lastRun = Date.now();
      timer = null;
      action.apply(context, args);
    }
  };
}

// 小写转大写
exports.upperCase = function(str) {
  if (!str) return;
  return str.toUpperCase();
}