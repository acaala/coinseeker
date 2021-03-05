<template>
  <div class="container mx-auto">
    <div v-if="fetchCoinState.pending">
      <SlugSkeleton />
    </div>

    <div v-else class="container mx-auto">
      <div>
        <div class="flex items-end justify-between">
          <nuxt-link to="/">
            <div class="flex items-end">
              <img src="/icon.png" alt="" class="w-12 h-12 md:w-16 md:h-16" />
              <h1
                class="text-2xl md:text-3xl pt-5 tracking-wide title-font text-gray-200"
              >
                Coinseeker
              </h1>
            </div>
          </nuxt-link>
          <h2 class="text-2xl tracking-wide text-gray-500 uppercase">
            {{ slugCoin.symbol }}
          </h2>
        </div>
        <p class="w-full h-1 bg-indigo-900 rounded-full"></p>
      </div>

      <section class="my-12 w-full">
        <div class="bg-secondary rounded-lg py-3 px-4">
          <!-- Coin title -->
          <div
            class="flex justify-between items-center border-b border-gray-800 py-2"
          >
            <div class="flex items-center">
              <img class="mr-1 rounded-full" :src="slugCoin.image.small" />
              <div>
                <h3 class="tracking-wide text-gray-500 uppercase -mb-2">
                  {{ slugCoin.symbol }}
                </h3>
                <h2 class="text-xl md:text-3xl text-gray-200 tracking-widest">
                  {{ slugCoin.name }}
                </h2>
              </div>
            </div>

            <div>
              <h3 class="text-2xl font-medium">£{{ formattedPrice }}</h3>
            </div>
          </div>

          <!-- Coin Info -->
          <div
            class="my-4 py-4 flex flex-col xl:flex-row-reverse xl:justify-between space-y-5"
          >
            <!-- Info -->
            <div class="grid grid-cols-1 space-y-5 xl:w-1/2">
              <!--  First Row -->
              <div
                class="md:grid gap-4 md:gap-0 md:grid-cols-3 text-center items-center border-b border-gray-800 pb-5 hidden"
              >
                <div>
                  <h4>Rank</h4>
                  <p class="text-xl">
                    {{ slugCoin.market_data.market_cap_rank }}
                  </p>
                </div>
                <div>
                  <h4>market cap</h4>
                  <p class="md:text-xl">
                    £{{ addCommas(slugCoin.market_data.market_cap.gbp) }}
                  </p>
                </div>
                <div>
                  <h4>total vol.</h4>
                  <p class="md:text-xl">
                    £{{ addCommas(slugCoin.market_data.total_volume.gbp) }}
                  </p>
                </div>
              </div>
              <div class="md:hidden">
                <div
                  class="grid grid-cols-3 items-center pb-5 border-b border-gray-800 ml-2"
                >
                  <div class="text-center">
                    <h4>Rank:</h4>
                    <p class="text-2xl">
                      {{ slugCoin.market_data.market_cap_rank }}
                    </p>
                  </div>
                </div>
                <div
                  class="grid grid-cols-3 text-center items-center border-b border-gray-800 py-5"
                >
                  <div>
                    <h4>market cap</h4>
                    <p class="md:text-xl">
                      £{{ addCommas(slugCoin.market_data.market_cap.gbp) }}
                    </p>
                  </div>
                  <div class="col-start-3">
                    <h4>total vol.</h4>
                    <p class="md:text-xl">
                      £{{ addCommas(slugCoin.market_data.total_volume.gbp) }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Second row -->
              <div
                class="grid grid-cols-3 text-center border-b border-gray-800 pb-5"
              >
                <div>
                  <h4>circ. supply</h4>
                  <p class="md:text-xl">
                    {{
                      addCommas(
                        slugCoin.market_data.circulating_supply.toFixed(0)
                      )
                    }}
                  </p>
                </div>
                <div>
                  <h4>total supply</h4>
                  <p class="md:text-xl">
                    <span v-if="slugCoin.market_data.total_supply != null">{{
                      addCommas(slugCoin.market_data.total_supply.toFixed(0))
                    }}</span
                    ><span v-else>-</span>
                  </p>
                </div>
                <div>
                  <h4>max supply</h4>
                  <p class="md:text-xl">
                    <span v-if="slugCoin.market_data.max_supply != null">{{
                      addCommas(slugCoin.market_data.max_supply.toFixed(0))
                    }}</span
                    ><span v-else>-</span>
                  </p>
                </div>
              </div>

              <!-- Third row -->
              <div
                class="grid grid-cols-3 text-center border-b border-gray-800 pb-5"
              >
                <div>
                  <h4>24 hr low</h4>
                  <p class="md:text-xl">
                    £{{ addCommas(slugCoin.market_data.low_24h.gbp) }}
                  </p>
                </div>
                <div>
                  <h4 class="">24 hr high</h4>
                  <p class="md:text-xl">
                    £{{ addCommas(slugCoin.market_data.high_24h.gbp) }}
                  </p>
                </div>
                <div>
                  <h4>all time high</h4>
                  <p class="md:text-xl">
                    £{{ addCommas(slugCoin.market_data.ath.gbp) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- % Change -->
            <div class="grid grid-cols-3 gap-6 xl:w-1/2">
              <!--  -->
              <div class="text-center">
                <h4>1h</h4>
                <p
                  class="text-xl font-medium"
                  :class="
                    slugCoin.market_data.price_change_percentage_1h_in_currency
                      .gbp > 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  "
                >
                  {{
                    slugCoin.market_data.price_change_percentage_1h_in_currency.gbp.toFixed(
                      2
                    )
                  }}%
                </p>
              </div>
              <div class="text-center">
                <h4>24h</h4>
                <p
                  class="text-xl font-medium"
                  :class="
                    slugCoin.market_data.price_change_percentage_24h_in_currency
                      .gbp > 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  "
                >
                  {{
                    slugCoin.market_data.price_change_percentage_24h.toFixed(2)
                  }}%
                </p>
              </div>

              <div class="text-center">
                <h4>7d</h4>
                <p
                  class="text-xl font-medium"
                  :class="
                    slugCoin.market_data.price_change_percentage_7d > 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  "
                >
                  {{
                    slugCoin.market_data.price_change_percentage_7d.toFixed(2)
                  }}%
                </p>
              </div>

              <div class="text-center">
                <h4>14d</h4>
                <p
                  class="text-xl font-medium"
                  :class="
                    slugCoin.market_data.price_change_percentage_14d > 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  "
                >
                  {{
                    slugCoin.market_data.price_change_percentage_14d.toFixed(2)
                  }}%
                </p>
              </div>

              <div class="text-center">
                <h4>30d</h4>
                <p
                  class="text-xl font-medium"
                  :class="
                    slugCoin.market_data.price_change_percentage_30d > 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  "
                >
                  {{
                    slugCoin.market_data.price_change_percentage_30d.toFixed(2)
                  }}%
                </p>
              </div>

              <div class="text-center">
                <h4>1y</h4>
                <p
                  class="text-xl font-medium"
                  :class="
                    slugCoin.market_data.price_change_percentage_1y > 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  "
                >
                  {{
                    slugCoin.market_data.price_change_percentage_1y.toFixed(2)
                  }}%
                </p>
              </div>
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
    const { formatPrice, addCommas } = utils()
    const { getOneCoin } = useCoinApi()
    const slugCoin = ref()
    const formattedPrice = ref()

    const { fetchState: fetchCoinState } = useFetch(async () => {
      slugCoin.value = await getOneCoin(params.value.id)
      formattedPrice.value = formatPrice(
        slugCoin.value.market_data.current_price.gbp
      )

      console.log(slugCoin.value)
    })

    return { slugCoin, fetchCoinState, formattedPrice, addCommas }
  },
})
</script>

<style lang="postcss" scoped>
h4 {
  @apply text-gray-500 uppercase text-xs;
}
</style>