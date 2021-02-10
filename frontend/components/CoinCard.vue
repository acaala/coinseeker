<template>
  <div
    class="pt-8 mb-2 flex flex-wrap border-gray-800 items-center justify-between"
  >
    <div class="flex items-center">
      <div class="w-10 mr-2 items-center" v-if="iconURL != undefined">
        <img class="w-full" :src="iconURL" alt="" />
      </div>
      <div class="md:mb-0 flex-shrink-0 flex flex-col">
        <span class="text-gray-500 text-sm">{{ asset_id }}</span>
        <span class="font-semibold text-white text-2xl">{{ name }}</span>
      </div>
    </div>

    <div class="items-center">
      <h2 class="text-2xl font-medium text-white title-font mb-2 items-center">
        ${{ formattedPrice }}
      </h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
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

    if (props.price_usd) {
      formattedPrice.value = formatPrice(props.price_usd)
    } else {
      formattedPrice.value = 'No Price Data'
    }

    onMounted(async () => {
      let iconArray = await getCoinIcon()
      iconURL.value = getIconUrlFromAssetId(iconArray!, props.asset_id!)
    })

    return { formattedPrice, iconURL }
  },
})
</script>
