<template>
  <div class="container mx-auto">
    <section class="text-gray-400 body-font overflow-hidden mt-5">
      <!-- Search -->
      <section class="container px-5 mx-auto mb-10">
        <div class="relative mb-4">
          <label
            for="full-name"
            class="leading-7 text-sm text-gray-400 tracking-wide"
            >Search for a coin below!</label
          >
          <div class="flex items-center relative">
            <input
              type="text"
              id="full-name"
              name="full-name"
              placeholder="E.g. BTC, Ethereum..."
              v-model="userInput"
              @keyup.enter="handleGetUserInputCoin"
              class="w-full bg-secondary bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-gray-900 rounded border border-gray-800 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <div
              @click="handleGetUserInputCoin"
              class="absolute right-0 mr-4 border-l-2 pl-2 border-gray-800"
            >
              <Search class="w-6 h-6 items-center cursor-pointer" />
            </div>
          </div>
        </div>
        <div v-if="userInputCoin">
          <UserCoinCard v-bind="userInputCoin" />
        </div>
      </section>

      <div class="mx-auto container">
        <div class="mx-4 my-8 border-b-2 border-gray-800 sticky">
          <h2 class="tracking-widest uppercase">Coinlist</h2>
        </div>
        <div class="container px-5 pb-24 mx-auto">
          <div class="-my-4">
            <div v-if="fetchCoinsState.pending" class="grid grid-cols-1">
              <CoinCardSkeleton />
              <CoinCardSkeleton />
              <CoinCardSkeleton />
              <CoinCardSkeleton />
              <CoinCardSkeleton />
              <CoinCardSkeleton />
            </div>
            <div v-else>
              <CoinCard
                v-for="(coin, index) in coinsInfoArray"
                :key="index"
                v-bind="coin"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useFetch,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import useCoinApi from '../hooks/useCoinApi'
export default defineComponent({
  setup() {
    const { app } = useContext()
    const coinsInfoArray = ref()
    const { getCoinInfo, getOneCoin } = useCoinApi()
    let userInput = ref('')
    const userInputCoin = ref()

    const { fetchState: fetchCoinsState } = useFetch(async () => {
      const response = await getCoinInfo()
      coinsInfoArray.value = response?.data ?? 'No data here!'
    })

    async function handleGetUserInputCoin() {
      userInputCoin.value = undefined
      if (userInput.value != '') {
        userInputCoin.value = await getOneCoin(
          userInput.value.toLowerCase().trim()
        )
      } else {
        app.$toast.show('Please enter a coin', { duration: 2000 })
      }
      userInput.value = ''
    }

    return {
      coinsInfoArray,
      userInput,
      userInputCoin,
      handleGetUserInputCoin,
      fetchCoinsState,
    }
  },
})
</script>
