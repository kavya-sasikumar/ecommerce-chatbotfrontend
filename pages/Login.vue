<template>
    <div class="login-container">
        <div class="login-box">
            <h1>Login</h1>
            <form @submit.prevent="login">
                <div class="input-group">
                    <input
                        type="email"
                        v-model="email"
                        placeholder="Email"
                        required
                    />
                </div>
                <div class="input-group">
                    <input
                        type="password"
                        v-model="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit" class="login-button">Submit</button>
                <p class="signup-text">
                    Don't have an account?
                    <router-link to="/register" class="signup-link">Sign up</router-link>
                </p>
            </form>
        </div>
    </div>
</template>

<script setup>

definePageMeta({
    title: 'Log-In'
})

const email = ref('')
const password = ref('')

const login = async () => {
  
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-box {
  width: 550px;
  padding: 40px;
  background: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
}

h1 {
  font-family: 'Bebas Neue', cursive;
  font-size: 36px;
  margin-bottom: 30px;
  color: #7D2248;
} 

.input-group {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  outline-color:#7D2248;
}

 /* .input:focus {
    outline: none !important;
    border:1px solid #7D2248;
  } */

.login-button {
  width: 100%;
  padding: 15px;
  background-color: #7D2248;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #5a1832;
}

.signup-text {
  margin-top: 20px;
  font-size: 14px;
  color: #7D2248;
}

.signup-link {
  color: #7D2248;
  text-decoration: underline;
  font-weight: bold;
  margin-left: 5px;
}

.signup-link:hover {
  color: #5a1832;
}

</style>