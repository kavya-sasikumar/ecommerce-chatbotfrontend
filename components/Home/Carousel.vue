<template>
  <section class="carousel">
    <div id="heroControls" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#heroControls" data-bs-slide-to="0" class="active" aria-current="true"
          aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#heroControls" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#heroControls" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <!-- Welcome Text -->
        <div class="carousel-caption">
          <h1 class="welcome-text">
            <span class="welcome-to">Welcome to</span> <br>
            <span class="kavess">Kavess</span>
          </h1>
        </div>
        <div class="carousel-item active">
          <img class="d-block w-100" src="~/assets/dress.jpg" alt="First-slide" title="First-slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="~/assets/poshcloset.jpg" alt="Second-slide" title="Second-slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="~/assets/shopping.jpg" alt="Third-slide" title="Third-slide">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

.carousel-item img {
  width: 100%;
  height: 600px; /* Set a maximum height for the images */
  object-fit: cover; /* Ensures the image covers the specified area without distortion */
}

.carousel-caption {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  z-index: 10;
}

.welcome-text {
  /* font-family: 'Dancing Script', cursive; */
  color: white;
  font-size: 4rem;
  /* font-weight: bold; */
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  background-color: rgba(28, 1, 7, 0.5);
  padding: 20px;
  width: 100%;
  display: inline-block;
}

.welcome-to {
  font-family: 'Bebas Neue', cursive;
  font-size: 30px;
  font-weight: 100;
}

.kavess {
  font-family: 'Dancing Script', cursive;
  font-weight: 700;
  font-size: 120px;
}

.carousel-indicators button {
  background-color: white;
  height: 20px;
  width: 20px;
  border-radius: 30px;
  border: 0.6px solid rgb(129, 127, 127);
}

.carousel-indicators > .active {
  background: #e0f0f8;
}
</style>
