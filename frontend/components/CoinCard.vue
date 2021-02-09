<template>
  <div
    class="py-8 flex flex-wrap md:flex-nowrap border-b-2 border-gray-800 items-end"
  >
    <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
      <span class="text-gray-500 text-sm">{{ asset_id }}</span>
      <span class="font-semibold text-white text-2xl">{{ name }}</span>
    </div>
    <div class="md:flex-grow items-center">
      <h2 class="text-2xl font-medium text-white title-font mb-2 items-center">
        ${{ formattedPrice }}
      </h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import utils from '../hooks/utils'
export default defineComponent({
  props: {
    asset_id: String,
    name: String,
    price_usd: Number,
  },

  setup(props) {
    const { formatPrice } = utils()
    const formattedPrice = ref()
    formattedPrice.value = formatPrice(props.price_usd)

    return { formattedPrice }
  },
})
</script>
