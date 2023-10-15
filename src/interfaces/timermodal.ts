import {IUpdateTask, IUpdateTimeSpent} from "./task";

export interface ITimeModal {
  task: IUpdateTimeSpent;
  view: boolean;
  onBackdropPress: () => void;
  reloadTasksData: () => void;
}
