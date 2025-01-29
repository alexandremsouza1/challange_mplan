<template>
  <div class="todo-container">
    <el-checkbox-group :model-value="todosStore.doneTodos" @change="handleCheckedChange">
      <Item v-for="todo in todosStore.currentPageTodos" :key="todo.id" :todo="todo" />
    </el-checkbox-group>
  </div>
</template>

<script setup lang="ts">
import { useTodosStore } from '@/stores/todos';
import Item from './Item.vue';

const todosStore = useTodosStore();
const emit = defineEmits(['update:checkAll']);

const handleCheckedChange = (doneTodos: any[]): void => {
  todosStore.doneTodo(doneTodos);
  emit('update:checkAll', todosStore.checkAllBool);
}

</script>

<style scoped lang="scss">
.el-checkbox-group {
  display: grid;
}
.todo-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 600px;
  overflow-y: auto; 
  padding: 10px;
  box-sizing: border-box;
}
</style>
