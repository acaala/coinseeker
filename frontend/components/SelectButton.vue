<template>
  <div class="flex ml-6 items-center">
    <div class="relative">
      <select
        class="rounded border border-gray-700 focus:ring-2 focus:ring-indigo-900 bg-transparent appearance-none py-2 focus:outline-none focus:border-indigo-500 text-white pl-3 pr-10"
      >
        <option>USD</option>
        <!-- <option>GBP</option> -->
      </select>
      <span
        class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center"
      >
        <DownArrow />
      </span>
    </div>
  </div>
</template>