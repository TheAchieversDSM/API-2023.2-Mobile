import {IItem} from "./dropdown";

export const months: IItem[] = [
  {label: "Janeiro", value: "1"},
  {label: "Fevereiro", value: "2"},
  {label: "Março", value: "3"},
  {label: "Abril", value: "4"},
  {label: "Maio", value: "5"},
  {label: "Junho", value: "6"},
  {label: "Julho", value: "7"},
  {label: "Agosto", value: "8"},
  {label: "Setembro", value: "9"},
  {label: "Outubro", value: "10"},
  {label: "Novembro", value: "11"},
  {label: "Dezembro", value: "12"},
];

export const anos: IItem[] = [
  {label: "2023", value: "2023"},
  {label: "2022", value: "2022"},
  {label: "2021", value: "2021"},
];

export interface IMonthly {
  January?: "January";
  February?: "February";
  March?: "March";
  April?: "April";
  May?: "May";
  June?: "June";
  July?: "July";
  August?: "August";
  September?: "September";
  October?: "October";
  November?: "November";
  December?: "December";
}
export interface IMonthlyCalculated {
  January?: number;
  February?: number;
  March?: number;
  April?: number;
  May?: number;
  June?: number;
  July?: number;
  August?: number;
  September?: number;
  October?: number;
  November?: number;
  December?: number;
}

export interface IMonthlyArray {
  value: number;
  frontColor: string;
}
