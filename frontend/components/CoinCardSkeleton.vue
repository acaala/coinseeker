<template>
  <div
    id="CoinCardSkeleton"
    class="mb-3 p-4 flex flex-wrap rounded-lg items-center justify-between border border-gray-800 bg-secondary skeletonColor"
  >
    <div class="flex items-center">
      <div
        class="w-12 md:w-16 h-12 mr-2 items-center bg-primary rounded-lg skeletonColorSecondary"
      ></div>
      <div class="md:mb-0 flex-shrink-0 flex flex-col">
        <span
          class="bg-primary w-10 h-4 rounded-lg skeletonColorSecondary"
        ></span>
        <span
          class="bg-primary rounded-lg w-16 md:w-20 h-6 mt-2 skeletonColorSecondary"
        ></span>
      </div>
    </div>

    <div class="items-center">
      <div class="bg-primary w-32 h-8 rounded-lg skeletonColorSecondary"></div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.skeletonColor {
  background: linear-gradient(-45deg, #000000, #3a3a3a);
  background-size: 400% 400%;
  -webkit-animation: gradientBG 15s infinite;
  -moz-animation: gradientBG 15s infinite;
  animation: gradientBG 15s infinite;
}
.skeletonColorSecondary {
  background: linear-gradient(270deg, #000000, #515152);
  background-size: 400% 400%;
  -webkit-animation: gradientBG 15s infinite;
  -moz-animation: gradientBG 15s infinite;
  animation: gradientBG 15s infinite;
}
@-webkit-keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>

