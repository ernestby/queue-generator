<template>
  <div class="header">
    <div class="header__title">
      {{ currentUser.fullname }} <span>{{ currentUser.group_title }}</span>
    </div>
    <template v-if="token">
      <div class="header__menu">
        <template v-if="currentUser.is_admin">
          <router-link :to="{ name: 'client' }" class="header__menu-item"
            >Сотрудники</router-link
          >
        </template>
        <template v-else>
          <router-link :to="{ name: 'handler' }" class="header__menu-item"
            >Обработка очередей</router-link
          >
        </template>
        <router-link :to="{ name: 'client' }" class="header__menu-item"
          >Генератор очередей</router-link
        >
        <router-link :to="{ name: 'list' }" class="header__menu-item"
          >Список очередей</router-link
        >
        <a href="#" @click.prevent="logout" class="header__menu-item">Выйти</a>
      </div>
    </template>
    <template v-else>
      <router-link :to="{ name: 'login' }">Авторизация</router-link>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  computed: {
    // ...mapState("auth", ["token", "currentUser"]),
    ...mapState("auth", ["currentUser", "token"]),
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push({
        name: "login",
        query: {
          redirect: this.$route.path,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  background: white;
  padding: 20px 20px;

  &__title {
    font-weight: bold;

    span {
      color: #ff5722;
    }
  }

  &__menu-item {
    font-weight: bold;
    text-decoration: none;
    font-size: 15px;
    margin-left: 15px;
    color: #363131;

    &:hover {
      opacity: 0.9;
    }
  }
}
</style>
