<template>
  <div class="relative p-0 min-h-screen w-full bg-secundary sm:h-full sm:p-6 sm:mb-28 md:mb-0 overflow-x-hidden">
    <div class="hidden sm:block absolute inset-y-0 right-0 w-1/2">
      <img src="@/assets/images/form-vetor.png" alt="Imagem de fundo" class="w-full h-full object-cover">
    </div>
    <slot />
    <Footer />
  </div>
</template>
