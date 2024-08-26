<template>
    <div class="user">
        <img @click="goToLogin" width="25" height="25"
            src="../../assets/user.png" alt="gender-neutral-user"
            title="gender-neutral-user" />
        <!-- <img data-bs-toggle="modal" data-bs-target="#userModal" width="25" height="25"
            src="../../assets/user.png" alt="gender-neutral-user"
            title="gender-neutral-user" /> -->
    </div>
</template>

<script setup>
    const goToLogin = async () => {
        const token = localStorage.getItem('token')
    
        if (token) {
            navigateTo('/profile')
        } else{
            navigateTo('/login')
        }
        
    }
</script>
