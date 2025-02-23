<script setup lang="ts">
import type  { TodoType } from '@/models/todo';
defineProps<{
  todo: TodoType;
}>();

defineEmits<{
  (e: 'delete', todo: TodoType): void;
}>();
</script>

<template>
  <div
    class="hover:shadow-md hover:bg-blue-100/50 flex justify-between w-full border border-gray-300 rounded-lg px-2 py-3 items-center gap-2"
  >
    <input
      type="checkbox"
    >
    <div class="flex-1 flex flex-col gap-1">
      <span class="font-bold text-sm">{{ todo.title }}</span>
      <span>{{ todo.description }}</span>
    </div>
    <button
      @click="$emit('delete', todo)"
      class="w-[1.45rem] h-[1.45rem] text-center rounded-full bg-red-500 text-white font-bold hover:text-red-500 hover:outline-2 hover:outline-red-500 hover:bg-white"
    >
      X
    </button>
  </div>
</template>