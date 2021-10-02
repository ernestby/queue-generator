<template>
  <div class="empty-layout">
    <div class="empty-layout__content"><slot /></div>
  </div>
</template>

<script>
export default {
  name: "EmptyLayout",
};
</script>

<style lang="scss" scoped>
.empty-layout {
  &__content {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
