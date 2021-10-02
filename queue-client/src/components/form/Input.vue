<template>
  <div class="input">
    <label v-if="label" :for="id" class="input__label">{{ label }}</label>
    <div class="input__item">
      <input
        :id="id"
        class="input__field"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        @input="(e) => $emit('input', e.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    id: String,
    value: null,
    placeholder: null,
    label: null,
    color: {
      default: "white",
      type: String,
    },
    type: {
      default: "text",
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  &__label {
    display: block;
    margin-bottom: 6px;
    font-size: 13px;
    color: #737373;
  }
  &__item {
    color: #737373;
    background: #ececec;

    border-radius: 3px;
    padding: 10px 15px;
    color: #000;
    font-size: 14px;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  &__field {
    box-shadow: none;
    outline: none;
    border: none;
    background: none;
    width: 100%;
    font-size: 16px;
  }
}
</style>
