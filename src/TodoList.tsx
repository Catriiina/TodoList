import React from "react";
import {Button} from "./Copmonents/Button";
import {TodoListHeader} from "./TodoListHeader";
import {FilterValuesType} from "./App";

type  TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId:number)=>void
    changeTodoListFilter: (filter: FilterValuesType) =>void
}
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export const TodoList = ({title, tasks, removeTask, changeTodoListFilter}: TodoListPropsType) => {

    const tasksList = tasks.length === 0
        ? <span>Список пуст</span>
        : <ul>
            {
                tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <Button title="✕" onClickHandler={()=>removeTask(task.id)}/>
                        </li>
                    )
                })
            }
        </ul>

    return (
        <div className="todolist">
            <TodoListHeader title={title}/>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button title="All" onClickHandler={()=>changeTodoListFilter("all")}/>
                <Button title="Active" onClickHandler={()=>changeTodoListFilter("active")}/>
                <Button title="Completed" onClickHandler={()=>changeTodoListFilter("completed")}/>
            </div>
        </div>
    )
}