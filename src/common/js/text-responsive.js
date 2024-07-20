import { throttle } from '@/util/util'

export function textResponsive() {
  var textArea = document.querySelectorAll('.text-area');

  textArea && (Array.from(textArea).forEach(function(el) {
    var text = el.querySelector('.text'),
        placeholder = el.querySelector('.placeholder'),
        h = text.getBoundingClientRect().height;
    
    placeholder.style.height = `${h}px`;
  }));
}

export function textResponsiveObserver(context, callback) {
  var handler = throttle(textResponsive, 50, false, context);

  handler();
  callback && callback();

  window.addEventListener('resize', handler);
  window.addEventListener('scroll', handler);

  if (context) {
    context.$once('hook: beforeDestroy', function() {
      window.removeEventListener('resize', handler);
      window.removeEventListener('scroll', handler);
    });
  }
}