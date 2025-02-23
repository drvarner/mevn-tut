<script setup lang="ts">
import { ref } from 'vue';
import type  { TodoType } from '@/models/todo';

const props = defineProps<{
  todo: TodoType;
}>();

const emit = defineEmits<{
  (e: 'delete', todo: TodoType): void;
  (e: 'complete', todo: TodoType, checked: boolean): void;
}>();

let completed = ref(props.todo.completed);

function handleCheckClick(): void {
  completed.value = !completed.value;
  emit('complete', props.todo, completed.value);
}
</script>

<template>
  <div
    class="hover:shadow-md hover:bg-blue-100/50 flex justify-between w-full border border-gray-300 rounded-lg px-2 py-3 items-center gap-2"
  >
    <input
      type="checkbox"
      :checked="completed"
      @click="handleCheckClick"
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