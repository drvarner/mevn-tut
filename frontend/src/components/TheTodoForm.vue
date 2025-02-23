<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { TodoType } from '@/models/todo';

interface TodoForm {
  title: string;
  description: string;
  category: string | null;
}

const emit = defineEmits<{
  (e: 'addTodo', todo: TodoType): void;
}>();

const todoForm: Ref<TodoForm> = ref({
  title: '',
  description: '',
  category: null,
});

function addTodo(e: Event): void {
  e.preventDefault();
  emit('addTodo', todoForm.value);
  todoForm.value = {
    title: '',
    description: '',
    category: null,
  };
}
</script>

<template>
  <form class="flex flex-col gap-3 w-full mx-auto">
    <label for="title" class="flex flex-col">
      <span class="text-xs uppercase text-gray-500">Title</span>
      <input
        v-model="todoForm.title"
        type="text"
        id="title"
        class="border-2 rounded-sm px-2 py-1 focus:outline-blue-500"
        required
      />
    </label>
    <label for="desc" class="flex flex-col">
      <span class="text-xs uppercase text-gray-500">Description</span>
      <input
        v-model="todoForm.description"
        type="text"
        id="desc"
        class="border-2 rounded-sm px-2 py-1 focus:outline-blue-500"
        required
      />
    </label>
    <label class="flex flex-col">
      <span class="text-xs uppercase text-gray-500">Category</span>
      <select
        v-model="todoForm.category"
        class="border-2 rounded-sm px-2 py-1 focus:outline-blue-500">
        <option :value="null">Select a category</option>
        <option value="any">Any</option>
      </select>
    </label>
    <button
      :disabled="!todoForm.title || !todoForm.description"
      @click="addTodo($event)"
      class="px-2 py-1 rounded-md bg-blue-500 text-white w-[fit-content] hover:bg-white hover:text-blue-500 hover:outline-2 hover:outline-blue-500 disabled:bg-gray-500/50 disabled:outline-none disabled:text-gray-800"
    >
      Add
    </button>
  </form>
  <div class="w-full">
    <h3 class="font-bold">DEBUG</h3>
    <p>Title: {{ todoForm.title }}</p>
    <p>Description: {{ todoForm.description }}</p>
    <p>Category: {{ todoForm.category }}</p>
  </div>
</template>