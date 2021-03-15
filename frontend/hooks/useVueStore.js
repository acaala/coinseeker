import { useStore } from '@nuxtjs/composition-api'

export default function () {
    const store = useStore()

    const checkForCurrency = () => {
        if (store.state.currency.userStoredCurrency !== '') {
            return store.state.currency.userStoredCurrency
        } else {
            return 'GBP'
        }
    }

    const changeStoredCurrency = (selectedCurrency) => {
        store.commit('currency/change', selectedCurrency)
    }

    return { checkForCurrency, changeStoredCurrency }
}