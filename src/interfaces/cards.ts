export interface ICards{
    task: string;
    descricao: string;
    status: 'success' | 'error' | 'warning';
    value: 'TO DO' | 'DOING' | 'DONE';
    statusColor: '#de0300' | '#67d207' | '#ebae11'
    priority: 'Low' | 'Medium' | 'High';
    deadline: string;
}