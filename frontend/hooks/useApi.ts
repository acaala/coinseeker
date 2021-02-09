import { ref } from '@nuxtjs/composition-api'
import axios from 'axios'

export default function () {
  const getCoinInfo = async () => {
    try {
      const response = await axios.get(
        'https://rest-sandbox.coinapi.io/v1/assets/BTC?apikey=6A408DA3-1249-4CEF-9D00-67FCBBA3733E'
      )
      return response
    } catch (err) {
      console.log(err)
    }
  }
  return { getCoinInfo }
}