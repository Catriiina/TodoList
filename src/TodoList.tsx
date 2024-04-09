import React, {ChangeEvent} from "react";
import {Button} from "./Copmonents/Button";
import {TodoListHeader} from "./TodoListHeader";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    todoListId: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const TodoList = ({title, todoListId, tasks, filter, addTask, removeTask, changeTaskStatus, changeFilter}: TodoListPropsType) => {

    const [taskTitle, setTaskTitle] = React.useState('')
    const [inputError, setInputError] = React.useState<boolean>(false)

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle.trim(), todoListId)
            setInputError(false)
        } else {
            setInputError(true)
            setTimeout(() => setInputError(false), 3000)
        }
        setTaskTitle('')
    }

    const removeTaskHandler = (taskId: string) => {
        removeTask(taskId, todoListId);
    }

    const changeTaskStatusHandler = (taskId: string, taskStatus: boolean) => {
        changeTaskStatus(taskId, taskStatus, todoListId);
    }

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
                <Button title="+" onClickHandler={addTaskHandler} isDisabled={!taskTitle.length}/>
                {taskTitle.length > 15 && <div>Task title is too long</div>}
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input type="checkbox"
                               checked={task.isDone}
                               onChange={(e) => changeTaskStatusHandler(task.id, e.currentTarget.checked)}
                        />
                        <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                        <Button title="✕" onClickHandler={() => removeTaskHandler(task.id)}/>
                    </li>
                ))}
            </ul>
            <div>
                <Button
                    classes={filter === "all" ? "btn-active" : " "}
                    title="All"
                    onClickHandler={() => changeFilter("all", todoListId)}
                />
                <Button
                    classes={filter === "active" ? "btn-active" : " "}
                    title="Active"
                    onClickHandler={() => changeFilter("active", todoListId)}
                />
                <Button
                    classes={filter === "completed" ? "btn-active" : " "}
                    title="Completed"
                    onClickHandler={() => changeFilter("completed", todoListId)}
                />
            </div>
        </div>
    )
}
