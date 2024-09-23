<template>
    <div class="bag" @click="$emit('open')">
        <img class="" src="../../assets/grocery-store.png" alt="move-by-trolley"
            title="cart-trolley">
        <span class="mb-3" v-if="cartItems">{{ number }}</span>
    </div>
</template>

<script setup>
const store = useMainStore()
let cartItems = [];  // No need for type annotations
let number = ref('0')


//defineEmits(['open'])

const updateCartCount = async () => {
await nextTick();
  let storedCart = localStorage.getItem('cart');
  if (storedCart) {
    let cartItems = JSON.parse(storedCart);
    number.value = cartItems.length;
  }
};

onMounted(async () => {
  await nextTick();
  updateCartCount();
});

// Handle event from parent component to update cart count
defineEmits(['open', 'update-cart-count']);
watch(async () => {
    await nextTick();
    updateCartCount();
});

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
