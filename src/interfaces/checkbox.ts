export interface ICheckbox{
    label: string
    check: boolean
    onCheck: (newCheck: boolean) => void;
}