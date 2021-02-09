export default function () {
    const formatPrice = (price: number) => {
        const priceTo2DP = (Math.round(price * 100) / 100).toFixed(2)
        return priceTo2DP
    }
    const getIconUrlFromAssetId = (iconArray: Icon[], asset_id: String) => {
        const icon = iconArray.find((icon) => icon.asset_id === asset_id)
        if (icon === undefined) {
            return { msg: `No associated Icon with the asset_id: ${asset_id}` }
        }
        return icon.url
    }
    return { formatPrice, getIconUrlFromAssetId }
}