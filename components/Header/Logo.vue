<template>
  <div class="navbar-brand-container">
    <span class="navbar-brand py-0 pl-5">
      <img src="~/assets/kavesslogo.png" width="100" height="100" alt="site-logo" title="site-logo">
    </span>
  </div>
</template>

<style scoped>
.navbar-brand-container {
  text-align: center; /* Centers the content */
}

.brand-text {
  display: block;
  font-family: avenir-heavy;
  color: #7D2248;
  font-size: 24px; 
  margin-top: 5px; 
}

@media only screen and (max-width: 768px) {
  .navbar-brand {
    margin-left: 50px;
  }
}
</style>

