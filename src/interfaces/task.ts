export interface ICreateTasks {
    name: string;
    description: string;
    priority: string;
    deadline: string /* Date */;
    status: 'TO DO';
    timeSpent: number;
    done: boolean;
    userId: number;
    customInterval: number;
    last_execution: string
}

export interface IGetTasksUser {
    userId: number;
}

export interface IGetTasksUserResp {
    id: number;
    status: 'TO DO' | 'DOING' | 'DONE' | 'EXPIRED';
    deadline: string;
    name: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
    timeSpent: number;
}

export interface IGetTasksUserDate {
    userId: number;
    deadline: string;
}

export interface IUpdateTask {
    id: number;
    userId: number;
    name: string;
    description: string;
    priority: string;
    deadline: string /* Date */;
    status: string;
    timeSpent: number;
    done: boolean;
}