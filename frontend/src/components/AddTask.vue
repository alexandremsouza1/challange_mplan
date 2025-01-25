<template>
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
</template>

<script setup>
import { ref, reactive } from 'vue'

const dialogVisible = ref(false)
const isEditing = ref(false)

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


</script>

<style scoped>
.button-container {
  position: relative;
  height:50px; 
}
.plus-icon {
  position: absolute;
  right: 10px; 
  top: 50%;
  transform: translateY(-50%);
}
</style>