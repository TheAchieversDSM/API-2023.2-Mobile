export interface ICreateSubtasks {
    id?: number;
    name: string;
    done: boolean;
    taskId: number;
}

export interface IGetSubtasks {
    id: number;
    name: string;
    done: boolean;
}