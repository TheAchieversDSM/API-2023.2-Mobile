export interface ICards{
    id: number;
    task: string;
    descricao: string;
    status: 'success' | 'error' | 'warning';
    value: string;
    statusColor: '#de0300' | '#67d207' | '#ebae11'
    priority: string;
    deadline: string;
}