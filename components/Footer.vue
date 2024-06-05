<template>
  <div
    class="fixed bottom-0 left-0 right-0 flex flex-col sm:flex-row justify-between items-center bg-footer w-full h-auto sm:h-20 p-4"
  >
    <div class="w-32 mb-4 sm:mb-0">
      <img src="/assets/images/logo-suthub-white.png" alt="Logo">
    </div>
    <p class="text-white text-xs mb-4 sm:mb-0 sm:text-lg">
      Copyright © 2024. Todos os direitos reservados.
    </p>
    <div class="flex gap-2">
      <img
        src="/assets/images/Instagram.png"
        alt="Logo Instagram"
        class="h-6 w-6 sm:h-full sm:w-auto object-contain"
      >
      <img
        src="/assets/images/Facebook.png"
        alt="Logo Facebook"
        class="h-6 w-6 sm:h-full sm:w-auto object-contain"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.bg-footer {
  background-color: #282727;
}
</style>
