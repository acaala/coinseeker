<template>
  <div class="px-4">
    <div>
      <h1 class="text-3xl pt-5 tracking-wide title-font text-gray-200">
        Cryptowatch
      </h1>
      <p class="w-16 h-1 bg-indigo-900 mt-2 rounded-full"></p>
    </div>

    <section class="text-gray-400 body-font overflow-hidden">
      <div class="container px-5 py-24 mx-auto">
        <div class="-my-8 divide-y-2 divide-gray-800">
          <div
            v-if="coinInfo"
            class="py-8 flex flex-wrap md:flex-nowrap border-b-2 border-gray-800"
          >
            <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span class="font-semibold title-font text-white">{{
                coinInfo.name
              }}</span>
              <span class="mt-1 text-gray-500 text-sm">{{
                coinInfo.asset_id
              }}</span>
            </div>
            <div class="md:flex-grow">
              <h2 class="text-2xl font-medium text-white title-font mb-2">
                ${{ formattedPrice }}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import axios from 'axios'
export default defineComponent({
  setup() {
    const coinInfo = ref()
    const formattedPrice = ref()

    const formatPrice = (price: number) => {
      formattedPrice.value = (Math.round(price * 100) / 100).toFixed(2)
    }

    const getCoinInfo = async () => {
      const response = await axios.get(
        'https://rest-sandbox.coinapi.io/v1/assets/BTC?apikey=6A408DA3-1249-4CEF-9D00-67FCBBA3733E'
      )
      coinInfo.value = response.data[0]
      formatPrice(coinInfo.value.price_usd)
    }
    getCoinInfo()

    return { coinInfo, formattedPrice }
  },
})
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
