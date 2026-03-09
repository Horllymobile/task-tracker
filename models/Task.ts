export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TASK_STATUS;
}

export enum TASK_STATUS {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  PENDING = 'pending',
}
