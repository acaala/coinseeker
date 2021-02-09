export default function () {
    const formatPrice = (price: number) => {
        const priceTo2DP = (Math.round(price * 100) / 100).toFixed(2)
        return priceTo2DP
    }
    return { formatPrice }
}