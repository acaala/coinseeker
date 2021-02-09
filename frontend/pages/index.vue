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
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import useApi from '../hooks/useApi'
import utils from '../hooks/utils'
export default defineComponent({
  setup() {
    const coinInfo = ref()
    let formattedPrice = ref()
    const { getCoinInfo } = useApi()
    const { formatPrice } = utils()

    onMounted(async () => {
      const response = await getCoinInfo()
      coinInfo.value = response.data[0]
      formattedPrice.value = formatPrice(coinInfo.value.price_usd)
    })

    return { coinInfo, formattedPrice }
  },
})
</script>
