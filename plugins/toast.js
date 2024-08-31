// plugins/toast.js
export default defineNuxtPlugin((nuxtApp) => {
    // Create a toast function
    const toast = (message, options = {}) => {
      // Create a toast element
      const toastElement = document.createElement('div');
      toastElement.className = 'toast';
      toastElement.innerText = message;
  
      // Apply optional styles
      if (options.type) {
        toastElement.classList.add(options.type); // e.g., 'success', 'error'
      }
      if (options.duration) {
        setTimeout(() => {
          toastElement.remove();
        }, options.duration);
      } else {
        // Default duration
        setTimeout(() => {
          toastElement.remove();
        }, 3000);
      }
  
      // Append toast to the body
      document.body.appendChild(toastElement);
  
      // Add CSS for the toast
      const style = document.createElement('style');
      style.innerHTML = `
        .toast {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: #333;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          margin: 10px;
          z-index: 9999;
          transition: opacity 0.5s ease;
        }
        .toast.success {
          background-color: green;
        }
        .toast.error {
          background-color: red;
        }
      `;
      document.head.appendChild(style);
    };
  
    // Provide the toast function to the Nuxt app
    nuxtApp.provide('toast', toast);
  });