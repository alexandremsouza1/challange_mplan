import { defineStore } from 'pinia';

const TODOS = [
    { id: "1", name: "Conferir email", done: true },
    { id: "2", name: "Tomar remedio", done: false },
    { id: "3", name: "Beba agua", done: false },
];
const DONETODOS = ["1"];

interface todoItme {
    id: string,
    name: string,
    done: boolean,
}

export const useTodosStore = defineStore('todos', {
    state: () => ({
        todos: JSON.parse(JSON.stringify(TODOS)),
        doneTodos: JSON.parse(JSON.stringify(DONETODOS)),
    }),
    getters: {
        todosLen: (state) => (state.todos.length),
        doneTodosLen: (state) => state.doneTodos.length,

        isDone: (state) => state.todos.some((todo: todoItme) => todo.done),
        checkAllBool(): boolean {
            return this.todosLen === this.doneTodosLen
        },
        isIndeterminate(): boolean {
            return (this.doneTodosLen > 0) && this.doneTodosLen < this.todosLen
        }
    },
    actions: {
        // 全选
        checkAllTodo(checked: boolean) {
            this.todos = Array.from(this.todos, (todo: todoItme) => ({
                ...todo,
                done: checked,
            }));
        },
        // 反选逻辑
        reverseTodoDone() {
            this.todos = this.todos.map((todo: todoItme) => {
                todo.done = !todo.done;
                return todo;
            });
        },
        updateDoneTodos() {
            this.doneTodos = this.todos.reduce((result: string[], todo: todoItme) => {
                todo.done && result.push(todo.id);
                return result;
            }, []);
        },
        resetTodos(): Promise<boolean> {
            return new Promise((reslove) => {
                setTimeout(() => {
                    this.todos = JSON.parse(JSON.stringify(TODOS));
                    this.doneTodos = JSON.parse(JSON.stringify(DONETODOS));
                    reslove(false);
                }, 1500);
            });
        },
        checkName(name: string) {
            return new Promise((reslove) => {
                reslove(this.todos.some((todo: todoItme) => todo.name === name));
            });
        },
        addTodo(todoObj: todoItme) {
            this.todos.unshift(todoObj);
        },
        updateTodo(doneTodos: string[] = []) {
            this.doneTodos = doneTodos;
            this.todos = Array.from(this.todos, (todo: todoItme) => ({
                ...todo,
                done: doneTodos.includes(todo.id),
            }));
        },
        // 删除 todo
        deleteTodo(id: string) {
            this.todos = this.todos.filter((todo: todoItme) => todo.id !== id);
            this.doneTodos.splice(this.doneTodos.indexOf(id), 1);
        },
        // 全选
        checkAll(checked: boolean) {
            this.checkAllTodo(checked);
            this.updateDoneTodos();
        },
        // 反选
        reverseCheck() {
            this.reverseTodoDone();
            this.updateDoneTodos();
        },
        // 清除已完成
        clearAllDone() {
            this.todos = this.todos.filter((todo: todoItme) => !todo.done);
            this.updateDoneTodos();
        },
    },
})