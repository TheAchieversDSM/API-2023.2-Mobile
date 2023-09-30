import { IUpdateTask } from "./task";

export interface ITimeModal {
  task: IUpdateTask;
  view: boolean;
  onBackdropPress: () => void;
}