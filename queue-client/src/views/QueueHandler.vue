<template>
  <DashboardLayout>
    <div class="queue-handler">
      <div class="queue-handler__information">
        <div class="queue-handler__information-block">
          <component
            :is="stateComponent"
            :assignedQueue="assignedQueue || {}"
          />
        </div>
        <div class="queue-handler__information-block">
          <div class="queue-handler__block-title">Ожидают очереди</div>
          <div class="queue-handler__number queue-handler__number--red">
            {{ groupActiveQueues }}
          </div>
          <div class="queue-handler__bottom-info">
            Вся очередь: {{ activeQueues.length || 0 }}
          </div>
        </div>
      </div>
      <div class="queue-handler__buttons">
        <button
          v-for="button in buttons"
          :key="button.code"
          @click="action(button.code)"
          :class="[
            'queue-handler__button',
            'queue-handler__button--' + button.code,
          ]"
        >
          {{ button.title }}
        </button>
      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import { mapState } from "vuex";
import Free from "@/components/states/Free";
import Break from "@/components/states/Break";
import Busy from "@/components/states/Busy";

export default {
  data() {
    return {
      isConnected: false,
      stateComponent: "",
    };
  },
  components: {
    Free,
    Break,
    Busy,
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },
    disconnect() {
      this.isConnected = false;
    },
    // Fired when the server sends something on the "messageChannel" channel.
    update() {
      this.$store.dispatch("getCurrentUser", { id: 2 });
      this.getData();
    },
  },
  watch: {
    "currentUser.state"() {
      this.setState();
    },
  },
  computed: {
    ...mapState(["activeQueues", "assignedQueue", "currentUser"]),
    groupActiveQueues() {
      return this.activeQueues.filter((q) => q.group_id === 1).length || 0;
    },

    buttons() {
      const buttons = [];
      console.log(this.currentUser.state);
      switch (this.currentUser.state) {
        case "free":
          buttons.push({ title: "Поставить на паузу", code: "break" });
          break;

        case "busy":
          buttons.push(
            { title: "Завершить", code: "finish" },
            { title: "Завершить с паузой", code: "finish_with_break" }
          );
          break;

        case "break":
          buttons.push({ title: "Начать обслуживание", code: "free" });
          break;
      }

      return buttons;
    },
  },
  methods: {
    action(type) {
      switch (type) {
        case "free":
          this.$store.dispatch("startServe", {
            operatorId: this.currentUser.id,
            groupId: this.currentUser.group_id,
          });
          break;
        case "finish":
          this.$store.dispatch("finishCurrentQueue", {
            groupId: this.currentUser.group_id,
            operatorId: this.currentUser.id,
            prefix: this.assignedQueue.prefix,
            number: this.assignedQueue.number,
          });
          break;
        case "finish_with_break":
          this.$store.dispatch("finishCurrentQueue", {
            groupId: this.currentUser.group_id,
            operatorId: this.currentUser.id,
            prefix: this.assignedQueue.prefix,
            number: this.assignedQueue.number,
            break: true,
          });
          break;
        case "break":
          this.$store.dispatch("updateState", {
            operatorId: this.currentUser.id,
            state: "break",
          });
          break;

        default:
          break;
      }
    },
    startServe() {
      this.$store.commit("setCurrentUser", {
        ...this.currentUser,
        state: "free",
      });
      this.$store.dispatch("startServe", {
        groupId: this.currentUser.group_id,
        operatorId: this.currentUser.id,
      });
    },
    finishCurrent() {},
    getData() {
      this.$store.dispatch("getActiveQueues");
      this.$store.dispatch("getAssignedQueue", {
        operatorId: this.currentUser.id,
      });
    },
    setState() {
      this.stateComponent = this.currentUser.state;
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    this.setState();
  },
};
</script>

<style lang="scss" scoped></style>
