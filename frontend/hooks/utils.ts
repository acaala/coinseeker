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

    const intToString = (num: number) => {
        if (num < 1000) {
            return num;
        }
        var si = [
            { v: 1E3, s: "K" },
            { v: 1E6, s: "M" },
            { v: 1E9, s: "B" },
            { v: 1E12, s: "T" },
            { v: 1E15, s: "P" },
            { v: 1E18, s: "E" }
        ];
        var i;
        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].v) {
                break;
            }
        }
        return (num / si[i].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].s;
    }


    return { formatPrice, addCommas, intToString }
}