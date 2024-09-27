<template>
  <main>
    <HomeCarousel />
    <HomeAboutUs />
  <UNotifications />
   <FashionChat />
  </main>
</template>

<script setup>
import FashionChat from '~/components/FashionChat.vue'
definePageMeta({
  title: 'Home'
})
</script>