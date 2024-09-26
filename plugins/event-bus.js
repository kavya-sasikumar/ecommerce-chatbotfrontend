// plugins/event-bus.js
import { reactive } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
  const eventBus = reactive({});

  // Provide the eventBus object
  nuxtApp.provide('eventBus', eventBus);
});
