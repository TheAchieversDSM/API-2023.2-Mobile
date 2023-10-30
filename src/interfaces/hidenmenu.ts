import { AllIconKeys, IconType } from "./icons";

export interface Options {
  name: AllIconKeys;
  icon: IconType;
  color: string;
  size: number;
  function: () => void;
}

export interface IHidenMenu {
  option: Options[];
  open: () => void;
}
