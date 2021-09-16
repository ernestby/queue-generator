<template>
  <div class="sidebar">
    <div class="sidebar__profile">
      <div class="sidebar__profile-avatar">
        <img :src="require(`@/assets/images/noimage.png`)" />
      </div>
      <div class="sidebar__profile-name">
        <div class="sidebar__profile-fullname">{{ currentUser.fullname }}</div>
        <div class="sidebar__profile-position">{{ currentUser.state }}</div>
      </div>
    </div>
    <ul class="sidebar__menu">
      <li>
        <router-link :to="{ name: 'QueueHandler' }"
          >Обработка очередей</router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'QueueGenerator' }"
          >Получить очередь</router-link
        >
      </li>
    </ul>
    <button class="sidebar__logout">Выйти</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Sidebar",
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  display: grid;
  background-color: #363636;
  grid-template-rows: min-content minmax(100px, 1fr) 40px;
  gap: 20px;
  padding: 20px;

  &__profile {
    width: 100%;
    display: grid;
    grid-template: 1fr / 50px 1fr;
    align-items: center;
    gap: 15px;
  }

  &__profile-avatar {
    border-radius: 50px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }

  &__profile-fullname {
    color: white;
    font-weight: bold;
  }

  &__profile-position {
    color: #e0e0e0;
    font-size: 13px;
  }

  &__menu {
    padding-left: 0px;
    list-style: none;

    li {
      margin-bottom: 10px;
    }

    a {
      color: white;
      font-weight: bold;
      text-decoration: none;
      border-bottom: 1px solid #454545;
      display: block;
      padding-bottom: 10px;
    }
  }
}
</style>
