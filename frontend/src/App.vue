<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import axios from 'axios';
import TheHeader from './components/TheHeader.vue';

const API_URL = import.meta.env.VITE_API_URL || '';

interface Todo {
  _id?: string;
  title: string;
  description: string;
};

// Members
const formData: Ref<Todo> = ref({
  title: '',
  description: '',
});
const todos: Ref<Todo[]> = ref([]);

// Methods
onMounted(async () => {
  const response = await axios.get(`${API_URL}/todo`);
  console.log(response);
  todos.value = response.data;
});

async function addTodo(e: Event) {
  e.preventDefault();
  const todoItem = formData.value;
  const response = await axios.post(`${API_URL}/todo`, todoItem);
  console.log(response.data);
  todos.value.push(response.data);
  formData.value = {
    title: '',
    description: '',
  };
}

async function removeTodo(item: Todo, i: number) {
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

    <div>
      <ul class="flex flex-col gap-5">
        <li
          v-for="(todo, i) in todos"
          :key="todo._id"
          class="hover:shadow-md hover:bg-blue-100/50 flex justify-between w-full border border-gray-300 rounded-lg px-2 py-3 items-center gap-2"
        >
          <div class="flex-1 flex flex-col gap-1">
            <span class="font-bold text-sm">{{ todo.title }}</span>
            <span>{{ todo.description }}</span>
          </div>
          <button
            @click="removeTodo(todo, i)"
            class="w-[1.45rem] h-[1.45rem] text-center rounded-full bg-red-500 text-white font-bold hover:text-red-500 hover:outline-2 hover:outline-red-500 hover:bg-white"
          >
            X
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>