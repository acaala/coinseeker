<template>
  <div class="py-8 flex flex-wrap md:flex-nowrap border-gray-800 items-center">
    <div class="w-8 h-6 mr-2 items-center" v-if="iconURL != undefined">
      <img class="w-full" :src="iconURL" alt="" />
    </div>
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
import useCoinApi from '../hooks/useCoinApi'
export default defineComponent({
  props: {
    asset_id: String,
    name: String,
    price_usd: Number,
  },

  setup(props) {
    const { formatPrice, getIconUrlFromAssetId } = utils()
    const { getCoinIcon } = useCoinApi()
    const formattedPrice = ref()
    const iconURL = ref()

    formattedPrice.value = formatPrice(props.price_usd)

    async function handleGetIcon() {
      let iconArray = await getCoinIcon()
      iconURL.value = getIconUrlFromAssetId(iconArray, props.asset_id)
    }
    handleGetIcon()

    return { formattedPrice, iconURL }
  },
})
</script>
