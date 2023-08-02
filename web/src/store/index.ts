import { createStore, Store } from 'vuex';

interface User {
  id: number;
  name: string;
  email: string;
}

interface State {
  token: string | null;
  user: User | null;
}

const store = createStore<State>({
  state: {
    token: localStorage.getItem('token') || null,
    user: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    setAuthData({ commit }, { token, user }) {
      commit('setToken', token);
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('setToken', null);
      commit('setUser', null);
      localStorage.removeItem('token');
    },
  },
});

export default store;