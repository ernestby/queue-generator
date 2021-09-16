<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getCurrentUser", { id: 2 });
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/index";
</style>
