export const state = () => ({
    darkTheme: false,
});

export const actions = {
    setDarkTheme({commit}, payload) {
        commit('SET_THEME', payload);
    },
};

export const mutations = {
    SET_THEME(state, payload) {
        state.darkTheme = payload;
    },
};
