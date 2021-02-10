<template>
  <div class="px-4">
    <section class="text-gray-400 body-font overflow-hidden mt-16">
      <div class="container px-5 mb-10 mx-auto flex justify-between items-end">
        <div class="">
          <h1 class="text-3xl pt-5 tracking-wide title-font text-gray-200">
            Coinseeker
          </h1>
          <p class="w-16 h-1 bg-indigo-900 mt-2 rounded-full"></p>
        </div>
        <SelectButton />
      </div>

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
              placeholder="E.g. BTC, ETH..."
              v-model="userInput"
              @keyup.enter="handleGetUserInputCoin"
              class="w-full bg-secondary bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <div class="absolute right-0 mr-4 border-l-2 pl-2 border-gray-800">
              <Search class="w-6 h-6 items-center" />
            </div>
          </div>
        </div>
        <div v-if="userInputCoin">
          <CoinCard v-bind="userInputCoin" />
        </div>
      </section>

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
    const { getCoinInfo, getUserInputCoin } = useCoinApi()
    let userInput = ref('')
    const userInputCoin = ref()

    onMounted(async () => {
      const response = await getCoinInfo()
      coinsInfoArray.value = response?.data ?? 'No data here!'
    })

    async function handleGetUserInputCoin() {
      userInputCoin.value = await getUserInputCoin(userInput.value)
      userInput.value = ''
    }

    return { coinsInfoArray, userInput, userInputCoin, handleGetUserInputCoin }
  },
})
</script>
