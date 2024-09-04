<template>
  <div class="loader" v-if="isLoading">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

//const isLoading = ref(false);

defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  }
});
</script>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full page height */
}

.spinner {
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7D2248;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
