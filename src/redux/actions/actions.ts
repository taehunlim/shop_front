import {SET_TASKS, DELETE_TASK} from './types';

export type TasksProps =  {
    id: number;
    title: string;
};

export function setTasks(tasks: TasksProps[]) {
    return {
        type: SET_TASKS,
        payload: {
            tasks
        }
    };
};

export function deleteTask(id: number) {
    return {
        type: DELETE_TASK,
        payload: {
            id
        }
    };
};