import { defineStore } from 'pinia';
import { taskService } from '@/services/taskService';
export interface TodoItem {
    id: string;
    idSync?: number;
    title: string;
    description?: string;
    completed: boolean;
}

const TODOS: TodoItem[] = [];
const DONETODOS: string[] = [];

export const useTodosStore = defineStore('todos', {
    state: () => ({
        todos: JSON.parse(JSON.stringify(TODOS)) as TodoItem[],
        doneTodos: JSON.parse(JSON.stringify(DONETODOS)) as string[],
        filter: '',
        currentPage: 1,
        pageSize: 10,
    }),
    getters: {
        todosLen: (state) => state.todos.length,
        doneTodosLen: (state) => state.doneTodos.length,
        isDone: (state) => state.todos.some((todo: TodoItem) => todo.completed),
        checkAllBool(): boolean {
            return this.todosLen === this.doneTodosLen;
        },
        isIndeterminate(): boolean {
            return this.doneTodosLen > 0 && this.doneTodosLen < this.todosLen;
        },
        filteredTodos(state): TodoItem[] {
            const filterText = state.filter.toLowerCase();
            return state.todos.filter((todo: TodoItem) =>
                todo.title.toLowerCase().includes(filterText) ||
                (todo.description && todo.description.toLowerCase().includes(filterText))
            );
        },
        totalPages(state): number {
            return Math.ceil(state.filteredTodos.length / state.pageSize);
        },
        paginatedTodos(state): TodoItem[][] {
            const filtered = state.filteredTodos;
            const pages = [];
            for (let i = 0; i < filtered.length; i += state.pageSize) {
                pages.push(filtered.slice(i, i + state.pageSize));
            }
            return pages;
        },
        currentPageTodos(state): TodoItem[] {
            return state.paginatedTodos[state.currentPage - 1] || [];
        },
    },
    actions: {
        checkAllTodo(checked: boolean) {
            this.todos = this.todos.map((todo: TodoItem) => ({
                ...todo,
                completed: checked,
            }));
        },
        reverseTodoDone() {
            this.todos = this.todos.map((todo: TodoItem) => ({
                ...todo,
                completed: !todo.completed,
            }));
        },
        updateDoneTodos() {
            this.doneTodos = this.todos.reduce((result: string[], todo: TodoItem) => {
                if (todo.completed) result.push(todo.id);
                return result;
            }, []);
        },
        resetTodos(): Promise<boolean> {
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.todos = JSON.parse(JSON.stringify(TODOS));
                    this.doneTodos = JSON.parse(JSON.stringify(DONETODOS));
                    resolve(false);
                }, 1500);
            });
        },
        checkName(title: string) {
            return new Promise((resolve) => {
                resolve(this.todos.some((todo: TodoItem) => todo.title === title));
            });
        },
        async addTodo(todoObj: TodoItem) {
            this.todos.unshift(todoObj);
            try {
                await this.updateSyncTodo(todoObj)
            } catch (error) {
                console.error('Erro ao adicionar a tarefa:', error);
                throw error;
            }
        },
        async updateSyncTodo(todoObj: TodoItem) {
            try {
              const createdTask = await taskService.createTask({
                title: todoObj.title,
                description: todoObj.description || '',
                completed: todoObj.completed,
              });
          
              this.todos = this.todos.map(todo => 
                todo.id === todoObj.id 
                  ? { ...todo, idSync: createdTask.id }
                  : todo
              );
    
              console.log(`Todo ${todoObj.title} sincronizado com idSync: ${createdTask.id}`);
            } catch (error) {
              console.error('Erro ao sincronizar o todo:', error);
              throw error;
            }
        },
        updateTodo(doneTodos: string[] = []) {
            this.doneTodos = doneTodos;
            this.todos = this.todos.map((todo: TodoItem) => ({
                ...todo,
                completed: doneTodos.includes(todo.id),
            }));
        },
        deleteTodo(id: string) {
            this.todos = this.todos.filter((todo: TodoItem) => todo.id !== id);
            this.doneTodos = this.doneTodos.filter((doneId) => doneId !== id);
        },
        checkAll(checked: boolean) {
            this.checkAllTodo(checked);
            this.updateDoneTodos();
        },
        reverseCheck() {
            this.reverseTodoDone();
            this.updateDoneTodos();
        },
        clearAllDone() {
            this.todos = this.todos.filter((todo: TodoItem) => !todo.completed);
            this.updateDoneTodos();
        },
        setFilter(text: string) {
            this.filter = text;
        },
        updateCurrentPage(page: number) {
            this.currentPage = page;
        },
        updatePageSize(size: number) {
            this.pageSize = size;
            this.currentPage = 1;
        },

        async syncAll() {
            try {
              const unsyncedTodos = this.todos.filter(todo => !todo.idSync);
              console.log(unsyncedTodos)
              if (unsyncedTodos.length === 0) {
                console.log("Não há todos para sincronizar.");
                return;
              }
              for (const todo of unsyncedTodos) {
                await this.updateSyncTodo(todo);
              }
              console.log("Todos sincronizados com sucesso.");
            } catch (error) {
              console.error("Erro ao sincronizar todos:", error);
            }
          }
    },
    persist: {
        pick: ['todos', 'doneTodos'],
    },
});
