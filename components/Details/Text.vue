<template>
  <div>
    <div class="more info d-flex justify-content-between text-center">
      <div class="col4 flex-fill" 
           v-for="(info, index) in text.moreInfo"
           :class="[index === text.active ? 'col4 active' : '']" 
           @click="selectedInfo(index)" 
           :key="index">
        <h6>{{ info }}</h6>
      </div>
    </div>
    <div class="container pt-3">
      <div class="row">
        <!-- Conditionally render based on active tab -->
        <div v-if="text.active === 0">
          <p>{{ description }}</p>
        </div>
        <div v-else-if="text.active === 1">
          <p>{{ warrantyText }}</p>
        </div>
        <div v-else-if="text.active === 2">
          <h5 style="font-family: avenir-heavy; border-bottom: 0.3px solid #000000;">1 Rating(s)</h5>
          <h1 style="font-family: avenir-heavy; font-size:80px;">{{ productRating }}</h1>
          <div v-if="reviews.length > 0">
            <h6>Previous Reviews:</h6>
            <ul class="list-group">
              <li class="list-group-item" v-for="(review, index) in reviews" :key="index">
                <strong>{{ review.username }}:</strong> {{ review.content }}
                <span class="badge badge-primary float-right">{{ review.rating }} / 5</span>
              </li>
            </ul>
          </div>
          <div v-else>
            <p style="font-family: avenir-light;">No reviews yet. Be the first to review this product!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

let stored_product = ref<Record<string, any>>({});
let warrantyText = ref('No warranty information available.');
let description = ref('');
let productRating = ref<number>(0);
let reviews = ref<Array<{ username: string, content: string, rating: number }>>([]);

onMounted(async() => {
  if (localStorage.getItem('product') !== null) {
    const storedProductString = localStorage.getItem('product') as string;
    stored_product.value = JSON.parse(storedProductString);
    description.value = stored_product.value.description; // default to description
    productRating.value = stored_product.value.rating || 0;
    reviews.value = stored_product.value.reviews || [];
    console.log(description.value, productRating.value, reviews.value);
  }
  console.log(stored_product.value);
});

const text = reactive({
  moreInfo: ['DESCRIPTION', 'WARRANTY', 'REVIEWS'],
  active: 0,
});

// More Info area tab selector
const selectedInfo = (index: number): number => {
  text.active = index;
  switch(index) {
    case 0:
      description.value = stored_product.value.description;
      break;
    case 1:
      warrantyText.value = 'These tactical pants come with a 1-year limited warranty from the date of purchase. The warranty covers any defects in materials or workmanship under normal wear and tear conditions. If the product is found to be defective, we will repair or replace it at no additional cost to you. Please note that this warranty does not cover damages caused by improper care, accidents, unauthorized alterations, or general wear and tear over time. Proof of purchase is required to claim the warranty. For any warranty claims or assistance, please contact our customer support team with your purchase details, and we will be happy to assist you.';
      break;
    case 2:
      // Do nothing, reviews and rating will be handled directly in the template
      break;
  }
  return text.active;
};
</script>


<style scoped>
.col4 h6 {
  height: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid lightgrey;
  color: grey;
  cursor: pointer;
}

.col4.active h6 {
  font-weight: bold;
  border-bottom: 1px solid black !important;
  color: black;
}

/* Add some basic styling to match the Forever 21 review tab */
.more-info {
  border-bottom: 2px solid #eee;
}

.more-info .col4 {
  padding: 10px 0;
  cursor: pointer;
}

.more-info .col4.active {
  border-bottom: 2px solid #000;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
}

.badge-primary {
  background-color: #007bff;
}
</style>
