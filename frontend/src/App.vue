<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import axios from 'axios';

import TheHeader from '@/components/TheHeader.vue';
import TodoItem from '@/components/TodoItem.vue';
import type { TodoType } from '@/models/todo.ts';

const API_URL = import.meta.env.VITE_API_URL || '';

// Members
const formData: Ref<TodoType> = ref({
  title: '',
  description: '',
});
const todos: Ref<TodoType[]> = ref([]);

// Methods
onMounted(async () => {
  const response = await axios.get(`${API_URL}/todo`);
  todos.value = response.data;
});

async function addTodo(e: Event) {
  e.preventDefault();
  const todoItem = formData.value;
  const response = await axios.post(`${API_URL}/todo`, todoItem);
  todos.value.push(response.data);
  formData.value = {
    title: '',
    description: '',
  };
}

async function removeTodo(item: TodoType, i: number) {
  await axios.delete(`${API_URL}/todo/${item._id}`);
  todos.value.splice(i, 1);
}
</script>

<template>
  <!-- TODO: Split this up into components better -->
  <TheHeader title="Todo List"></TheHeader>
  <div class="container mx-auto py-2 flex flex-col gap-5 items-center w-1/3 p-3 my-3">

    <form class="flex flex-col gap-3 w-full mx-auto">
      <label for="title" class="font-bold text-sm flex flex-col">
        Title
        <input
          v-model="formData.title"
          type="text"
          id="title"
          class="border-2 rounded-sm px-2 py-1 font-normal focus:outline-blue-500"
        />
      </label>
      <label for="desc" class="font-bold text-sm flex flex-col">
        Description
        <input
          v-model="formData.description"
          type="text"
          id="desc"
          class="border-2 rounded-sm px-2 py-1 font-normal focus:outline-blue-500"
        />
      </label>
      <button
        @click="addTodo"
        class="px-2 py-1 rounded-md bg-blue-500 text-white w-[fit-content] hover:bg-white hover:text-blue-500 hover:outline-2 hover:outline-blue-500"
      >
        Add
      </button>
    </form>

    <div class="w-full">
      <ul class="flex flex-col gap-5">
        <li
          v-for="(todo, i) in todos"
          :key="todo._id"
        >
          <TodoItem
            :todo="todo"
            @delete="(todo) => removeTodo(todo, i)"
          ></TodoItem>
        </li>
      </ul>
    </div>
  </div>
</template>