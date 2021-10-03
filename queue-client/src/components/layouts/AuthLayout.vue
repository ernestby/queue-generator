<template>
  <div class="auth-layout">
    <div class="auth-layout__content"><slot /></div>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>

<style lang="scss" scoped>
.auth-layout {
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
