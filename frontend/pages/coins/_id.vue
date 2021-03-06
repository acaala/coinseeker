<template>
  <div class="container mx-auto">
    <div v-if="fetchCoinState.pending">
      <SlugSkeleton />
    </div>

    <div v-else class="container mx-auto">
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
              <h3 class="text-2xl font-medium">
                {{ displayCurrencySymbol }}{{ formattedPrice }}
              </h3>
            </div>
          </div>

          <!-- Coin Info -->
          <div
            class="my-4 py-4 flex flex-col xl:flex-row xl:justify-between space-y-5"
          >
            <!-- Info -->
            <div class="grid grid-cols-1 space-y-5 xl:w-1/2">
              <!--  First Row -->
              <div
                class="grid gap-0 grid-cols-3 text-center items-center border-b border-gray-800 pb-5"
              >
                <div>
                  <h4>Rank</h4>
                  <p class="text-xl sm:text-2xl md:text-3xl">
                    {{ slugCoin.market_data.market_cap_rank }}
                  </p>
                </div>
                <div>
                  <h4>market cap</h4>
                  <p class="text-xl sm:text-2xl md:text-3xl">
                    {{ displayCurrencySymbol
                    }}{{
                      intToString(
                        slugCoin.market_data.market_cap[
                          userCurrency.toLowerCase()
                        ]
                      )
                    }}
                  </p>
                </div>
                <div>
                  <h4>total vol.</h4>
                  <p class="text-xl sm:text-2xl md:text-3xl">
                    {{ displayCurrencySymbol
                    }}{{
                      intToString(
                        slugCoin.market_data.total_volume[
                          userCurrency.toLowerCase()
                        ]
                      )
                    }}
                  </p>
                </div>
              </div>

              <!-- Second row -->
              <div
                class="grid grid-cols-3 text-center border-b border-gray-800 pb-5"
              >
                <div>
                  <h4>circ. supply</h4>
                  <p class="text-xl sm:text-2xl md:text-3xl">
                    {{ intToString(slugCoin.market_data.circulating_supply) }}
                  </p>
                </div>
                <div>
                  <h4>total supply</h4>
                  <p class="text-xl sm:text-2xl md:text-3xl">
                    <span v-if="slugCoin.market_data.total_supply != null">{{
                      intToString(slugCoin.market_data.total_supply)
                    }}</span
                    ><span v-else>-</span>
                  </p>
                </div>
                <div>
                  <h4>max supply</h4>
                  <p class="text-xl sm:text-2xl md:text-3xl">
                    <span v-if="slugCoin.market_data.max_supply != null">{{
                      intToString(slugCoin.market_data.max_supply)
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
                  <p class="text-xl sm:text-2xl md:text-3xl">
                    {{ displayCurrencySymbol
                    }}{{
                      addCommas(
                        slugCoin.market_data.low_24h[userCurrency.toLowerCase()]
                      )
                    }}
                  </p>
                </div>
                <div>
                  <h4 class="">24 hr high</h4>
                  <p class="text-xl sm:text-2xl md:text-3xl">
                    {{ displayCurrencySymbol
                    }}{{
                      addCommas(
                        slugCoin.market_data.high_24h[
                          userCurrency.toLowerCase()
                        ]
                      )
                    }}
                  </p>
                </div>
                <div>
                  <h4>all time high</h4>
                  <p class="text-xl sm:text-2xl md:text-3xl">
                    {{ displayCurrencySymbol
                    }}{{
                      addCommas(
                        slugCoin.market_data.ath[userCurrency.toLowerCase()]
                      )
                    }}
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
                  class="text-xl sm:text-2xl md:text-3xl font-medium"
                  :class="
                    slugCoin.market_data.price_change_percentage_1h_in_currency[
                      userCurrency.toLowerCase()
                    ] > 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  "
                >
                  {{
                    slugCoin.market_data.price_change_percentage_1h_in_currency[
                      userCurrency.toLowerCase()
                    ].toFixed(2)
                  }}%
                </p>
              </div>
              <div class="text-center">
                <h4>24h</h4>
                <p
                  class="text-xl font-medium sm:text-2xl md:text-3xl"
                  :class="
                    slugCoin.market_data
                      .price_change_percentage_24h_in_currency[
                      userCurrency.toLowerCase()
                    ] > 0
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
                  class="text-xl font-medium sm:text-2xl md:text-3xl"
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
                  class="text-xl font-medium sm:text-2xl md:text-3xl"
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
                  class="text-xl font-medium sm:text-2xl md:text-3xl"
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
                  class="text-xl font-medium sm:text-2xl md:text-3xl"
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
import vueStore from '../../hooks/useVueStore'
import useSymbolCheck from '../../hooks/symbolCheck'
export default defineComponent({
  setup() {
    const { params } = useContext()
    const { formatPrice, addCommas, intToString } = utils()
    const { getOneCoin } = useCoinApi()
    const { checkForCurrency } = vueStore()
    const { getCurrencySymbol } = useSymbolCheck()
    const slugCoin = ref()
    const formattedPrice = ref()
    let userCurrency = ref()
    let displayCurrencySymbol = ref()

    const { fetchState: fetchCoinState } = useFetch(async () => {
      slugCoin.value = await getOneCoin(params.value.id)
      userCurrency.value = checkForCurrency()
      displayCurrencySymbol.value = getCurrencySymbol(userCurrency).symbol.value
      formattedPrice.value = formatPrice(
        slugCoin.value.market_data.current_price[
          userCurrency.value.toLowerCase()
        ]
      )
    })

    return {
      slugCoin,
      fetchCoinState,
      formattedPrice,
      addCommas,
      intToString,
      userCurrency,
      displayCurrencySymbol,
    }
  },
})
</script>

<style lang="postcss" scoped>
h4 {
  @apply text-gray-500 uppercase text-xs;
}
</style>