import axios from 'axios'

import { useContext } from '@nuxtjs/composition-api'

export default function () {
  const { app } = useContext()


  const getCoinInfo = async (userCurrency: String) => {
    try {
      userCurrency.toLowerCase()
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${userCurrency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
      )
      return response
    } catch (err) {
      console.log(err)
    }
  }


  const getOneCoin = async (coinId: String) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}?tickers=false&market_data=true&sparkline=false`

      )
      return response.data
    } catch (err) {
      app.$toast.error('Cannot find Coin', { duration: 2000 })
    }
  }



  return { getCoinInfo, getOneCoin }
}