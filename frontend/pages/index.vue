<template>
  <div class="px-4">
    <section class="text-gray-400 body-font overflow-hidden mt-24">
      <div class="container px-5 mb-10 mx-auto flex justify-between items-end">
        <div class="">
          <h1 class="text-3xl pt-5 tracking-wide title-font text-gray-200">
            Cryptowatch
          </h1>
          <p class="w-16 h-1 bg-indigo-900 mt-2 rounded-full"></p>
        </div>
        <SelectButton />
      </div>
      <div class="mx-auto container">
        <div class="mx-4 my-4 border-b-2 border-gray-800">
          <h2 class="tracking-widest uppercase">Coinlist</h2>
        </div>
        <div class="container px-5 pb-24 mx-auto">
          <div class="-my-8 divide-y-2 divide-gray-800">
            <CoinCard
              v-for="(coin, index) in coinsInfoArray"
              :key="index"
              v-bind="coin"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import useCoinApi from '../hooks/useCoinApi'
export default defineComponent({
  setup() {
    const coinsInfoArray = ref()
    const { getCoinInfo } = useCoinApi()

    onMounted(async () => {
      const response = await getCoinInfo()
      coinsInfoArray.value = response?.data ?? 'No data here!'
    })

    return { coinsInfoArray }
  },
})
</script>
