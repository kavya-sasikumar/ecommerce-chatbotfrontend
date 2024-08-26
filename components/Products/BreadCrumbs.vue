<template>
  <div>
    <h1 class="pt-3 text-center" style="color: #7D2248 !important; font-family: avenir-heavy;">Trending</h1>
    <nav class="d-flex justify-content-center" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <NuxtLink style="font-family: avenir-light;" to="/">Home</NuxtLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page" style="font-family: avenir-light;">Products</li>
      </ol>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb {
  background: inherit !important;
  color: #2c3539 !important;
  font-size: 20px;

  li {
    text-decoration: none !important;
    color: #7D2248 !important;
  }

  a {
    text-decoration: none !important;
    color: #2c3539 !important;
  }
}

@font-face {
  font-family: avenir-light;
  src: url(/assets/avenir/AvenirLTProLight.otf);
}
</style>
