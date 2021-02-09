<template>
  <div
    class="py-8 flex flex-wrap md:flex-nowrap border-b-2 border-gray-800 items-center"
  >
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
import axios from 'axios'
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
    const iconURL = ref()

    formattedPrice.value = formatPrice(props.price_usd)

    interface Icon {
      asset_id: String
      url: String
    }
    let iconArray: Icon[]

    async function getIcon() {
      const response = await axios.get(
        `https://rest-sandbox.coinapi.io/v1/assets/icons/32?apikey=6A408DA3-1249-4CEF-9D00-67FCBBA3733E&`
      )
      iconArray = response.data
      getIconFromAssetId(props.asset_id)
    }

    const getIconFromAssetId = (asset_id) => {
      const icon = iconArray.find((icon) => icon.asset_id === props.asset_id)
      if (icon === undefined) {
        return { msg: `No associated Icon with the asset_id: ${asset_id}` }
      }
      iconURL.value = icon.url
    }
    getIcon()

    return { formattedPrice, iconURL }
  },
})
</script>
