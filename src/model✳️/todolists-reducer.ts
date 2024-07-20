
import {FilterValuesType, TodolistType} from '../App'
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterValuesType
    }
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType



export const todoListsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            return [
                ...state,
                { id: action.todoListId, title: action.title, filter: 'all' }
            ];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl));
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTodolistAC = (todoListId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', payload: { id: todoListId } as const }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title, todoListId: v1()}
}

export const ChangeTodolistTitleAC = (
    id: string,
    title: string
): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', payload: { id, title } };
};

export const ChangeTodolistFilterAC = (
    id: string,
    filter: FilterValuesType
): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', payload: { id, filter } };
};