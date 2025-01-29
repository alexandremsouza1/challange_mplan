<template>
    <div class="footer-wrapper">
        <el-pagination class="pagination-space" background layout="sizes, prev, pager, next" :total="todosStore.todosLen"
            :page-size="todosStore.pageSize" :current-page="todosStore.currentPage" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        <AddTask />
    </div>
</template>


<script setup lang="ts">

import { ref } from 'vue'
import { useTodosStore } from '@/stores/todos';

import AddTask from './AddTask.vue'


const emit = defineEmits(['update:checkAll']);
const todosStore = useTodosStore();


const handleSizeChange = (val: number) => {
    todosStore.updatePageSize(val)
}
const handleCurrentChange = (val: number) => {
    todosStore.updateCurrentPage(val)
}

</script>


<style scoped lang="scss">
.footer-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.el-checkbox {
    margin-right: 10px;
}

:deep(.el-alert) {
    max-width: 120px;
    white-space: nowrap;
    justify-content: center;
    margin-left: auto;
    padding: 8px;

    .el-alert__content {
        padding: 0 !important;
        text-align: center;
    }
}

.el-button {
    margin: 0 10px;
}

.pagination-space {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: auto;
}
</style>