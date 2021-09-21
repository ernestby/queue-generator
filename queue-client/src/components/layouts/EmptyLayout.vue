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
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr minmax(auto, 1150px) 1fr;

  &__content {
    grid-column: 2/3;
  }
}
</style>
