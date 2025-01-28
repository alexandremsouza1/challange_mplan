<template>
  <div>
    <div class="button-container">
      <el-button type="success" circle @click="openAddModal" class="plus-icon">
        <el-icon>
          <Plus />
        </el-icon>
      </el-button>
    </div>

    <ModalTask :save="saveTodo" :open="isOpen" @update:open="isOpen = $event" />
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useTodosStore, TodoItem } from '@/stores/todos';
import notify from '@/services/notificationService';
import ModalTask from './ModalTask.vue'

const isOpen = ref(false)
const todosStore = useTodosStore();

const openAddModal = () => {
  isOpen.value = true;
}

function saveTodo(form: any) {
  const newTodo: TodoItem = {
    id: Date.now().toString(),
    idSync: undefined,
    title: form.title,
    description: form.description,
    completed: false,
  };
  todosStore.addTodo(newTodo)
    .then(() => {
      notify.success();
    })
    .catch((error) => {
      notify.error(error.message);
    })
}


</script>

<style scoped>
.button-container {
  position: relative;
  height: 50px;
}

.plus-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
</style>