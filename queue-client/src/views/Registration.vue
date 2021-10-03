<template>
  <AuthLayout>
    <div class="registration">
      <h1>Регистрация</h1>
      <div v-if="errorMessage" class="registration__alert alert alert-warning">
        {{ errorMessage }}
      </div>
      <div class="registration__input">
        <Input v-model.trim="fullname" id="fullname" label="Ваше имя" />
        <div
          v-if="!$v.fullname.required && $v.fullname.$dirty"
          class="form-error"
        >
          Поле обязательно к заполнению
        </div>
      </div>
      <div class="registration__input">
        <Input
          v-model.trim="$v.username.$model"
          id="username"
          label="Логин"
          placeholder="Придумайте логин"
        />
        <div
          v-if="!$v.username.required && $v.username.$dirty"
          class="form-error"
        >
          Поле обязательно к заполнению
        </div>
      </div>
      <div class="registration__input">
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
      <div class="registration__input">
        <Input
          v-model.trim="repeatPassword"
          id="repeat_password"
          label="Повторите пароль"
          type="password"
        />
        <div v-if="!$v.repeatPassword.sameAs" class="form-error">
          Пароли не совпадают
        </div>
      </div>
      <Button :callback="() => submitHandler()" text="Регистрация" />
    </div>
  </AuthLayout>
</template>

<script>
import Input from "@/components/form/Input";
import Button from "@/components/form/Button";
import { required, sameAs } from "vuelidate/lib/validators";
export default {
  name: "Registration",
  components: {
    Input,
    Button,
  },
  data() {
    return {
      fullname: "",
      username: "",
      password: "",
      repeatPassword: "",
      errorMessage: "",
    };
  },
  methods: {
    async submitHandler() {
      this.$v.$touch();
      if (this.$v.$invalid) return;

      try {
        await this.$store.dispatch("auth/register", {
          fullname: this.fullname,
          username: this.username,
          password: this.password,
        });

        this.fullname = "";
        this.username = "";
        this.password = "";
        this.repeatPassword = "";

        this.$router.push({
          name: "login",
        });
      } catch (e) {
        this.errorMessage = e.response.data.message;
      }
    },
  },
  validations() {
    return {
      fullname: { required },
      username: { required },
      password: { required },
      repeatPassword: { required, sameAs: sameAs("password") },
    };
  },
};
</script>

<style lang="scss" scoped>
.registration {
  width: 500px;
  &__input {
    margin-bottom: 15px;
  }
  &__alert {
    margin-bottom: 20px;
  }
}
</style>
