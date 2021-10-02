import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    activeQueues: [],
    assignedQueues: [],
    assignedQueue: "",
    queueList: [],
  },
  mutations: {
    setActiveQueues(state, payload) {
      state.activeQueues = payload;
    },
    setAssignedQueues(state, payload) {
      state.assignedQueues = payload;
    },
    setAssignedQueue(state, payload) {
      state.assignedQueue = payload;
    },
  },
  actions: {
    async getActiveQueues({ commit }, params) {
      const result = await Vue.$http.get("/queue/active_queues/");
      commit("setActiveQueues", result.data);
    },
    async getAssignedQueues({ commit }, params) {
      const result = await Vue.$http.get("/queue/assigned_queues/");
      commit("setAssignedQueues", result.data);
    },
    async getAssignedQueue({ commit }, params) {
      const result = await Vue.$http.get("/queue/assigned_queue/", { params });
      commit("setAssignedQueue", result.data[0]);
    },
    async finishCurrentQueue({ commit }, params) {
      const result = await Vue.$http.post("/queue/finish_queue/", params);
    },
    async generateQueueNumber({}, params) {
      const result = await Vue.$http.post("/queue/generate_queue/", params);
    },
    async startServe({ commit }, params) {
      const result = await Vue.$http.post("/queue/start_serve/", params);
    },
    async updateState({ commit }, params) {
      const result = await Vue.$http.put("/queue/update_state/", { params });
      commit("setCurrentUser", result.data[0]);
    },
    async getQueueList({ commit }, params) {
      const result = await Vue.$http.get("/queue/queue_list/", { params });
      commit("setQueueList", result.data[0]);
    },
  },
};
