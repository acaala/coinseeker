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
              placeholder="E.g. Bitcoin, Ethereum..."
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
                :currency_symbol="displayCurrenySymbol"
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
} from '@nuxtjs/composition-api'
import useCoinApi from '../hooks/useCoinApi'
export default defineComponent({
  setup() {
    const { app } = useContext()
    const coinsInfoArray = ref()
    const { getCoinInfo, getOneCoin } = useCoinApi()
    const userInputCoin = ref()
    let userInput = ref('')
    let userCurrency = ref('GBP')
    let displayCurrenySymbol = ref()
    const currencySymbols = {
      USD: '$', // US Dollar
      EUR: '€', // Euro
      CRC: '₡', // Costa Rican Colón
      GBP: '£', // British Pound Sterling
      ILS: '₪', // Israeli New Sheqel
      INR: '₹', // Indian Rupee
      JPY: '¥', // Japanese Yen
      KRW: '₩', // South Korean Won
      NGN: '₦', // Nigerian Naira
      PHP: '₱', // Philippine Peso
      PLN: 'zł', // Polish Zloty
      PYG: '₲', // Paraguayan Guarani
      THB: '฿', // Thai Baht
      UAH: '₴', // Ukrainian Hryvnia
      VND: '₫', // Vietnamese Dong
    }

    const { fetch: fetchCoin, fetchState: fetchCoinsState } = useFetch(
      async () => {
        const response = await getCoinInfo(userCurrency.value)
        coinsInfoArray.value = response?.data ?? 'No data here!'
        displayCurrenySymbol.value = currencySymbols['GBP']
      }
    )

    watch(userCurrency, async () => {
      await fetchCoin()
      if (currencySymbols[userCurrency.value] !== undefined) {
        displayCurrenySymbol.value = currencySymbols[userCurrency.value]
      }
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
      userCurrency,
      displayCurrenySymbol,
    }
  },
})
</script>
