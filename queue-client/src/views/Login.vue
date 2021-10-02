<template>
  <EmptyLayout>
    <div class="login">
      <h1>Авторизация</h1>
      <div v-if="errorMessage" class="login__alert alert alert-warning">
        {{ errorMessage }}
      </div>
      <div class="login__input">
        <Input v-model.trim="$v.username.$model" id="username" label="Логин" />
        <div
          v-if="!$v.username.required && $v.username.$dirty"
          class="form-error"
        >
          Поле обязательно к заполнению
        </div>
      </div>
      <div class="login__input">
        <Input
          v-model.trim="password"
          id="password"
          label="Пароль"
          type="password"
        />
        <div
          v-if="!$v.password.required && $v.password.$dirty"
          class="form-error"
        >
          Поле обязательно к заполнению
        </div>
      </div>
      <Button :callback="() => submitHandler()" text="Войти" />
    </div>
  </EmptyLayout>
</template>

<script>
import Input from "@/components/form/Input";
import Button from "@/components/form/Button";
import { required, sameAs } from "vuelidate/lib/validators";
export default {
  name: "Login",
  components: {
    Input,
    Button,
  },
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async submitHandler() {
      this.errorMessage = "";
      this.$v.$touch();
      if (this.$v.$invalid) return;

      try {
        await this.$store.dispatch("auth/login", {
          username: this.username,
          password: this.password,
        });
        this.$router.push({
          name: "list",
        });
      } catch (e) {
        this.errorMessage = e.response.data.message;
      }
    },
  },
  validations() {
    return {
      username: { required },
      password: { required },
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 500px;
  &__input {
    margin-bottom: 15px;
  }
  &__alert {
    margin-bottom: 20px;
  }
}
</style>
