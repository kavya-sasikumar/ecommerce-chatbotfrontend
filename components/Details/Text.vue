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
          <h5 style="font-family: avenir-heavy; border-bottom: 0.3px solid lightgrey; padding-bottom: 0.75rem;">{{ stored_product.total_reviews }} <span v-if="stored_product.total_reviews == 1">Rating</span><span v-else>Ratings</span></h5>
          <div class="rating-container d-flex">
            <div class="col-4 d-flex align-items-center justify-content-start">
              <div>
              <h1 style="font-family: avenir-heavy; font-size:80px;">{{ formatRating(stored_product.average_rating) }} <span style="font-size: 20px">out of 5 stars</span></h1>
              <span class="float-left pr-3" style="color:#7D2248 !important; font-size: 40px !important">{{ rendered_stars }}</span>
              </div>
            </div>
                        
            <!-- Second Partition: Text prompt and Get Started button -->
            <div class="col-4 d-flex align-items-center justify-content-right">
              <div>
                <p style="font-family: avenir-medium; font-size:24px;">
                  Write a review and share your experience!
                </p>
                <button class="btn-primary" @click="openReviewModal">Get Started</button>
              </div>
            </div>
          </div>
          <div class="rating-container d-flex">
            <div class="col-4 d-flex align-items-center justify-content-start">
              <div>
              <h1 style="font-family: avenir-heavy; font-size:80px;">{{ formatRating(stored_product.average_rating) }} <span style="font-size: 20px">out of 5 stars</span></h1>
              <span class="float-left pr-3" style="color:#7D2248 !important; font-size: 40px !important">{{ rendered_stars }}</span>
              </div>
            </div>
                        
            <!-- Second Partition: Text prompt and Get Started button -->
            <div class="col-4 d-flex align-items-center justify-content-right">
              <div>
                <p style="font-family: avenir-medium; font-size:24px;">
                  Write a review and share your experience!
                </p>
                <button class="btn-primary" @click="openReviewModal">Get Started</button>
              </div>
            </div>
          </div>

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
    <!-- Modal for writing a review -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h5 class="modal-title">Write a Review</h5>
          <button class="close-button" @click="closeReviewModal">&times;</button>
        </div>
        <div class="modal-body">
          <!-- Form for the review goes here -->
          <textarea class="form-control" rows="5" placeholder="Share your thoughts..."></textarea>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="closeReviewModal">Close</button>
          <button class="btn-primary">Submit Review</button>
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
let reviews = ref<any[]>([]);
let rendered_stars = ref('')
const showModal = ref(false);

onMounted(async() => {
  if (localStorage.getItem('product') !== null) {
    const storedProductString = localStorage.getItem('product') as string;
    stored_product.value = JSON.parse(storedProductString);
    description.value = stored_product.value.description; // default to description
    productRating.value = stored_product.value.rating || 0;
    //reviews.value = stored_product.value.reviews || [];
    rendered_stars.value = generateStars(stored_product.value.average_rating);    
    getProductReviews();
  }
  console.log(stored_product.value);
});

const getProductReviews= async () => {
  try {
    const { data, error } = await useFetch('http://localhost:8000/api/v1/product-reviews/'+ stored_product.value.id + "/")
    reviews.value = data.value as any[];
    console.log(reviews.value)    
  } catch (error) {
    console.error('Product Reviews Fetch Failed:')
    console.log(error)
  }
}


const formatRating = (rating: number): string => {
  if (rating !== undefined && rating !== null) {
    return rating.toFixed(1);
  }
  return '0.0'; // Default value if rating is not available
};

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

function generateStars(rating: any) {
  const totalStars=5
  const fullStars="★".repeat(rating)
  const emptyStars="☆".repeat(totalStars - rating)
  return fullStars + emptyStars;
};

const openReviewModal = () => {
  showModal.value = true;
};

const closeReviewModal = () => {
  showModal.value = false;
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

.rating-container {
  display: flex;
  width: 100%;
}

.col-4 {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.btn-primary {
  -webkit-transition-duration: 500ms;
  transition-duration: 500ms;
  width: 155px;
  height: 60px;
  background-color: #7D2248;
  color: #fff;
  font-size: 16px;
  padding: 0px 30px;
  cursor: pointer;
  position: relative;
  font-family: avenir-medium;
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
  max-width: 80%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  margin-top: 10px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.btn-secondary {
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

</style>
