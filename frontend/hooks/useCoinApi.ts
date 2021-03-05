import axios from 'axios'

export default function () {
  const getCoinInfo = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=10&page=1&sparkline=false'
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
      console.log(response.data)
      return response.data
    } catch (err) {
      console.log(err)
    }
  }



  return { getCoinInfo, getOneCoin }
}