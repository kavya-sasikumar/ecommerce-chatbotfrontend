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
            <div class="col-4 d-flex align-items-start justify-content-start">
              <div>
                <p style="font-family: avenir-medium; font-size:24px;">
                  Write a review and share your experience!
                </p>
                <button class="btn-primary" @click="openReviewModal">Get Started</button>
              </div>
            </div>
          </div>
          <h5 style="margin-top:20px; font-family: avenir-heavy; border-bottom: 0.3px solid lightgrey; padding-bottom: 0.75rem;">Reviews</h5>
          <div class="rating-container d-flex" v-for="review in reviews" :key="review.id">
            <div class="col-4 d-flex align-items-center justify-content-start">
              
              <div>
              <span class="float-left pr-3" style="color:#7D2248 !important; font-size: 20px !important">{{ generateStars(review.rating) }}</span>
              <p style= "font-size:15px">{{ formatDate(review.date_updated) }}</p>
              <p>@{{ review.username }}</p>
              </div>
            </div>
                        
            <!-- Second Partition: Text prompt and Get Started button -->
            <div class="col-4 d-flex align-items-start justify-content-start">
              <div>
                <p style="font-family: avenir-light; font-size:20px;">
                  {{ review.comment }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Triggered by 'Get Started' Button -->
          <div
            v-if="showReviewModal"
            class="tt-o-modal__container"
            tabindex="-1"
          >
            <div class="tt-o-modal__close">
              <button
                class="tt-o-button tt-o-button--icon tt-o-modal__close-btn tt-o-modal__close-btn"
                aria-label="Close Submission Modal"
                title="Close Submission Modal"
                type="button"
                @click="closeReviewModal"
              >
                <svg
                  class="tt-o-icon tt-o-icon--close tt-o-icon--xs"
                  aria-hidden="true"
                  focusable="false"
                >
                  <use xlink:href="#tt-icon-close"></use>
                </svg>
              </button>
            </div>
            <div class="tt-o-modal__body">
              <div class="tt-submission-mediator">
                <div class="tt-c-review-form">
                  <form class="tt-c-review-form__form tt-u-spacing--xl">
                    <div class="tt-c-review-form-header-container">
                      <div
                        class="tt-c-review-form-header tt-c-review-form-header--with-image"
                      >
                        <div class="tt-c-review-form-header__content--left">
                          <div
                            class="tt-c-review-form-header__heading"
                            role="heading"
                            aria-level="2"
                            style="font-family: avenir-heavy; font-size: 1.5rem"
                          >
                            Please share your experience
                          </div>
                          <div class="tt-c-review-form-header__product-title" style="font-family: avenir-heavy">
                            {{ stored_product.title }}
                          </div>
                          <p class="tt-c-review-form-header__text" style="">
                            Your feedback will help other shoppers make good
                            choices, and we'll use it to improve our products.
                          </p>
                        </div>
                        <div class="tt-c-review-form-header__content--right">
                          <img
                            :src="stored_product.image_url"
                            alt=""
                            class="tt-o-product__image tt-c-review-form-header__product-image"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>

                    <fieldset class="tt-u-spacing--lg">
                      <!-- Overall Rating -->
                      <fieldset
                        class="tt-o-field-group tt-u-spacing--xs tt-c-review-form__overall-rating"
                        aria-required="true"
                        aria-labelledby="tt-review-form-rating"
                        role="radiogroup"
                      >
                        <legend class="tt-o-field-group__label">
                          <span class="tt-o-field-group__label-text" style="font-family:avenir-heavy">
                            Overall Rating
                          </span>
                          <span class="tt-o-field-group__required" style="color: #7D2248"> *</span>
                        </legend>
                        <div class="stars">
                          <span
                            v-for="(star, index) in 5"
                            :key="index"
                            @mouseover="hoverStars(index + 1)"
                            @mouseleave="hoverStars(0)"
                            @click="selectRating(index + 1)"
                            class="star"
                          >
                            {{ index + 1 <= currentRating || index + 1 <= hoverRating ? '★' : '☆' }}
                          </span>
                        </div>
                      </fieldset>

                      <!-- Review Text -->
                      <div class="tt-o-field-group tt-u-spacing--xs tt-c-review-form__body-text">
                        <label class="tt-o-field-group__label" for="reviewText">
                          <span class="tt-o-field-group__label-text">Review</span>
                        </label>
                        <textarea
                          v-model="reviewForm.text"
                          class="tt-o-textarea"
                          id="reviewText"
                          name="reviewText"
                          rows="5"
                          aria-invalid="false"
                        ></textarea>
                        <div
                          class="tt-o-hint tt-o-hint--info tt-u-spacing--left--xs"
                        >
                          <svg
                            class="tt-o-icon tt-o-icon--info tt-o-icon--xs tt-o-hint__icon tt-o-hint__icon"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <use xlink:href="#tt-icon-info"></use>
                          </svg>
                          <span class="tt-o-hint__text">
                            Make your review great: Describe what you liked,
                            what you didn’t like, and other key things shoppers
                            should know (minimum 10 characters)
                          </span>
                        </div>
                      </div>

                      <!-- Review Title -->
                      <div class="tt-o-field-group tt-u-spacing--xs tt-c-review-form__title">
                        <label
                          class="tt-o-field-group__label"
                          for="reviewTitle"
                        >
                          <span class="tt-o-field-group__label-text">
                            Review title
                          </span>
                        </label>
                        <input
                          v-model="reviewForm.title"
                          class="tt-o-text-field"
                          type="text"
                          id="reviewTitle"
                          name="reviewTitle"
                          aria-invalid="false"
                        />
                        <div
                          class="tt-o-hint tt-o-hint--info tt-u-spacing--left--xs"
                        >
                          <svg
                            class="tt-o-icon tt-o-icon--info tt-o-icon--xs tt-o-hint__icon tt-o-hint__icon"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <use xlink:href="#tt-icon-info"></use>
                          </svg>
                          <span class="tt-o-hint__text">
                            Your overall impression (150 characters or less)
                          </span>
                        </div>
                      </div>

                      <!-- Fit Radio Buttons -->
                      <fieldset
                        class="tt-o-field-group tt-u-spacing--xs tt-c-range-field"
                        aria-required="true"
                        aria-labelledby="fitLabel"
                        role="radiogroup"
                      >
                        <legend class="tt-o-field-group__label">
                          <span
                            class="tt-o-field-group__label-text"
                            id="fitLabel"
                          >
                            Fit
                          </span>
                          <span class="tt-o-field-group__required"> *</span>
                        </legend>
                        <div class="tt-c-range-field__group tt-u-spacing">
                          <div
                            v-for="(fit, index) in fitOptions"
                            :key="index"
                            class="tt-c-range-field__item tt-u-spacing--xs tt-c-range-field__item"
                          >
                            <input
                              type="radio"
                              :id="'fit-' + fit.value"
                              class="tt-c-range-field__input"
                              :name="'fit-' + fit.value"
                              v-model="reviewForm.fit"
                              :value="fit.value"
                            />
                            <label
                              :for="'fit-' + fit.value"
                              class="tt-c-range-field__label"
                            >
                              {{ fit.label }}
                            </label>
                          </div>
                        </div>
                      </fieldset>

                      <!-- Would Recommend Toggle -->
                      <div
                        class="tt-o-field-group tt-u-spacing--xs tt-c-toggle"
                      >
                        <label
                          class="tt-o-field-group__label"
                          for="wouldRecommend"
                        >
                          <span class="tt-o-field-group__label-text">
                            Would you recommend this product?
                          </span>
                        </label>
                        <label class="tt-o-toggle">
                          <input
                            v-model="reviewForm.wouldRecommend"
                            class="tt-o-toggle__input"
                            type="checkbox"
                            id="wouldRecommend"
                          />
                          <span class="tt-o-toggle__slider"></span>
                        </label>
                      </div>

                      <!-- Nickname -->
                      <div class="tt-o-field-group tt-u-spacing--xs">
                        <label class="tt-o-field-group__label" for="nickname">
                          <span class="tt-o-field-group__label-text">
                            Nickname
                          </span>
                          <span class="tt-o-field-group__required"> *</span>
                        </label>
                        <input
                          v-model="reviewForm.nickname"
                          class="tt-o-text-field"
                          type="text"
                          id="nickname"
                          name="nickname"
                          aria-invalid="false"
                        />
                      </div>

                      <!-- Email -->
                      <div class="tt-o-field-group tt-u-spacing--xs">
                        <label class="tt-o-field-group__label" for="email">
                          <span class="tt-o-field-group__label-text">Email</span>
                          <span class="tt-o-field-group__required"> *</span>
                        </label>
                        <input
                          v-model="reviewForm.email"
                          class="tt-o-text-field"
                          type="email"
                          id="email"
                          name="email"
                          aria-invalid="false"
                        />
                        <div
                          class="tt-o-hint tt-o-hint--info tt-u-spacing--left--xs"
                        >
                          <svg
                            class="tt-o-icon tt-o-icon--info tt-o-icon--xs tt-o-hint__icon tt-o-hint__icon"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <use xlink:href="#tt-icon-info"></use>
                          </svg>
                          <span class="tt-o-hint__text">
                            We’ll only use this to contact you about your review
                          </span>
                        </div>
                      </div>

                      <!-- Terms and Conditions Checkbox -->
                      <div class="tt-o-field-group tt-u-spacing--xs">
                        <label class="tt-c-check-box__label">
                          <input
                            v-model="reviewForm.termsAccepted"
                            class="tt-c-check-box__input"
                            type="checkbox"
                            id="termsAccepted"
                            name="termsAccepted"
                            aria-invalid="false"
                          />
                          <span class="tt-c-check-box__input__check"></span>
                          I accept the
                          <a href="#" class="tt-o-link">terms and conditions</a>
                          <span class="tt-o-field-group__required"> *</span>
                        </label>
                      </div>

                      <!-- Submit Button -->
                      <div class="tt-o-field-group tt-u-spacing--xs">
                        <button
                          @click="submitReview"
                          class="tt-o-button tt-o-button--primary"
                          type="button"
                        >
                          Submit Review
                        </button>
                      </div>
                    </fieldset>
                  </form>
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
let reviews = ref<any[]>([]);
let rendered_stars = ref('')
const showModal = ref(false);

// Modal control
const showReviewModal = ref(false)

// Review form data
const reviewForm = ref({
  rating: 0,
  text: '',
  title: '',
  fit: null,
  wouldRecommend: false,
  nickname: '',
  email: '',
  termsAccepted: false
})
 
onBeforeMount(async() => {
  await nextTick()
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Fit options
const fitOptions = ref([
  { label: 'Too small', value: 'too-small' },
  { label: 'True to size', value: 'true-to-size' },
  { label: 'Too large', value: 'too-large' }
])

// Event handlers
const openReviewModal = () => {
  showReviewModal.value = true
}

const closeReviewModal = () => {
  showReviewModal.value = false
}

const submitReview = () => {
  if (reviewForm.value.rating && reviewForm.value.text.length >= 10 && reviewForm.value.nickname && reviewForm.value.email && reviewForm.value.termsAccepted) {
    console.log('Review submitted:', reviewForm.value)
    closeReviewModal()
  } else {
    alert('Please fill out all required fields.')
  }
}

const currentRating = ref(0)   // Holds the selected rating
const hoverRating = ref(0)     // Holds the hover state

// Function to handle hover effect
const hoverStars = (rating) => {
  hoverRating.value = rating
}

// Function to handle star click (rating selection)
const selectRating = (rating) => {
  currentRating.value = rating
}
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

/* Modal Overlay */
.tt-o-modal__container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.tt-o-modal__body {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 95%; /* Limit height */
  overflow-y: auto; /* Enable vertical scroll */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-in-out;
}

.tt-o-modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
}

.tt-o-modal__close-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.tt-c-review-form__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.tt-c-review-form__heading {
  font-family: 'avenir-heavy', sans-serif;
  font-size: 24px;
}

.tt-c-review-form__product-title {
  font-family: 'avenir-medium', sans-serif;
  font-size: 18px;
  color: #333;
}

.tt-o-textarea,
.tt-o-text-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 5px;
}

.tt-o-button--primary {
  background-color: #7D2248;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.tt-o-button--primary:hover {
  background-color: #5c1836;
}

.tt-o-field-group__label {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
}

.tt-c-rating__star {
  cursor: pointer;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.stars {
  font-size: 2rem;  /* Size of the stars */
  cursor: pointer;
  display: flex;
  gap: 0.5rem;  /* Spacing between stars */
}

.star {
  transition: color 0.3s ease;
  color: #ccc; /* Default color for empty stars */
}

.star:hover,
.star.filled {
  color: #7D2248; /* Gold color for filled stars */
}

</style>
