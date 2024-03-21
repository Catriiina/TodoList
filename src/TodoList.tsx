import React, {ChangeEvent} from "react";
import {Button} from "./Copmonents/Button";
import {TodoListHeader} from "./TodoListHeader";
import {FilterValuesType} from "./App";

type  TodoListPropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const TodoList = ({title, tasks, filter, addTask, removeTask,changeTaskStatus, changeTodoListFilter}: TodoListPropsType) => {

    const [taskTitle, setTaskTitle] = React.useState('')
    const [inputError, setInputError] = React.useState<boolean>(false)

    let tasksList = tasks.length === 0
        ? <span>Empty list :( </span>
        : <ul>
            {
                tasks.map((task) => {
                    const changeStatusHandler =(e:ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)
                    return (
                        <li key={task.id}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={changeStatusHandler}
                            />
                            <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                            <Button title="✕" onClickHandler={() => removeTask(task.id)}/>
                        </li>
                    )
                })
            }
        </ul>

    const addNewTaskHandler = () => {
        if (taskTitle.trim() !== '' ) {
            addTask(taskTitle.trim())
            setInputError(false)
        } else {
            setInputError(true)
            setTimeout(()=> setInputError(false), 3000)
        }
        setTaskTitle('')
    }


    // const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

    const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const inputText = e.currentTarget.value;
        if (inputText.trim() !== '') {
            setInputError(false);
        }
        setTaskTitle(inputText);
    };

    return (
        <div className="todolist">
            <TodoListHeader title={title}/>
            <div>
                <input
                    className={inputError ? "error" : ""}
                    value={taskTitle}
                    placeholder={'Enter new title'}
                    onChange={setTaskTitleHandler}
                />
                <Button title="+" onClickHandler={addNewTaskHandler} isDisabled={!taskTitle.length}/>
                {taskTitle.length > 15 && <div>Task title is so long</div>}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button
                    classes={filter === "all" ? "btn-active" : " "}
                    title="All"
                    onClickHandler={() => changeTodoListFilter("all")}
                />
                <Button
                    classes={filter === "active" ? "btn-active" : " "}
                    title="Active"
                    onClickHandler={() => changeTodoListFilter("active")}
                />
                <Button
                    classes={filter === "completed" ? "btn-active" : " "}
                    title="Completed"
                    onClickHandler={() => changeTodoListFilter("completed")}
                />
            </div>
        </div>
    )
}
