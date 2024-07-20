import { gsap } from 'gsap/all'
import { throttle } from '@/util/util'

const offset = { top: 50, right: -50, bottom: 0, left: 50 };

export function isInView(el) {
  if (!el) return;

  var bounds = el.getBoundingClientRect(),
      offsetTop = bounds.top,
      offsetBottom = bounds.bottom,
      offsetLeft = bounds.left,
      offsetRight = bounds.right,
      screenWidth = window.innerWidth || document.documentElement.clientWidth,
      screenHeight = window.innerHeight || document.documentElement.clientHeight;

  if (offsetTop <= screenHeight + offset.top && offsetBottom >= offset.bottom &&
    offsetLeft <= screenWidth + offset.left && offsetRight >= offset.right) {
    return true;
  } else {
    return false;
  }
}

export function inView() {
  if (this && (!this._isMounted || this._isBeingDestroyed || this._isDestroyed)) return;
  
  var isIn = '';

  // fade-in-up
  var fadeInUp = document.querySelectorAll('.fade-in-up');

  fadeInUp && (Array.from(fadeInUp).forEach(function(el) {
    if (!el.tl) {
      el.tl = gsap.timeline({ paused: true });

      el.tl.fromTo(el, {
        y: 120,
        opacity: 0
      }, {
        y: 0,
        opacity: 1
      }, 0);
    }

    isIn = isInView(el);

    // 进入可视范围
    if (isIn && !el.in) {
      if (el.done && el.classList.contains('once')) return;
      el.done = true;
      el.in = true;
      el.tl.duration(0.5).play();
      return;
    }

    // 离开可视范围
    if (!isIn && el.in) {
      if (el.done && el.classList.contains('once')) return;
      el.in = false;
      el.tl.duration(0.01).reverse();
    }
  }));

  // blocks-in-view
  var blocksInView = document.querySelectorAll('.blocks-in-view');

  blocksInView && (Array.from(blocksInView).forEach(function(el) {
    if (!el.tl) {
      el.tl = gsap.timeline({ paused: true });

      var c = el.children,
          cArr = [];

      for (var i = 0; i < c.length; i++) {
        if (!c[i].classList.contains('static')) cArr.push(c[i]);
      }

      el.duration = (5 + cArr.length - 1) / 10;

      el.tl.fromTo(cArr, {
        y: 120,
        opacity: 0
      }, {
        stagger: 0.1,
        y: 0,
        opacity: 1
      }, 0);
    }

    isIn = isInView(el);

    // 进入可视范围
    if (isIn && !el.in) {
      if (el.done && el.classList.contains('once')) return;
      el.done = true;
      el.in = true;
      el.tl.duration(el.duration).play();
      return;
    }

    // 离开可视范围
    if (!isIn && el.in) {
      if (el.done && el.classList.contains('once')) return;
      el.in = false;
      el.tl.duration(0.01).reverse();
    }
  }));
}

export function inViewObserver(context, callback) {
  if (!context) return;

  var inViewHandler = throttle(inView, 50, false, context);

  inViewHandler();
  callback && callback();
  
  ['scroll', 'resize'].forEach(function(event) {
    window.addEventListener(event, inViewHandler);
  });

  context.$once('hook: beforeDestroy', function() {
    ['scroll', 'resize'].forEach(function(event) {
      window.removeEventListener(event, inViewHandler);
    });
  });
}