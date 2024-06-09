<template>
  <UCard class="mb-4 shadow-lg hover:bg-green-100">
    <div class="items-center md:flex gap-4 cursor-pointer">
      <div class="w-full md:w-1/3">
        <USkeleton class="w-56 h-56 object-cover rounded-md" />
      </div>
      <div class="w-full md:w-2/3">
        <USkeleton class="h-6 w-3/4 mb-2" />
        <div>
          <USkeleton />
          <USkeleton class="h-4 w-1/3 mb-1" />
          <USkeleton class="h-4 w-1/4 mb-1" />
        </div>
        <div class="flex flex-wrap gap-2 mt-2">
          <USkeleton class="h-4 w-16" v-for="n in 3" :key="n" />
        </div>
      </div>
    </div>
  </UCard>
</template>