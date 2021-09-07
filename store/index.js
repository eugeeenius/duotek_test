export const state = () => ({
    darkTheme: false,
    isBurgerOpen: false,
});

export const actions = {
    setDarkTheme({commit}, payload) {
        commit('SET_THEME', payload);
    },

    toggleBurger({commit}) {
        commit('SET_BURGER_STATE');
    },
};

export const mutations = {
    SET_THEME(state, payload) {
        state.darkTheme = payload;
    },

    SET_BURGER_STATE(state) {
        state.isBurgerOpen = !state.isBurgerOpen;
    },
};
