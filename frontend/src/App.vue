<script setup lang="ts">
import { ref, onMounted, onUpdated, watch } from 'vue';
import type { Ref } from 'vue';
import axios from 'axios';

import TheHeader from '@/components/TheHeader.vue';
import TheTodoForm from './components/TheTodoForm.vue';
import TodoItem from '@/components/TodoItem.vue';
import type { TodoType } from '@/models/todo.ts';

const API_URL = import.meta.env.VITE_API_URL || '';

// Members
const formData: Ref<TodoType> = ref({
  title: '',
  description: '',
});
const todos: Ref<TodoType[]> = ref([]);

// Lifecycle methods
onMounted(async () => {
  const response = await axios.get(`${API_URL}/todo`);
  todos.value = response.data;
});

// Component methods
async function createTodo(newTodo: TodoType): Promise<any> {
  const response = await axios.post(`${API_URL}/todo`, newTodo);
  todos.value.push(response.data);
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
    <TheTodoForm @addTodo="(todo) => createTodo(todo)"></TheTodoForm>
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