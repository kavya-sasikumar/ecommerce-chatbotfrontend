<template>
    <div class="bag" @click="$emit('open')">
        <img class="" src="../../assets/grocery-store.png" alt="move-by-trolley"
            title="cart-trolley">
        <span class="mb-3" v-if="cartItems">{{ number }}</span>
    </div>
</template>

<script setup>
const { $eventBus } = useNuxtApp()
const store = useMainStore()
let cartItems = [];  // No need for type annotations
let number = ref(0)

 
//defineEmits(['open'])

const updateCartCount = () => {
  let storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cartItems = JSON.parse(storedCart);
    number.value = cartItems.length;
  } else {
    number.value = 0;
  }
};

onMounted(async () => {
  await nextTick();
  updateCartCount();
  if (!$eventBus['update-cart-count']) {
    $eventBus['update-cart-count'] = [];
  }
  $eventBus['update-cart-count'].push(updateCartCount);
});

onBeforeUnmount(() => {
  const index = $eventBus['update-cart-count'].indexOf(updateCartCount);
  if (index > -1) {
    $eventBus['update-cart-count'].splice(index, 1);
  }
});

// Handle event from parent component to update cart count
defineEmits(['open', 'update-cart-count']);

// Listen for the update-cart-count event
const updateCartCountHandler = () => {
  updateCartCount();
};

defineExpose({ updateCartCountHandler });

</script>

<style scoped lang="scss">
.bag {
    span {
        background-color: #6394F8;
        border-radius: 10px;
        color: white;
        position: absolute;
        font-size: 15px;
        line-height: 1;
        padding: 2px 3px 3px 3px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        margin-left: -9px;
        bottom: 1rem;
    }

    img {
        cursor: pointer;
        width: 27px;
        height: auto;
    }
}
</style>
