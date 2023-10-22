import { AllIconKeys, IconType } from "./icons";

export interface Options {
  name: AllIconKeys;
  icon: IconType;
  color: string;
  function: () => void;
}

export interface IHidenMenu {
  option: Options[];
  open: () => void;
}
