<script setup lang="ts">
const props = defineProps({
  title: String,
});
</script>

<template>
  <div class="w-full bg-blue-500 text-white py-3">
    <h1 class="text-4xl font-bold text-center">{{ props.title }}</h1>
  </div>
</template>