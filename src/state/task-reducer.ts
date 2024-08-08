import { TasksStateType } from '../TodoList/TodoList';
import { v1 } from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";

// Определяем тип действия для удаления задачи
export type RemoveTaskActionType = {
    type: 'REMOVE_TASK';
    payload: {
        taskId: string;
        todoListId: string;
    };
};

export type AddTaskActionType = {
    type: 'ADD_TASK';
    payload: {
        title: string;
        todoListId: string;
    };
};

export type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS';
    payload: {
        taskId: string;
        isDone: boolean;
        todoListId: string;
    };
};

export type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE';
    payload: {
        taskId: string;
        title: string;
        todoListId: string;
    };
};

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE_TASK',
        payload: { taskId, todoListId }
    };
};

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {
        type: 'ADD_TASK',
        payload: { title, todoListId }
    };
};

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: { taskId, isDone, todoListId }
    };
};

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: { taskId, title, todoListId }
    };
};

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType;

const initialTasksState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialTasksState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            const { taskId, todoListId } = action.payload;
            return {
                ...state,
                [todoListId]: state[todoListId].filter(t => t.id !== taskId)
            };
        }
        case 'ADD_TASK': {
            const { title, todoListId } = action.payload;
            const newTask = {
                id: v1(),
                title: title,
                isDone: false,
            };
            return {
                ...state,
                [todoListId]: [newTask, ...state[todoListId]]
            };
        }
        case 'CHANGE_TASK_STATUS': {
            const { taskId, isDone, todoListId } = action.payload;
            // Создаем копию массива задач для указанного тудулиста
            let updatedTasks = state[todoListId].map(task => {
                // Находим нужную задачу и изменяем ее статус
                if (task.id === taskId) {
                    return { ...task, isDone };
                }
                return task;
            });
            // Создаем новое состояние, обновляя массив задач для указанного тудулиста
            return {
                ...state,
                [todoListId]: updatedTasks
            };
        }
        case 'CHANGE_TASK_TITLE': {
            const { taskId, title, todoListId } = action.payload;
            return {
                ...state,
                [todoListId]: state[todoListId].map(t =>
                    t.id === taskId ? { ...t, title: title } : t
                )
            };
        }
        case 'ADD-TODOLIST': {
            const stateCopy = { ...state };
            stateCopy[action.todoListId] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = { ...state };
            delete stateCopy[action.payload.id];
            return stateCopy;
        }
        default:
            return state;
    }
};
