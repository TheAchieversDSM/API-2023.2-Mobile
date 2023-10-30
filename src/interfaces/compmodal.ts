export interface ICompModal {
    view: boolean;
    onBackdropPress: () => void;
    reloadTasksData: () => void;
    taskid: number;
    userids: any[];
  }