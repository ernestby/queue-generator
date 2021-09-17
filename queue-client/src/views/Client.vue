<template>
  <MainLayout>
    <div class="queue-generator">
      <button
        v-for="group in userGroups"
        :key="group.id"
        @click="queue({ groupId: group.id, groupPrefix: group.prefix })"
      >
        {{ group.title }}
      </button>
    </div>
  </MainLayout>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userGroups"]),
  },
  methods: {
    queue(params) {
      this.$store.dispatch("generateQueueNumber", params);
    },
  },
  created() {
    this.$store.dispatch("getUserGroups");
  },
};
</script>

<style lang="scss" scoped>
.queue-generator {
  display: grid;
  grid-template: 1fr / 1fr 1fr;
  gap: 50px;

  button {
    border: none;
    padding: 50px;
    font-size: 25px;
    text-transform: uppercase;
    background: #673ab7;
    color: white;
  }
}
</style>
