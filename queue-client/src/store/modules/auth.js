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
  },
  actions: {
    async register({ commit }, params) {
      const result = await Vue.$http.post("/auth/registration/", params);
    },
    async login({ commit }, params) {
      const result = await Vue.$http.post("/auth/login/", params);
      setToken("Bearer " + result.data.token);
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
