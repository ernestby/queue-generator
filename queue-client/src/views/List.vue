<template>
  <EmptyLayout>
    <h1>Электронная очередь</h1>
    <div class="list">
      <div class="list__header">
        <div>Клиент</div>
        <div>Окно</div>
      </div>
      <div class="list__body" v-for="queue of assignedQueues" :key="queue.id">
        <div class="list__queue list__queue--assigned">
          {{ queue.prefix }}-{{ queue.number }}
        </div>
        <div class="list__room list__room--assigned">{{ queue.room }}</div>
      </div>
      <div class="list__body" v-for="queue of activeQueues" :key="queue.id">
        <div class="list__queue">{{ queue.prefix }}-{{ queue.number }}</div>
        <div class="list__room">-</div>
      </div>
    </div>
  </EmptyLayout>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("auth", ["token"]),
    ...mapState("queue", ["activeQueues", "assignedQueues"]),
  },
  sockets: {
    update() {
      this.getQueues();
    },
  },
  methods: {
    getQueues() {
      this.$store.dispatch("queue/getAssignedQueues");
      this.$store.dispatch("queue/getActiveQueues");
    },
  },
  created() {
    this.getQueues();
  },
};
</script>

<style lang="scss" scoped>
h1 {
  border-bottom: 1px solid #ff5722;
  padding-bottom: 10px;
}

.list {
  margin-top: 50px;
  background: white;
  padding: 35px;

  &__header {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 20px;
    border-bottom: 1px solid #9e9e9e63;
    padding-bottom: 15px;

    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;

    > div {
      width: 50%;
      text-align: center;
    }
  }

  &__body {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 20px;

    > div {
      width: 50%;
      text-align: center;

      font-weight: bold;
      font-size: 20px;
    }
  }

  .list__queue--assigned,
  .list__room--assigned {
    color: #ff5722;
  }
}
</style>
