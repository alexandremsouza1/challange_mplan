<template>
    <div>
        <el-checkbox :label="props.todo.id" :model-value="props.todo.completed" @change="handleCheckboxChange">
            <span :style="{ textDecoration: props.todo.completed ? 'line-through' : 'none' }">
                {{ props.todo.title }}
            </span>
            <el-button-group class="todo-group-icon">
                <el-button type="primary" :icon="Edit" circle @click.stop="() => startEditing(props.todo)" />
                <el-button type="danger" :icon="Delete" circle @click.stop="() => deleteTodo(props.todo.id)" />

            </el-button-group>
        </el-checkbox>
        <ModalTask :save="updateTodo" :open="isOpen" :task="taskEdit" @update:open="isOpen = $event" />
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import type { PropType } from 'vue';
import { useTodosStore, TodoItem } from '@/stores/todos';
import { Delete, Edit } from '@element-plus/icons-vue'
import notify from '@/services/notificationService';
import ModalTask from './ModalTask.vue'



const todosStore = useTodosStore();
const props = defineProps({
    todo: {
        type: Object as PropType<TodoItem>,
        default: () => ({})
    }
})

const isOpen = ref(false); 
const taskEdit = ref<TodoItem | null>(null);

const startEditing = (todo: TodoItem) => {
    taskEdit.value = { ...todo };
    isOpen.value = true;
};

const updateTodo = async (todo: TodoItem) => {
    try {
        await todosStore.updateTodo(todo);
        notify.success();
        isOpen.value = false;
    } catch (error) {
        notify.error(error.message);
    }
};

const deleteTodo = (id: string) => {
    todosStore.deleteTodo(id).then(() => {
        notify.success();
    })
        .catch((error) => {
            notify.error(error.message);
        })
}

const handleCheckboxChange = (completed: boolean) => {
    const todo = { ...props.todo, completed };
    todosStore.toggleTodo(todo).then(() => {
        notify.success();
    })
    .catch((error:any) => {
        notify.error(error.message);
    })
}

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