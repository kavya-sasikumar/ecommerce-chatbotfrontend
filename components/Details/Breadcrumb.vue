<template>
  <div>
    <nav class="row justify-content-start" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li class="breadcrumb-item">
          <NuxtLink to="/products">Products</NuxtLink>
        </li>
        <!-- <li class="breadcrumb-item">
          <NuxtLink to="/products">{{ details.type }}</NuxtLink>
        </li> -->
        <li class="breadcrumb-item active">{{ title }}</li>
      </ol>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { Product } from '../types'

let stored_product = ref<Record<string, any>>({})
let title = ref('')

onMounted(async() => {
  // await nextTick();
  if (localStorage.getItem('product') !== null) {
    const storedProductString = localStorage.getItem('product') as string;
    stored_product.value = JSON.parse(storedProductString);
    title.value = stored_product.value.title || ''
  }
  console.log(stored_product.value)
  
})

defineProps<{
  details: Product
}>()

</script>

<style scoped lang="scss">
.breadcrumb {
  background: inherit;

  li {
    a {
      text-decoration: none;
      color: #2c3539 !important;
      font-size: 18px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .active {
    text-decoration: none !important;
    color: #7D2248 !important;
  }
}
</style>
