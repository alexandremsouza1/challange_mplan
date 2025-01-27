<template>
  <div>
    <div class="button-container">
      <el-button type="success" circle @click="openAddModal" class="plus-icon">
        <el-icon>
          <Plus />
        </el-icon>
      </el-button>
    </div>

    <el-dialog v-model="dialogVisible" :title="isEditing ? $t('editTask') : $t('addTask')" width="400px">
      <el-form :model="form" label-position="top">
        <el-form-item :label="$t('title')">
          <el-input v-model="form.title" :placeholder="$t('enterTaskTitle')" />
        </el-form-item>
        <el-form-item :label="$t('description')">
          <el-input v-model="form.description" type="textarea" :placeholder="$t('enterTaskDescription')" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">{{ $t('cancel') }}</el-button>
          <el-button type="primary" @click="saveTodo">{{ $t('save') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>


<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useTodosStore, TodoItem } from '@/stores/todos';
import notify from '@/services/notificationService';

const dialogVisible = ref(false)
const isEditing = ref(false)
const todosStore = useTodosStore();

const form = reactive({
  title: '',
  description: ''
})


const openAddModal = () => {
  isEditing.value = false
  form.title = ''
  form.description = ''
  dialogVisible.value = true
}

function saveTodo() {
  const newTodo: TodoItem = {
    id: Date.now().toString(),
    idSync: undefined,
    title: form.title,
    description: form.description,
    completed: false,
  };
  todosStore.addTodo(newTodo)
    .then(() => {
      notify.success('Tarefa salva com sucesso');
    })
    .catch((error) => {
      notify.error('Erro ao salvar tarefa: ' + error.message);
    })
    .finally(() => {
      dialogVisible.value = false;
    });
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