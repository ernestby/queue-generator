import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeQueues: [],
    assignedQueue: "",
    userGroups: [],
    currentUser: {},
  },
  mutations: {
    setActiveQueues(state, payload) {
      state.activeQueues = payload;
      console.log("payload", payload);
    },
    setAssignedQueue(state, payload) {
      state.assignedQueue = payload;
    },
    setUserGroups(state, payload) {
      state.userGroups = payload;
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },
  },
  actions: {
    async getActiveQueues({ commit }, params) {
      const result = await Vue.$http.get("/get_active_queues/");
      commit("setActiveQueues", result.data);
    },
    async getAssignedQueue({ commit }, params) {
      const result = await Vue.$http.get("/get_assigned_queue/", { params });
      commit("setAssignedQueue", result.data[0]);
    },
    async finishCurrentQueue({ commit }, params) {
      const result = await Vue.$http.post("/finish_current_queue/", params);
    },
    async generateQueueNumber({}, params) {
      const result = await Vue.$http.post("/generate_queue_number/", params);
    },
    async getUserGroups({ commit }) {
      const result = await Vue.$http.get("/get_usergroups/");
      commit("setUserGroups", result.data);
    },
    async startServe({ commit }, params) {
      const result = await Vue.$http.post("/start_serve/", params);
    },
    async getCurrentUser({ commit }, params) {
      const result = await Vue.$http.get("/get_current_user/", { params });
      commit("setCurrentUser", result.data[0]);
    },
    async updateState({ commit }, params) {
      const result = await Vue.$http.put("/update_state/", { params });
      commit("setCurrentUser", result.data[0]);
    },
  },
  modules: {},
});
