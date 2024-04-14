import {
    addTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    removeTodolistAC,
    todoListsReducer
} from './todolists-reducer'
import { v1 } from 'uuid'
import { TodolistType } from '../App'

test('correct todolist should be removed', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    const startState: TodolistType[] = [
        { id: todoListID1, title: 'List of books:', filter: 'all' },
        { id: todoListID2, title: 'What to learn:', filter: 'all' },
    ]

    const endState = todoListsReducer(startState, removeTodolistAC(todoListID1))

    expect(endState.length).toBe(1)

    expect(endState[0].id).toBe(todoListID2)
})

test('correct todolist should be added', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    const startState: TodolistType[] = [
        { id: todoListID1, title: 'List of books:', filter: 'all' },
        { id: todoListID2, title: 'What to learn:', filter: 'all' },
    ]

    const newTitle = 'New Todolist'

    const endState = todoListsReducer(startState, addTodolistAC(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTitle)
})

test('correct todolist should change its name', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    const startState: TodolistType[] = [
        { id: todoListID1, title: 'List of books:', filter: 'all' },
        { id: todoListID2, title: 'What to learn:', filter: 'all' },
    ]

    const newTitle = 'New Todolist'

    const endState = todoListsReducer(startState, ChangeTodolistTitleAC(todoListID2, newTitle))

    expect(endState[0].title).toBe('List of books:')
    expect(endState[1].title).toBe(newTitle)

})

test('correct filter of todolist should be changed', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    const startState: TodolistType[] = [
        { id: todoListID1, title: 'List of books:', filter: 'all' },
        { id: todoListID2, title: 'What to learn:', filter: 'all' },
    ]

    const newFilter = 'completed'

    const endState = todoListsReducer(startState, ChangeTodolistFilterAC(todoListID2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
