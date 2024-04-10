import React from "react";
import {Button} from "./Copmonents/Button";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./Copmonents/AddItemForm";
import {EditableSpan} from "./Copmonents/EditableSpan";

type TodoListPropsType = {
    title: string
    todoListId: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTodolist: (todolistId: string) => void
    updateTask: (todoListId: string, taskId: string, title: string) => void
    updateTodoList: (todoListId: string, title: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const TodoList = ({
                             title, todoListId, tasks,
                             filter, removeTask, addTask,
                             changeTaskStatus, updateTask,
                             changeFilter, removeTodolist, updateTodoList
                         }: TodoListPropsType) => {


    const addTaskCallback = (title: string) => {
        addTask(title, todoListId)
    }

    const removeTaskHandler = (taskId: string) => {
        removeTask(taskId, todoListId);
    }

    const changeTaskStatusHandler = (taskId: string, taskStatus: boolean) => {
        changeTaskStatus(taskId, taskStatus, todoListId);
    }


    const removeTodolistHandler = () => {
        removeTodolist(todoListId)
    }

    const changeTaskTitleHandler = (taskId: string, title: string) => {
        updateTask(todoListId, taskId, title)
    }

    const updateTodoListHandler = (title: string) => {
        updateTodoList(todoListId, title)
    }

    return (
        <div className="todolist">
            <div style={{display: "flex", justifyContent: "space-between", paddingBottom: "15px"}}>
                <h3 style={{margin: "0"}}>
                    <EditableSpan value={title} onChange={updateTodoListHandler} />
                </h3>
                <Button title={"✕"} onClick={removeTodolistHandler}/>
            </div>
            <AddItemForm addItem={addTaskCallback}/>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input type="checkbox"
                               checked={task.isDone}
                               onChange={(e) => changeTaskStatusHandler(task.id, e.currentTarget.checked)}
                        />
                        <EditableSpan
                            value={task.title}
                            isDone={task.isDone}
                            onChange={(newTitle) => changeTaskTitleHandler(task.id, newTitle)} />
                        <Button title="✕" onClick={() => removeTaskHandler(task.id)}/>
                    </li>
                ))}
            </ul>
            <div>
                <Button
                    classes={filter === "all" ? "btn-active" : " "}
                    title="All"
                    onClick={() => changeFilter("all", todoListId)}
                />
                <Button
                    classes={filter === "active" ? "btn-active" : " "}
                    title="Active"
                    onClick={() => changeFilter("active", todoListId)}
                />
                <Button
                    classes={filter === "completed" ? "btn-active" : " "}
                    title="Completed"
                    onClick={() => changeFilter("completed", todoListId)}
                />
            </div>
        </div>
    )
}
