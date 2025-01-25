<template>
    <el-card :body-style="{ padding: '10px' }">
        <el-menu background-color="#28a745" text-color="#ffffff" active-text-color="#ffffff" class="custom-menu">
            <el-menu-item index="1">
                <el-icon>
                    <List />
                </el-icon>
                <span>{{ $t("taskList") }}</span>
            </el-menu-item>
            <div class="translation-container">
                <el-dropdown @command="changeLanguage">
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M4 0H6V2H10V4H8.86807C8.57073 5.66996 7.78574 7.17117 6.6656 8.35112C7.46567 8.73941 8.35737 8.96842 9.29948 8.99697L10.2735 6H12.7265L15.9765 16H13.8735L13.2235 14H9.77647L9.12647 16H7.0235L8.66176 10.9592C7.32639 10.8285 6.08165 10.3888 4.99999 9.71246C3.69496 10.5284 2.15255 11 0.5 11H0V9H0.5C1.5161 9 2.47775 8.76685 3.33437 8.35112C2.68381 7.66582 2.14629 6.87215 1.75171 6H4.02179C4.30023 6.43491 4.62904 6.83446 4.99999 7.19044C5.88743 6.33881 6.53369 5.23777 6.82607 4H0V2H4V0ZM12.5735 12L11.5 8.69688L10.4265 12H12.5735Z"
                            fill="white" />
                    </svg>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="pt" label="Português">
                                🇧🇷 Português
                            </el-dropdown-item>
                            <el-dropdown-item command="en" label="English">
                                🇺🇸 English
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </el-menu>
        <el-input
            v-model="search"
            style="width: calc(100% - 20px); margin: 10px;"
            :placeholder="$t('typeSomething')"
            :prefix-icon="Search"
            @input="handleSearch"
        />
    </el-card>
</template>



<script setup lang="ts">
import { ref } from 'vue';
import { useTodosStore } from '@/stores/todos';
import { ElMessage } from 'element-plus';
import { Search } from '@element-plus/icons-vue'
import { useI18n } from "vue-i18n";
import debounce from "lodash/debounce";


const emit = defineEmits(['update:checkAll', 'update:isIndeterminate']);
const todosStore = useTodosStore();

const todo = ref<string>('');
const search = ref<string>('')
const { locale } = useI18n();

const updateTodo = async (key: string) => {
    if (todosStore.todosLen >= 10) {
        ElMessage.closeAll();
        ElMessage.warning('最多可添加 10 个');
        todo.value = '';
        return;
    }
    if (key.trim() === '') {
        ElMessage.closeAll();
        ElMessage.warning('输入项不能为空');
        return;
    }
    const isRename = await todosStore.checkName(key);
    if (isRename) {
        ElMessage.closeAll();
        ElMessage.warning('输入项不能重复');
        return;
    }
    const todoObj = {
        id: String(new Date().valueOf()),
        name: key,
        done: false,
    };
    todosStore.addTodo(todoObj);
    updateState();
    todo.value = '';
};

const handleKeyUp = (e: KeyboardEvent) => {
    const { keyCode, target } = e;
    const { value } = target as HTMLInputElement;
    if (keyCode !== 13) return;
    updateTodo(value);
};

function updateState() {
    emit('update:checkAll', todosStore.checkAllBool);
    emit('update:isIndeterminate', todosStore.isIndeterminate);
}

function changeLanguage(lang: string)  {
    locale.value = lang; 
};

function performSearch(): void {
  console.log("Searching for:", search.value);
  // Insira aqui a lógica para buscar
};

const handleSearch = debounce((): void => {
  if (search.value.length >= 3) {
    performSearch();
  }
}, 300);

</script>
<style>
.custom-menu {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.translation-container {
  position: absolute;
  top: 10px;
  right: 20px;
}
</style>