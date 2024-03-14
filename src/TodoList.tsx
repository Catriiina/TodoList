import React, {ChangeEvent} from "react";
import {Button} from "./Copmonents/Button";
import {TodoListHeader} from "./TodoListHeader";
import {FilterValuesType} from "./App";

type  TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId:string)=>void
    changeTodoListFilter: (filter: FilterValuesType) =>void
    addTask: (title:string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const TodoList = ({title, tasks, addTask, removeTask, changeTodoListFilter}: TodoListPropsType) => {

    const [taskTitle, setTaskTitle] = React.useState('')

    let tasksList = tasks.length === 0
        ? <span>Empty list :( </span>
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

    const addNewTaskHandler = ()=>{
        addTask(taskTitle)
        setTaskTitle('')
    }

    const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>)=>  setTaskTitle(e.currentTarget.value)

    return (
        <div className="todolist">
            <TodoListHeader title={title}/>
            <div>
                <input
                    value={taskTitle}
                    placeholder={'enter new'}
                    onChange={setTaskTitleHandler}
                />
                <Button title="+" onClickHandler={addNewTaskHandler} isDisabled={!taskTitle.length}/>
                {taskTitle.length > 15 && <div>Task title is so long</div>}
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
