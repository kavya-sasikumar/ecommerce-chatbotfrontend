<template>
    <div class="bag" @click="$emit('open')">
        <img class="" src="../../assets/grocery-store.png" alt="move-by-trolley"
            title="cart-trolley">
        <span class="mb-3" v-if="cartItems">{{ cartItems.length }}</span>
    </div>
</template>

<script setup>
const store = useMainStore()
let cartItems = [];  // No need for type annotations
const storedCart = localStorage.getItem('cart');

defineEmits(['open'])

onBeforeMount(async () => {
    await nextTick();
    if (storedCart) {
        cartItems = JSON.parse(storedCart);
    } else {
        cartItems = [];
    }
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
