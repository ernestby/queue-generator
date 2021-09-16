<template>
  <div>
    <div class="queue-handler__block-title">Обслуживание номера</div>
    <div
      class="queue-handler__number queue-handler__number--blue"
      v-if="assignedQueue"
    >
      {{ assignedQueue.prefix }}-{{ assignedQueue.number }}
    </div>
    <div class="queue-handler__bottom-info">
      <div class="service-timer">
        <div class="service-timer__title">Время обслуживания</div>
        <div class="service-timer__timers">
          <div class="service-timer__timer">
            <span>текущее время</span> 00:33
          </div>
          <div class="service-timer__timer">
            <span>среднее время</span> 00:35
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BusyState",
  props: {
    assignedQueue: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.service-timer {
  &__title {
    margin-bottom: 15px;
  }
  &__timers {
    display: grid;
    grid-template-columns: auto auto;
    /* align-items: baseline; */
    justify-content: center;
    gap: 50px;
  }

  &__timer {
    display: grid;
    font-size: 19px;

    span {
      font-size: 14px;
    }
  }
}
</style>
