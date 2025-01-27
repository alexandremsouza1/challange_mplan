import apiClient from '@/config/axios';

interface Task {
  id?: number;
  title: string;
  description: string;
  completed?: boolean;
}

export const taskService = {
  /**
   * Lista todas as tarefas.
   * @returns Uma promessa com os dados das tarefas.
   */
  async getAllTasks() {
    const response = await apiClient.get<Task[]>('/tasks');
    return response.data;
  },

  /**
   * Cria uma nova tarefa.
   * @param task Objeto com os dados da nova tarefa.
   * @returns Uma promessa com os dados da tarefa criada.
   */
  async createTask(task: Task) {
    const response = await apiClient.post<Task>('/tasks', task);
    return response.data;
  },

  /**
   * Atualiza uma tarefa existente.
   * @param id ID da tarefa a ser atualizada.
   * @param task Objeto com os novos dados da tarefa.
   * @returns Uma promessa com os dados da tarefa atualizada.
   */
  async updateTask(id: number, task: Partial<Task>) {
    const response = await apiClient.put<Task>(`/tasks/${id}`, task);
    return response.data;
  },

  /**
   * Marca uma tarefa como concluída.
   * @param id ID da tarefa a ser marcada como concluída.
   * @returns Uma promessa com os dados atualizados da tarefa.
   */
  async markTaskAsDone(id: number) {
    const response = await apiClient.patch<Task>(`/tasks/${id}/done`);
    return response.data;
  },

  /**
   * Exclui uma tarefa.
   * @param id ID da tarefa a ser excluída.
   * @returns Uma promessa sem corpo (status HTTP 204).
   */
  async deleteTask(id: number) {
    const response = await apiClient.delete<void>(`/tasks/${id}`);
    return response.status;
  },
};
