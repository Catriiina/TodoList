import React from "react";
import {Button} from "./Copmonents/Button";
import {TodoListHeader} from "./TodoListHeader";

type  TodoListPropsType = {
    title: string
    tasks: TaskType[]
}
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export const TodoList = ({title, tasks}: TodoListPropsType) => {

    const tasksList = tasks.length === 0
        ? <span>Список пуст</span>
        : <ul>
            {
                tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
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
                <Button title="All"/>
                <Button title="Active"/>
                <Button title="Completed"/>
            </div>
        </div>
    )
}