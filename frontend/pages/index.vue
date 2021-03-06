<template>
  <div class="container mx-auto">
    <section class="text-gray-400 body-font overflow-hidden mt-5 relative">
      <!-- Search -->
      <section class="container px-5 mx-auto mb-10">
        <div class="relative mb-1">
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
              placeholder="E.g. Bitcoin, Ethereum..."
              v-model="userInput"
              @keyup.enter="handleGetUserInputCoin"
              @keyup="inputSearchArray"
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
        <!-- Search container -->

        <div class="absolute z-10 container pr-10">
          <div
            class="py-2 border-b border-gray-800 hover:bg-gray-800 cursor-pointer rounded-sm containter bg-secondary"
            v-for="(searchResult, index) in filteredSearchArray.slice(0, 5)"
            :key="index"
            @click="searchArrayClicked(searchResult)"
          >
            <p class="pl-2 font-medium tracking-wide">
              {{ searchResult }}
            </p>
          </div>
        </div>

        <div v-if="userInputCoin">
          <UserCoinCard
            v-bind="userInputCoin"
            :currency_symbol="displayCurrencySymbol"
            :user_currency="userCurrency"
          />
        </div>
        <div class="flex justify-center pt-8" v-if="userSearchLoading">
          <div class="loading2"><i></i><i></i></div>
        </div>
      </section>

      <div class="mx-auto container">
        <div class="flex justify-between mx-5 my-8 items-end">
          <div class="sticky">
            <h2 class="tracking-widest uppercase border-b-2 border-gray-800">
              Coinlist
            </h2>
          </div>

          <div class="flex ml-6 items-center">
            <div class="relative">
              <select
                v-model="userCurrency"
                class="rounded border border-gray-700 focus:ring-2 focus:ring-indigo-900 bg-transparent appearance-none py-2 focus:outline-none focus:border-indigo-500 text-white pl-3 pr-10"
              >
                <option>GBP</option>
                <option>USD</option>
                <option>EUR</option>
                <option>JPY</option>
                <option>CAD</option>
                <option>ILS</option>
                <option>INR</option>
                <option>KRW</option>
                <option>NGN</option>
                <option>PHP</option>
                <option>PLN</option>
                <option>THB</option>
                <option>UAH</option>
                <option>VND</option>
              </select>
              <span
                class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center"
              >
                <DownArrow />
              </span>
            </div>
          </div>
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
                :currency_symbol="displayCurrencySymbol"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  defineComponent,
  useFetch,
  ref,
  useContext,
  watch,
  useStore,
} from '@nuxtjs/composition-api'
import useCoinApi from '../hooks/useCoinApi'
import vueStore from '../hooks/useVueStore'
import useSymbolCheck from '../hooks/symbolCheck'
export default defineComponent({
  setup() {
    const { app } = useContext()
    const { getCoinInfo, getOneCoin } = useCoinApi()
    const { checkForCurrency, changeStoredCurrency } = vueStore()
    const { getCurrencySymbol } = useSymbolCheck()
    const coinsInfoArray = ref()
    const userInputCoin = ref()
    let userInput = ref('')
    let userCurrency = ref()
    let displayCurrencySymbol = ref()
    let userSearchArray = ref([])
    let filteredSearchArray = ref([])
    let userSearchLoading = ref(false)

    const { fetch: fetchCoin, fetchState: fetchCoinsState } = useFetch(
      async () => {
        userCurrency.value = checkForCurrency()
        const response = await getCoinInfo(userCurrency.value, '10')
        userSearchArray.value = await getCoinInfo(userCurrency.value, '100')
        coinsInfoArray.value = response?.data ?? 'No data here!'
      }
    )

    async function inputSearchArray() {
      filteredSearchArray.value = []
      const searchArray = userSearchArray.value.data
      let i = 0

      for (i = 0; i < searchArray.length; i++) {
        if (
          searchArray[i].name
            .toLowerCase()
            .includes(userInput.value.toLowerCase()) === true &&
          userInput.value !== ''
        ) {
          if (!filteredSearchArray.value.includes(searchArray[i].name))
            filteredSearchArray.value.push(searchArray[i].name)
        }
      }
    }

    function searchArrayClicked(searchResult) {
      userInput.value = searchResult
      filteredSearchArray.value = []
      handleGetUserInputCoin()
    }

    watch(userCurrency, () => {
      displayCurrencySymbol.value = getCurrencySymbol(userCurrency).symbol.value
      changeStoredCurrency(userCurrency.value)
      fetchCoin()
    })

    async function handleGetUserInputCoin() {
      userInputCoin.value = undefined
      userSearchLoading.value = true
      userInput.value = userInput.value.replace(/\s/g, '')
      if (userInput.value != '') {
        userInputCoin.value = await getOneCoin(
          userInput.value.toLowerCase().trim()
        )
      } else {
        app.$toast.show('Please enter a coin', { duration: 2000 })
      }
      userInput.value = ''
      userSearchLoading.value = false
    }

    return {
      coinsInfoArray,
      userInput,
      userInputCoin,
      handleGetUserInputCoin,
      fetchCoinsState,
      userCurrency,
      displayCurrencySymbol,
      inputSearchArray,
      filteredSearchArray,
      searchArrayClicked,
      userSearchLoading,
    }
  },
})
</script>
<style>
.loading2 i {
  width: 25px;
  height: 25px;
  display: inline-block;
  background: #ff5954;
  border-radius: 50%;
}
.loading2 i:nth-child(1) {
  animation: loading2-ani1 1s ease-in-out infinite;
}
.loading2 i:nth-child(2) {
  background: #00a8ce;
  margin-left: -10px;
  animation: loading2-ani1 1s ease-in-out 0.5s infinite;
}
@keyframes loading2-ani1 {
  70% {
    transform: scale(0.5);
  }
}
</style>