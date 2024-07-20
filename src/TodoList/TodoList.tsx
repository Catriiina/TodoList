import React from "react";
import {MyButton} from '../Copmonents/Button'
import {FilterValuesType} from "../App";
import {AddItemForm} from "../Copmonents/AddItemForm";
import {EditableSpan} from "../Copmonents/EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import {filterButtonsContainerSx, getListItemSx} from './Todolist.styles'

type TodoListPropsType = {
    title: string
    todoListId: string
    tasks: TaskStateType[]
    filter: FilterValuesType
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTodolist: (todolistId: string) => void
    updateTask: (todoListId: string, taskId: string, title: string) => void
    updateTodoList: (todoListId: string, title: string) => void
}
export type TaskStateType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: TaskStateType[];
};

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
                <MyButton title={"✕"} onClick={removeTodolistHandler}/>
            </div>
            <AddItemForm addItem={addTaskCallback}/>
            <List>
                {tasks.map((task) => (
                    <ListItem
                        key={task.id}
                        sx={getListItemSx(task.isDone)}>
                        <div>
                        <Checkbox
                            checked={task.isDone}
                            onChange={(e) => changeTaskStatusHandler(task.id, e.currentTarget.checked)}
                        />
                        <EditableSpan
                            value={task.title}
                            isDone={task.isDone}
                            onChange={(newTitle) => changeTaskTitleHandler(task.id, newTitle)}
                        />
                        </div>
                        <IconButton aria-label="delete" size="small" onClick={() => removeTaskHandler(task.id)}>
                        <DeleteIcon fontSize="inherit" /></IconButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={filterButtonsContainerSx}>
                <Button
                    variant={filter === 'all' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={() => changeFilter("all", todoListId)}
                >
                    All
                </Button>
                <Button
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={() => changeFilter("active", todoListId)}
                >
                    Active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                    onClick={() => changeFilter("completed", todoListId)}
                >
                    Completed
                </Button>
            </Box>
        </div>
    )
}
