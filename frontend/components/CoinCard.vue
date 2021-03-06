<template>
  <nuxt-link :to="{ name: 'coins-id', params: { id: id } }">
    <div
      id="CoinCard"
      class="mb-3 p-4 flex flex-wrap rounded-lg items-center justify-between border border-gray-800"
    >
      <div class="flex items-center">
        <div class="w-10 mr-2 items-center">
          <img class="w-full rounded-full" :src="image" />
        </div>

        <div class="md:mb-0 flex-shrink-0 flex flex-col">
          <span class="text-gray-500 text-sm uppercase">{{ symbol }}</span>
          <span class="font-semibold text-white text-xl md:text-2xl">{{
            name
          }}</span>
        </div>
      </div>

      <div class="items-center">
        <h2
          class="text-xl md:text-2xl font-medium text-white title-font mb-2 items-center"
        >
          {{ currency_symbol }}{{ formattedPrice }}
        </h2>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import utils from '../hooks/utils'
export default defineComponent({
  props: {
    id: String,
    symbol: String,
    name: String,
    current_price: Number,
    image: String,
    currency_symbol: String,
  },

  setup(props) {
    const { formatPrice } = utils()
    const formattedPrice = ref()

    if (props.current_price) {
      formattedPrice.value = formatPrice(props.current_price)
    } else {
      formattedPrice.value = 'No Price Data'
    }
    return { formattedPrice }
  },
})
</script>
<style lang="postcss" scoped>
#CoinCard:hover {
  background: #161616;
  cursor: pointer;
}
</style>
