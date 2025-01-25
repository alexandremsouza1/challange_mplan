<template>
    <el-checkbox :label="props.todo.id">
        <span :style="{ textDecoration: props.todo.done ? 'line-through' : 'none' }">
      {{ props.todo.name }}
    </span>
        <el-button-group class="todo-group-icon" >
            <el-button type="primary" :icon="Edit" circle 
                 @click.stop="() => deleteTodo(props.todo.id)" />
            <el-button type="danger" :icon="Delete" circle
                 @click.stop="() => deleteTodo(props.todo.id)" />

        </el-button-group>
    </el-checkbox>
</template>


<script setup lang="ts">
import type { PropType } from 'vue';
import { useTodosStore } from '@/stores/todos';
import { Delete,Edit } from '@element-plus/icons-vue'

interface todoItme {
    id: string,
    name: string,
    done: boolean,
}

const todosStore = useTodosStore();
const props = defineProps({
    todo: {
        type: Object as PropType<todoItme>,
        default: () => ({})
    }
})

const deleteTodo = (id: string) => {
    todosStore.deleteTodo(id);
}

const startEditing = () => {
  console.log("teste")
};
</script>

<style scoped lang="scss">
.el-checkbox {
    width: 100%;
    padding: 5px 10px;
    margin-top: 10px;
    margin-right: 0;
    font-size: 16px !important;
    display: flex;
    align-items: center;
    position: relative;

    &:first-of-type {
        margin-top: 0;
    }

    &:hover {
        background: var(--el-fill-color-light);
        border-radius: var(--el-border-radius-base);
    }

    :deep(.el-checkbox__label) {
        width: 100%;
    }

        .todo-group-icon {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            gap: 8px;
        }
    
        .el-button {
            border-radius: 50% !important;
            width: 30px;
            height: 30px;
            padding: 0;
            font-size: 15px;
        }
}
</style>