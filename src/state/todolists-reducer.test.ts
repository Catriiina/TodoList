import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todoListsReducer
} from './todolists-reducer'
import { v1 } from 'uuid'
import { TodolistType } from '../AppWithRedux'

let todoListID1 : string
let todoListID2: string
let startState: TodolistType[]
beforeEach( ()=>{
    todoListID1 = v1()
    todoListID2 = v1()
    startState = [
        { id: todoListID1, title: 'List of books:', filter: 'all' },
        { id: todoListID2, title: 'What to learn:', filter: 'all' },
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodolistAC(todoListID1))

    expect(endState.length).toBe(1)

    expect(endState[0].id).toBe(todoListID2)
})

test('correct todolist should be added', () => {

    const newTitle = 'New Todolist'

    const endState = todoListsReducer(startState, addTodolistAC(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTitle)
})

test('correct todolist should change its name', () => {

    const newTitle = 'New Todolist'

    const endState = todoListsReducer(startState, changeTodolistTitleAC(todoListID2, newTitle))

    expect(endState[0].title).toBe('List of books:')
    expect(endState[1].title).toBe(newTitle)

})

test('correct filter of todolist should be changed', () => {

    const newFilter = 'completed'

    const endState = todoListsReducer(startState, changeTodolistFilterAC(newFilter, todoListID2))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
