export interface ICreateSubtasks {
    id?: number;
    name: string;
    done: false;
    task?: number;
}

export interface IGetSubtasks {
    id: number;
    name: string;
    done: boolean;
}