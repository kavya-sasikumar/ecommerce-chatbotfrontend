<template>
  <div class="row justify-content-center text-center">
    <div v-for="item in cards.value" class="col-10 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-4 pb-3" :key="item.id">
      <div class="card">
        <img class="card-img-top" :src="item.image" alt="Card-image-cap" title="Card-image-cap"
          loading="lazy">
        <div class="overlay">
          <button type="button" class="btn btn-light btn-lg" @click="store.inCart(item)">Add +</button>
          <NuxtLink :to="`/details/${item.id}`">
            <button type="button" @click="store.addtoInfo(item.id)" class="btn btn-light btn-lg">Info</button>
          </NuxtLink>
        </div> 
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">
            <span class="price-text">${{ item.price }}</span>
         </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { Product } from '../types';
import { defineEmits } from 'vue';

const emit = defineEmits(['check-more']);

const cards = reactive([]);
let nextPage = reactive('');

const store = useMainStore()

const getProducts = async () => {
  try {
    const { data, error } = await useFetch('http://localhost:8000/api/v1/products/')
    console.log(data.value)
    cards.value = data.value.results;
    //console.log(cards)
    if(data.value.links.next != null){
      nextPage = data.value.links.next;
      localStorage.setItem('nextPage', nextPage.toString());
    }else{
      nextPage = null;
      localStorage.setItem('nextPage', nextPage);
    }
    emit('check-more');
  } catch (error) {
    console.error('Product Fetch Failed:', error.response ? error.response.data : error.message)
    alert('Error Getting Products');
  }
}

const getMoreProducts = async () => {
  console.log('Gotten');
  if(nextPage != null){
      //this.isLoadingCards = true;
      try{
        const { data, error } = await useFetch(nextPage)
        cards.value.push(...data.value.results);
        if(data.value.links.next != null){
          nextPage = data.value.links.next;
          localStorage.setItem('nextPage', nextPage.toString());
        }else{
          nextPage = null;
          localStorage.setItem('nextPage', nextPage);
        }
        emit('check-more');
      }catch (error){
        console.error('Product Fetch Failed:', error.response ? error.response.data : error.message)
        alert('Error Getting More Products');
      }
  }
  
}

onBeforeMount(async () => {
  await nextTick();
  getProducts();
});


//defineProps<{
  //cards: Product[]
//}>()

defineExpose({
  getMoreProducts,
});

</script>


<style lang="scss">
/* Card Style */
.card {
  transition: 300ms;
  position: relative;
  overflow: hidden;
  font-family: avenir-heavy;
  color: #7D2248;

.price-text {
  color:#232b34
}

  img {
    z-index: 1;
  }

  button {
    width: 140px;
    margin-bottom: 10px;
  }

  &:hover img {
    filter: blur(4px);
  }

  &:hover .overlay {
    opacity: 0.4;
  }

  .overlay {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70%;
    background-color: #7D2248;
    opacity: 0;
    z-index: 100;
    transition: all 0.3s ease-in;
  }

  &:hover,
  &:active {
    transform: scaleY(1.02) scaleX(1.02);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25), 0 0px 40px rgba(0, 0, 0, 0.22);
  }
}
</style>
