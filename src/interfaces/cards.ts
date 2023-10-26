export interface ICards {
  id: number;
  task: string;
  descricao: string;
  status: "success" | "error" | "warning";
  value: string;
  statusColor: "#de0300" | "#67d207" | "#ebae11" | "#ff7b00";
  priority: string;
  deadline: string;
  timeSpent: number;
  customInterval: number;
  sharedUsersIds: any[];
  reload?: boolean;
  reloadTasksData: () => void;
}

export interface IPriority {
  priority: string;
}
