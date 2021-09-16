<template>
  <div class="dashboard">
    <Sidebar class="dashboard__sidebar" />
    <Header class="dashboard__header" />
    <div class="dashboard__main"><slot /></div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  components: {
    Sidebar: () => import("@/components/common/Sidebar"),
    Header: () => import("@/components/common/Header"),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  display: grid;
  grid-template-areas: "sidebar header" "sidebar main";
  max-width: 100%;
  min-height: 100vh;
  grid-template-columns: min-content 1fr;
  grid-template-rows: max-content 1fr;
  &__sidebar {
    grid-area: sidebar;
    width: 250px;
  }

  &__header {
    grid-area: header;
    background: white;
    min-height: 60px;
  }

  &__main {
    grid-area: main;
    padding: 50px;
  }
}
</style>
