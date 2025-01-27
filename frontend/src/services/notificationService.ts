import { ElNotification } from 'element-plus';

const notify = {
  success(entity:string) {
    ElNotification({
      title: 'Sucesso',
      message: `${entity} criado(a) com sucesso!`,
      type: 'success',
    });
  },
  error(entity:string) {
    ElNotification({
      title: 'Erro',
      message: `Não foi possível criar o(a) ${entity}. Tente novamente.`,
      type: 'error',
    });
  },
  warning(entity:string) {
    ElNotification({
      title: 'Aviso',
      message: `Algo deu errado ao processar o(a) ${entity}. Verifique os dados.`,
      type: 'warning',
    });
  },
};

export default notify;
