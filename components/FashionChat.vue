<template>
  <div>
    <div v-for="(message, index) in messages" :key="index" class="message">
      <p :class="{'user-message': message.isUser, 'bot-message': !message.isUser}">
        {{ message.text }}
      </p>
    </div>
    <input
      v-model="userInput"
      @keyup.enter="sendMessage"
      placeholder="Ask for fashion advice..."
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const userInput = ref('');
const messages = ref([]);

const sendMessage = async () => {
  if (userInput.value.trim() === '') return;

  // Add user message to the chat
  messages.value.push({ text: userInput.value, isUser: true });

  try {
    const { data, error } = await useFetch('http://localhost:8000/api/v1/chat/', {
      method: 'POST',
      body: {
        user_id: 1, // assuming you are using user ID 1 for now
        message: userInput.value,
      },
      headers: {
        'Content-Type': 'application/json', // Set the content type
      },
    });

    // Check for any errors
    if (error.value) {
      console.error('Error:', error.value);
      return;
    }

    // Add bot response to the chat
    messages.value.push({ text: data.value.response, isUser: false });
  } catch (error) {
    console.error('Error:', error);
  }

  // Clear the input field
  userInput.value = '';
};
</script>

<style scoped>
.message {
  margin: 10px 0;
}
.user-message {
  text-align: right;
  background-color: #d3d3d3;
}
.bot-message {
  text-align: left;
  background-color: #f0f0f0;
}
</style>
