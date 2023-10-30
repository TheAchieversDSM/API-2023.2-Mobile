export interface IUpdate {
    data: string;
    subtitle: string;
}

export interface IHistoricUpdate {
    id?: string;
    taskId: number;
    data: string;
    user: { id: number; name: string; };
    campo: { [key: string]: { old: string; new: string; }; };
}

export interface IDynamicHistoric {
    [key: string]: IHistoricUpdate[]
}

export interface IFields {
    field: string
}

export interface IModal {
    view: boolean;
    isOverlayVisible: () => void;
    closeOverlay: () => void;
}