import Vue from 'vue';

const state = Vue.observable({ user: null, username: '', loading: false });

const store = {
  user: () => state.user,
  username: () => state.username,
  loading: () => state.loading,
};

export const mutations = {
  setUser(user) {
    state.user = user;
  },
  setLoading(loading) {
    state.loading = loading;
  },
  setLogin(login) {
    state.username = login;
  },
};

export default store;
