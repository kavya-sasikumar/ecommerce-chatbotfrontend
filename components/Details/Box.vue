<template>
  <div>
    <div class="row mb-5">
      <div class="col6 col-xl-6 col-lg-6 col-md-12 col-sm-12">
        <img class="img-fluid" :src="image">
      </div>

      <div class="col6 col-xl-6 col-lg-6 col-md-12 col-sm-12 d-flex align-items-center justify-content-start">
        <div class="info pt-xl-0 pt-lg-0 pt-5">
          <!-- <span class="float-left pr-3">★★★★★</span> -->
          <span class="float-left pr-3" style="color:#7D2248 !important; font-size: 40px !important">{{ rendered_stars }}</span>
          <h6 style="width:190px; font-size: 20px !important; font-family: avenir-light !important">{{ stored_product.total_reviews }} reviews</h6>
          <h1 class="font-weight-bold text-uppercase pt-3" style="font-family: avenir-medium !important">{{ stored_product.title }}</h1>
          <h4 style= "font-size: 22px !important;  font-family: avenir-light !important">${{ stored_product.price }}</h4>
          <br><br><br>
          <div class="control number text-center">
            <button class="decrement-button" @click="decrememnt"
              style="border-right: 0.2px solid #7D2248;float:left;margin-right: 11px; color:#7D2248 !important;" >−</button>
            <span>{{ quantity }}</span>
            <button class="increment-button" @click="incrememnt"
              style="border-left: 0.2px solid #7D2248;margin-left: 16px; color:#7D2248 !important;">+</button>
            <br><br>
          </div>
          <button class="add-to-cart-button" :disabled="in_stock" @click="addtoCart(item)"><span v-if="in_stock">ADD TO CART</span> <span v-if="!in_stock">OUT OF STOCK</span></button>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script setup lang="ts">
import { Product } from '@/components/types'

const store = useMainStore()

defineProps<{
  item: {image?: string, title?: string, price?: string}
}>()

//console.log(item)

let stored_product = ref<Record<string, any>>({})
let image = ref('')
let rendered_stars = ref('')
let in_stock = ref(true)

const quantity = ref(1)

const incrememnt = () => quantity.value++
const decrememnt = () => quantity.value > 1 ? quantity.value-- : 0

function addtoCart(item: object) {
  for (var i = 0; i < quantity.value; i++) {
    store.inCart(item)
  }
}
onMounted(async() => {
  // await nextTick();
  if (localStorage.getItem('product') !== null) {
    const storedProductString = localStorage.getItem('product') as string;
    stored_product.value = JSON.parse(storedProductString);
    image.value = stored_product.value.image || ''
    rendered_stars.value = generateStars(stored_product.value.average_rating)
    if (stored_product.value.stock <= 0){
      in_stock.value=false
    }
  }
  
})
function generateStars(rating: any) {
  const totalStars=5
  const fullStars="★".repeat(rating)
  const calcss = totalStars - Math.floor(rating)
  const emptyStars="☆".repeat(calcss)
  return fullStars + emptyStars;
};
</script>

<style scoped lang="scss">
.img-fluid {
  min-width: 90% !important;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

@font-face {
  font-family: avenir-medium;
  src: url(/assets/avenir/AvenirLTProMedium.otf);
}

.control {
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 30px;
  
  .number {
    border: 0.2px solid lightgrey;
    font-size: 19px;
    font-weight: bold;
    height: 35px;
    width: 155px;
    margin-bottom: 30px;

    button {
      border: none;
      background: inherit;
      width: 56px;
      height: 35px;
      outline-style: none;
      color:#7D2248 !important;

      &:active {
        background-color: lightgrey;
      }

      h5 {
        margin-left: 13px;
        margin-right: 13px;
      }
    }
  }
}

.add-to-cart-button {
  -webkit-transition-duration: 500ms;
  transition-duration: 500ms;
  width: 155px;
  height: 70px;
  background-color: #7D2248;
  color: #fff;
  font-size: 15px;
  padding: 0px 30px;
  cursor: pointer;
  position: relative;
  top: 0;
  z-index: 10;
  border: none;
  box-shadow: 0 26px 38px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  &:hover,
  &:focus {
    background-color: inherit;
    color: black;
  }
}
</style>
