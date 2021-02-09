import axios from 'axios'

export default function () {
  const apiKey = '6A408DA3-1249-4CEF-9D00-67FCBBA3733E'
  const getCoinInfo = async () => {
    try {
      const response = await axios.get(
        `https://rest-sandbox.coinapi.io/v1/assets/BTC;ETH;LINK;OMG;XLM;LTC?apikey=${apiKey}`
      )
      return response
    } catch (err) {
      console.log(err)
    }
  }

  const getCoinIcon = async () => {
    try {
      const response = await axios.get(
        `https://rest-sandbox.coinapi.io/v1/assets/icons/32?apikey=6A408DA3-1249-4CEF-9D00-67FCBBA3733E&`
      )
      const data = response.data as Icon[]

      return data
    } catch (err) {
      console.log(err)
    }
  }
  return { getCoinInfo, getCoinIcon }
}