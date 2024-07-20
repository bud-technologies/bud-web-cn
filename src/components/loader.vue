<template>
  <div class="loader">
    <div>
      <span class="dot"></span>
      <span class="dot-shadow"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loader'
}
</script>

<style scoped lang="scss">
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  @include position-equal(0);
  pointer-events: none;

  &.loader-full {
    position: fixed;
    @include position-equal(0);
    z-index: -1;
  }

  & > div {
    position: relative;
    @include square(8px);
  }

  .dot,
  .dot-shadow {
    position: absolute;
    z-index: 2;
    border-radius: 50%;
    @include square(8px);
    background-color: #c1c1c1;
    @include animation(#{ loaderBounce 0.8s cubic-bezier(0.7, 0, 0.3, 1) infinite alternate });
  }
  .dot-shadow {
    z-index: 1;
    opacity: 0.39;
    -webkit-animation-delay: 80ms;
            animation-delay: 80ms;
  }
}

@-webkit-keyframes loaderBounce {
  0% { @include transform(#{ translateX(-20px) }); }

  100% { @include transform(#{ translateX(20px) }); }
}

@keyframes loaderBounce {
  0% { @include transform(#{ translateX(-20px) }); }

  100% { @include transform(#{ translateX(20px) }); }
}
</style>
