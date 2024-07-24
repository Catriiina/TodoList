import { FilterValuesType, TodolistType } from '../AppWithRedux';
import { v1 } from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST';
    payload: { id: string };
};

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST';
    title: string;
    todoListId: string;
};

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE';
    payload: { id: string; title: string };
};

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER';
    payload: { filter: FilterValuesType; id: string };
};

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;

export const todoListsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id);
        }
        case 'ADD-TODOLIST': {
            return [
                ...state,
                { id: action.todoListId, title: action.title, filter: 'all' }
            ];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl));
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl));
        }
        default:
            throw new Error("I don't understand this type");
    }
};

export const removeTodolistAC = (todoListId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', payload: { id: todoListId } };
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title, todoListId: v1() };
};

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', payload: { id, title } };
};

export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', payload: { filter, id } };
};
