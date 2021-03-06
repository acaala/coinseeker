import { useStore } from '@nuxtjs/composition-api'

export default function () {
    const store = useStore()

    const checkForCurrency = (userCurrency) => {
        if (store.state.currency.userStoredCurrency !== '') {
            userCurrency.value = store.state.currency.userStoredCurrency
        } else {
            userCurrency.value = 'GBP'
        }
    }

    return { checkForCurrency }
}