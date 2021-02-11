<template>
  <div class="container px-4 mx-auto pt-10">
    <div v-if="fetchCoinState.pending">
      <SlugSkeleton />
    </div>

    <div v-else class="container px-5 mb-10 mx-auto justify-between items-end">
      <div class="px-4">
        <div class="flex items-end justify-between">
          <div class="flex items-end">
            <nuxt-link to="/">
              <img src="/icon.png" alt="" class="w-12 h-12 md:w-16 md:h-16" />
            </nuxt-link>
            <h1
              class="text-2xl md:text-3xl pt-5 tracking-wide title-font text-gray-200"
            >
              Coinseeker
            </h1>
          </div>
          <h2 class="text-2xl tracking-wide text-gray-500">
            {{ slugCoin.asset_id }}
          </h2>
        </div>
        <p class="w-full h-1 bg-indigo-900 rounded-full"></p>
      </div>

      <section class="text-gray-400 body-font">
        <div class="container px-5 pt-8 pb-2 mx-auto flex flex-wrap">
          <div class="items-center justify-center w-full mb-10 mr-2">
            <div class="flex items-center justify-center md:justify-start mr-2">
              <img class="w-8 h-8 md:w-10 md:h-10 mr-1" :src="iconURL" />
              <h2
                class="items-end text-2xl md:text-4xl text-gray-200 tracking-widest font-medium title-font"
              >
                {{ slugCoin.name }}
              </h2>
            </div>

            <div
              class="sm:flex sm:justify-between sm:items-center text-center mt-10 pb-1 border-b border-gray-800"
            >
              <h2
                class="font-medium title-font tracking-widest text-white text-sm md:text-xl sm:text-left"
              >
                Current Price:
              </h2>
              <h1
                class="sm:text-left text-3xl font-medium title-font text-white"
              >
                $ {{ formattedPrice }}
              </h1>
            </div>

            <div
              class="sm:flex sm:justify-between sm:items-center text-center mt-10 pb-1 border-b border-gray-800"
            >
              <h2
                class="font-medium title-font leading-7 tracking-widest text-white text-sm md:text-xl sm:text-left"
              >
                1 Hour Trading Volume:
              </h2>
              <h1
                class="sm:text-left text-xl md:text-2xl font-medium title-font text-white"
              >
                $ {{ tradingVolume.oneHour }}
              </h1>
            </div>

            <div
              class="sm:flex sm:justify-between sm:items-center text-center mt-10 pb-1 border-b border-gray-800"
            >
              <h2
                class="font-medium title-font tracking-widest text-white text-sm md:text-xl sm:text-left leading-7"
              >
                24 Hour Trading Volume:
              </h2>
              <h1
                class="sm:text-left text-xl md:text-2xl font-medium title-font text-white"
              >
                $ {{ tradingVolume.oneDay }}
              </h1>
            </div>
            <div
              class="sm:flex sm:justify-between sm:items-center text-center mt-10 pb-1 border-b border-gray-800"
            >
              <h2
                class="font-medium title-font tracking-widest text-white text-sm md:text-xl sm:text-left leading-7"
              >
                1 Month Trading Volume:
              </h2>
              <h1
                class="sm:text-left text-xl md:text-2xl font-medium title-font text-white"
              >
                $ {{ tradingVolume.oneMth }}
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  useContext,
  ref,
  useFetch,
} from '@nuxtjs/composition-api'

import useCoinApi from '../../hooks/useCoinApi'
import utils from '../../hooks/utils'
export default defineComponent({
  setup() {
    const { params } = useContext()
    const { formatPrice, getIconUrlFromAssetId, addCommas } = utils()
    const { getOneCoin, getCoinIcon } = useCoinApi()
    const slugCoin = ref()
    const formattedPrice = ref()
    const iconURL = ref()
    const tradingVolume = {
      oneHour: Number,
      oneDay: Number,
      oneMth: Number,
    }

    const { fetchState: fetchCoinState } = useFetch(async () => {
      slugCoin.value = await getOneCoin(params.value.id)

      let iconArray = await getCoinIcon()
      iconURL.value = getIconUrlFromAssetId(iconArray, slugCoin.value.asset_id)
      formattedPrice.value = formatPrice(slugCoin.value.price_usd)

      tradingVolume.oneHour = addCommas(slugCoin.value.volume_1hrs_usd)
      tradingVolume.oneDay = addCommas(slugCoin.value.volume_1day_usd)
      tradingVolume.oneMth = addCommas(slugCoin.value.volume_1mth_usd)
    })

    return { slugCoin, fetchCoinState, formattedPrice, iconURL, tradingVolume }
  },
})
</script>

<style>
</style>