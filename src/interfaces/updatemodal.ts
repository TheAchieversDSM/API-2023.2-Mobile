export interface IUpdate {
    data: string;
    subtitle: string;
}

export interface IItems {
    id: string,
    taskId: number,
    user: { 
        id: number,
        name: string
    },
    data: string,
    campo: {
        [key: string]: {
            old: string,
            new: string
        }
    }
}