
export const state = () => ({
    userStoredCurrency: ''
})

export const mutations = {
    change(state, userSelection) {
        state.userStoredCurrency = userSelection
    }
}