<template>
    <div class="d-flex justify-content-center mx-5 mx-sm-0 pt-1">
        <button v-if="isVisible" type="button" @click="$emit('increment-cards')" class="flex-fill btn btn-outline-secondary">More
            +</button>
    </div>
</template>
<script setup>
let isVisible = ref(false);

const checkNextPage = async () => {
  if(localStorage.getItem('nextPage') == 'null'){
    isVisible.value = false;
  }else{
    isVisible.value = true;
  } 
}

defineExpose({
  checkNextPage,
});
</script>

<style scoped>
.btn-outline-secondary {
    border-radius: 0 !important;
    color: #7D2248 !important;
    border-color: #7D2248 !important;
}

.btn-outline-secondary:hover {
    background-color: #7D2248 !important;
    color: #ffffff !important;
}
</style>