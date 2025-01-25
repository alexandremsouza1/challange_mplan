<template>
  <el-row justify="center">
    <el-col :xs="19" :sm="19" :md="19" :lg="19">
      <Header v-model:checkAll="checkAll" v-model:isIndeterminate="isIndeterminate" />
      <el-card :body-style="{ padding: '10px' }">
        <template v-if="todosStore.todosLen !== 0">
          <List v-model:checkAll="checkAll" v-model:isIndeterminate="isIndeterminate" />
          <el-divider style="margin:10px 0" />
          <Footer />
        </template>
        <el-empty v-else>
          <template #description />
          <el-button type="primary" :loading="isReset" @click="handleResetAndRefresh">重置刷新</el-button>
        </el-empty>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue';
import { useTodosStore } from '@/stores/todos';
import Header from './components/Header.vue';
import List from './components/List.vue';
import Footer from './components/Footer.vue';

const todosStore = useTodosStore()
const checkAll = ref(false);
const isIndeterminate = ref(true);
const isReset = ref(false);

// 重置
const handleResetAndRefresh = async () => {
  checkAll.value = false;
  isIndeterminate.value = true;
  isReset.value = true;
  isReset.value = await todosStore.resetTodos();
}
</script>


