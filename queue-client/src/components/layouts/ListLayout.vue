<template>
  <div class="list-layout">
    <Header />
    <slot />
  </div>
</template>

<script>
import Header from "@/components/common/Header";
export default {
  name: "ListLayout",
  components: {
    Header,
  },
};
</script>

<style lang="scss" scoped>
.list-layout {
  &__username {
    margin-right: 15px;
  }
}
</style>
