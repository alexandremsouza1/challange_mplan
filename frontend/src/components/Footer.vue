<template>
    <div class="footer-wrapper">
        <AddTask />
    </div>
</template>


<script setup>

import { ref } from 'vue'
import { useTodosStore } from '@/stores/todos';
import AddTask from './AddTask.vue'


const emit = defineEmits(['update:checkAll', 'update:isIndeterminate']);
const todosStore = useTodosStore();

const checked = ref(false);

const checkAllTodo = (checked) => {
    todosStore.checkAll(checked);
    emit('update:checkAll', checked);
    emit('update:isIndeterminate', false);
}
const reverseCheck = () => {
    todosStore.reverseCheck();
    updateState();
}
const clearAllDone = () => {
    todosStore.clearAllDone();
    updateState();
}

function updateState() {
    emit('update:checkAll', todosStore.checkAllBool);
    emit('update:isIndeterminate', todosStore.isIndeterminate);
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
</style>