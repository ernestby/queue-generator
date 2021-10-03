import Vue from "vue";
import Vuex from "vuex";
import { setToken, getToket } from "@/helpers/jwt";
import { getToken } from "../../helpers/jwt";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userGroups: [],
    currentUser: {},
  },
  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },
    setUserGroups(state, payload) {
      state.userGroups = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    async register({ commit }, params) {
      const result = await Vue.$http.post("/auth/registration/", params);
    },
    async login({ commit }, params) {
      const result = await Vue.$http.post("/auth/login/", params);
      const token = "Bearer " + result.data.token;
      commit("setToken", token);
      setToken(token);
    },
    async getCurrentUser({ commit }, params) {
      const result = await Vue.$http.get("/auth/current_user/", { params });
      commit("setCurrentUser", result.data[0]);
    },
    async getUserGroups({ commit }) {
      const result = await Vue.$http.get("/auth/usergroups/");
      commit("setUserGroups", result.data);
    },
  },
};
