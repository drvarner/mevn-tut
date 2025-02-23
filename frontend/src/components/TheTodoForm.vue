<script setup lang="ts">
import { ref } from 'vue';
import type { TodoType } from '@/models/todo';

const emit = defineEmits<{
  (e: 'addTodo', todo: TodoType): void;
}>();

const title = ref('');
const description = ref('');

function addTodo(e: Event): void {
  e.preventDefault();
  emit('addTodo', { title: title.value, description: description.value });
  title.value = '';
  description.value = '';
}
</script>

<template>
  <form class="flex flex-col gap-3 w-full mx-auto">
    <label for="title" class="font-bold text-sm flex flex-col">
      Title
      <input
        v-model="title"
        type="text"
        id="title"
        class="border-2 rounded-sm px-2 py-1 font-normal focus:outline-blue-500"
      />
    </label>
    <label for="desc" class="font-bold text-sm flex flex-col">
      Description
      <input
        v-model="description"
        type="text"
        id="desc"
        class="border-2 rounded-sm px-2 py-1 font-normal focus:outline-blue-500"
      />
    </label>
    <button
      @click="addTodo($event)"
      class="px-2 py-1 rounded-md bg-blue-500 text-white w-[fit-content] hover:bg-white hover:text-blue-500 hover:outline-2 hover:outline-blue-500"
    >
      Add
    </button>
    </form>
</template>