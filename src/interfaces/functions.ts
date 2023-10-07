export interface IResponseCadastro {
  validacao: boolean;
  erro: string;
  taskId?: number;
}

export interface ITimeCaculate {
  msg: string;
  time: number;
}

export interface ITaskCheck {
  done: number;
  todo: number;
  doing: number;
  expirada?: number;
}
