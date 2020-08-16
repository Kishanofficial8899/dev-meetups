

export default {
    state: {
        loading: false,
        error: null,
    },

    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
        setError(state, payload) {
            state.error = payload;
        },
        clearError(state) {
            state.error = null;
        },
        updateMeeetup(state, payload) {
            const meetup = state.loadedMeetups.find(
                (meetup) => meetup.id === payload.id
            );
            if (payload.title) {
                meetup.title = payload.title;
            }
            if (payload.description) {
                meetup.description = payload.description;
            }
            if (payload.date) {
                meetup.date = payload.date;
            }
        },
    },
    actions: {
        clearError({ commit }) {
            commit('clearError');
        },
    },
    getters: {
        loading(state) {
            return state.loading;
        },
        error(state) {
            return state.error;
        },
    },
};
