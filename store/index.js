// export const state = () => ({
//     definitions: null,
// });
//
// export const actions = {
//     async nuxtServerInit({commit}, {app}) {
//         try {
//             const data = await app.$axios.$get(app.$api.definitions);
//             commit('SET_DEFINITIONS', data)
//         } catch(e) {
//             console.error('nuxtServerInit: ', e)
//         }
//     },
// };
//
// export const mutations = {
//     SET_DEFINITIONS(state, payload) {
//         state.definitions = payload;
//     },
// };
//
// export const getters = {
//     // getDefinitions(state) {
//     //     return state.definitions;
//     // },
//     getIndustryGroup: (state) => {
//         return state.definitions.IndustryGroup;
//     },
//     getIndustryGroupSpecializations: (state) => {
//         return function(id) {
//             state.definitions.Industry.filter(industry => industry.industry_group_id !== id);
//         };
//     },
// };
