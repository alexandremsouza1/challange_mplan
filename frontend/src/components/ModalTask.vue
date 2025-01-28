<template>
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
        <el-button @click="closeModal">{{ $t('cancel') }}</el-button>
        <el-button type="primary" @click="save(form); closeModal();">{{ $t('save') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { TodoItem } from '@/stores/todos';

const props = defineProps({
  save: Function,
  task: {
    type: Object as () => TodoItem, 
    required: false,
    default: null
  },
  open: Boolean
});

const emit = defineEmits(['update:open']); 

const dialogVisible = ref(props.open);
const isEditing = ref(false);

const form = reactive({
  id: '',
  idSync: undefined,
  title: '',
  description: '',
});


watch(
  () => props.open,
  (newVal) => {
    dialogVisible.value = newVal;
    if (newVal) initializeForm();
  }
);

watch(dialogVisible, (newVal) => {
  emit('update:open', newVal);
});

const initializeForm = () => {
  if (props.task) {
    form.id = props.task.id
    form.idSync = props.task?.idSync
    form.title = props.task.title;
    form.description = props.task.description;
    isEditing.value = true;
  } else {
    form.title = '';
    form.description = '';
    isEditing.value = false;
  }
};


const closeModal = () => {
  dialogVisible.value = false;
};

</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
