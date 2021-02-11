<template>
  <div class="container px-5 mb-10 mx-auto justify-between items-end">
    <div>
      <div class="flex items-end justify-between">
        <div class="flex items-end">
          <nuxt-link to="/">
            <img src="/icon.png" alt="" class="w-12 h-12 md:w-16 md:h-16" />
          </nuxt-link>
          <h1
            class="skeletonColor text-2xl md:text-3xl mt-6 tracking-wide title-font text-gray-200 w-32 h-8 rounded-full"
          ></h1>
        </div>
        <h2 class="skeletonColor h-8 w-10 rounded-full"></h2>
      </div>
      <p class="w-full h-1 skeletonColorSecondary rounded-full"></p>
    </div>

    <section class="text-gray-400 body-font">
      <div class="container pt-8 pb-2 mx-auto flex flex-wrap">
        <div class="items-center justify-center w-full mb-10 mr-2">
          <div class="flex items-center justify-center md:justify-start mr-2">
            <div class="w-10 h-10 skeletonColor rounded-full mr-2" />
            <div
              class="items-end skeletonColorSecondary h-8 w-32 rounded-full"
            ></div>
          </div>

          <div
            class="sm:flex sm:justify-between sm:items-center text-center mt-10 pb-1 border-b border-gray-800"
          >
            <div class="h-5 w-24 rounded-full skeletonColorSecondary"></div>
            <div class="h-5 w-32 rounded-full skeletonColorSecondary"></div>
          </div>

          <div
            class="sm:flex sm:justify-between sm:items-center text-center mt-10 pb-1 border-b border-gray-800"
          >
            <div class="h-5 w-48 rounded-full skeletonColorSecondary"></div>
            <div class="h-5 w-32 rounded-full skeletonColorSecondary"></div>
          </div>

          <div
            class="sm:flex sm:justify-between sm:items-center text-center mt-10 pb-1 border-b border-gray-800"
          >
            <div class="h-5 w-48 rounded-full skeletonColorSecondary"></div>
            <div class="h-5 w-32 rounded-full skeletonColorSecondary"></div>
          </div>
          <div
            class="sm:flex sm:justify-between sm:items-center text-center mt-10 pb-1 border-b border-gray-800"
          >
            <div class="h-5 w-48 rounded-full skeletonColorSecondary"></div>
            <div class="h-5 w-32 rounded-full skeletonColorSecondary"></div>
          </div>
        </div>
      </div>
    </section>
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
