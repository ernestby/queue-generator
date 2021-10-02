<template>
  <button class="button" @click="submitHandler()">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: {
      required: true,
      type: String,
      default: "Отправить",
    },
    callback: {
      required: true,
    },
  },
  methods: {
    submitHandler() {
      this.callback();
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  background: #2196f3;
  border: none;
  padding: 13px 30px;
  color: white;
}
</style>
