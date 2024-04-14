import {v1} from 'uuid'
import {FilterValuesType, TodolistType} from '../App'

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
    }
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



let todoListID1 = v1()
let todoListID2 = v1()

const initialState: TodolistType[] = [
    { id: todoListID1, title: 'List of books:', filter: 'all' },
    { id: todoListID2, title: 'What to learn:', filter: 'all' },
]

export const todoListsReducer = (state: TodolistType[] = initialState, action: ActionsType) =>
{
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            const newTodoList: TodolistType = {
                id: v1(),
                title: action.payload.title,
                filter: 'all'
            };
            return [...state, newTodoList];
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
    return { type: 'ADD-TODOLIST', payload: { title } as const }
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