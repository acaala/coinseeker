import { ref } from '@nuxtjs/composition-api'
export default function () {
    const getCurrencySymbol = (userCurrency) => {
        let symbol = ref()
        const currencySymbols = {
            USD: '$', // US Dollar
            EUR: '€', // Euro
            CRC: '₡', // Costa Rican Colón
            GBP: '£', // British Pound Sterling
            ILS: '₪', // Israeli New Sheqel
            INR: '₹', // Indian Rupee
            JPY: '¥', // Japanese Yen
            KRW: '₩', // South Korean Won
            NGN: '₦', // Nigerian Naira
            PHP: '₱', // Philippine Peso
            PLN: 'zł', // Polish Zloty
            PYG: '₲', // Paraguayan Guarani
            THB: '฿', // Thai Baht
            UAH: '₴', // Ukrainian Hryvnia
            VND: '₫', // Vietnamese Dong
            CAD: '$', // Canadian Dollar
        }

        if (currencySymbols[userCurrency.value] !== undefined) {
            symbol.value = currencySymbols[userCurrency.value]

        } return { symbol }
    }

    return { getCurrencySymbol }
}