export default function () {
    const formatPrice = (price: number) => {
        const priceTo2DP = (Math.round(price * 100) / 100).toFixed(2)
        const formattedPrice = addCommas(priceTo2DP)

        return formattedPrice
    }

    const addCommas = (nStr: string) => {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }


    return { formatPrice, addCommas }
}