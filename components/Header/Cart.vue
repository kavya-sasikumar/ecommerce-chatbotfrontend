<template>
  <div>
    <div :class="['cart', cart.isOpen ? 'on' : '']" style="background-color: #7D2248;">
      <div class="cart-menu">
        <p class="text-center mt-4 pb-2 h3" style="font-family: avenir-medium;">Cart ({{ number }})</p>
        <hr>

        <Notification v-if="number == 0">
          Your cart is empty, try to add stuff.
        </Notification>

        <!-- Cart Items -->
        <div class="cart-item row" v-for="item in store.cartItems" :key="item.id">
          <div class="col-4">
            <!-- Product Image -->
            <img :src="item.image" alt="Product Image" class="product-image">
          </div>
          <div class="col-8">
            <!-- Product Info -->
            <p style="font-family: avenir-heavy; margin-bottom: 0.2rem !important">{{ item.title }}</p>
            <p style="font-family: avenir-medium; margin-bottom: 0.2rem !important">Price: ${{ item.price }}</p>

            <!-- Quantity Controls -->
            <div class="quantity-control">
              <button @click="decreaseQuantity(item)" class="quantity-btn">-</button>
              <span class="quantity-display">{{ item.qty }}</span>
              <button @click="increaseQuantity(item)" class="quantity-btn">+</button>
            </div>
          </div>
        </div>

        <!-- Cart Total and Checkout -->
        <div v-if="store.itemsNumber">
          <hr>
          <div class="cart-total">
            <p style="font-family: avenir-medium">Total: ${{ calculateTotal }}</p> 
          </div>
          <button class="checkout-button" @click="checkout">
            Checkout
          </button>
        </div>
      </div>
    </div>

    <div :class="['modal', cart.isOpen ? '' : 'off']" @click="$emit('closeCart')"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue';
const { $eventBus } = useNuxtApp()
const store = useMainStore();
let cartItems = [];  
let number = ref('0');

const cart = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

// Calculate total price based on item quantity and price
const calculateTotal = computed(() => {
  if(store.cartItems != null){
    return store.cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
  } 
  
});

// Increase and decrease item quantity
const increaseQuantity = (item) => {
  item.qty += 1;
  updateCart();
};

const decreaseQuantity = (item) => {
  if (item.qty > 1) {
    item.qty -= 1;
    updateCart();
  }
};

const updateCart = () => {
  localStorage.setItem('cart', JSON.stringify(store.cartItems));
  number.value = store.cartItems.length;
};

const updateCartCount = () => {
  let storedCart = localStorage.getItem('cart');
  store.cartItems = JSON.parse(storedCart);
  number.value = store.cartItems.length;
};

const checkout = async () => {
  try {
    //isLoading.value = true;
    const order = {
      "user": localStorage.getItem('user_id'), 
      "address": "1234", 
      "total_amount": calculateTotal,
      items: store.cartItems.map(item => ({
        product: item.id, 
        quantity: item.qty,
        price: item.price
      }))  
    }
    const { data, error } = await useFetch('http://localhost:8000/api/v1/create-order/', {
      method: 'POST',
      body: order,
      headers: { authorization: "Token " + localStorage.getItem("token") }
    })
    console.log(data.value)
    if (error.value) {
      throw new Error(error.value.message)
    }
    //isLoading.value = false;
    //console.log(isLoading.value)
    
  } catch (error) {
    //isLoading.value = false;
    console.error('Order Placement Failed:', error.response ? error.response.data : error.message)
    alert('Error Getting Products');
  }
}

onMounted(async () => {
  await nextTick();
  let storedCart = localStorage.getItem('cart');
  if (storedCart) {
    store.cartItems = JSON.parse(storedCart);
    console.log(storedCart)
    number.value = store.cartItems.length;
  }
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

</script>

<style scoped>
/* Modal Overlay */
.modal {
  display: block;
  z-index: 1050;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal.off {
  display: none;
}

/* Cart Body */
.cart {
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  height: 100%;
  background: #303e49;
  overflow-y: auto;
  z-index: 1051;
  transform: translateX(360px);
  transition: transform 0.4s;
}

.cart.on {
  transform: translateX(0);
}

.cart-menu {
  color: #eee;
  margin: 10px 15px;
}

hr {
  border-color: white;
}

.row {
  margin: 10px 0;
}

.product-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.quantity-control {
  display: flex;
  align-items: center;
}

quantity-control {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 0.5rem;
}

.quantity-btn {
  background-color: #ffffff;
  color: #7D2248;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  margin: 0 2px;
}

.quantity-display {
  margin: 0 8px;
  font-size: 1rem;
  color: #ffffff;
  min-width: 20px;
  text-align: center;
}

/* Cart Total */
.cart-total {
  text-align: right;
  font-size: 1.2rem;
  margin-right: 15px;
}

/* Checkout Button */
.checkout-button {
  background-color: #ffffff;
  color: #7D2248;
  width: 100%;
  padding: 10px;
  margin-right: 10rem;
  border: none;
  cursor: pointer;
  font-family: avenir-heavy;
}
</style>
