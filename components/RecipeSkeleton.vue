<template>
  <UCard class="mb-4 shadow-lg  bg-slate-200">
    <div class="items-center md:flex gap-4">
      <div class="w-full md:w-1/3">
        <USkeleton class="w-46 h-44 object-cover rounded-md bg-slate-300" />
      </div>
      <div class="w-full md:w-2/3">
        <USkeleton class="h-6 w-3/4 mb-2 bg-slate-300" />
        <div>
          <USkeleton  class="h-4 w-1/3 mb-1"/>
          <USkeleton class="h-4 w-2/3 mb-1 bg-slate-300"  />
          <USkeleton class="h-4 w-2/3 mb-1 bg-slate-300"  />
          <USkeleton class="h-4 w-2/4 mb-1  bg-slate-300" />
        </div>
        <div class="flex flex-wrap gap-2 mt-4">
          <USkeleton class="h-4 w-16 bg-slate-300" v-for="n in 3" :key="n" />
        </div>
      </div>
    </div>
  </UCard>
</template>