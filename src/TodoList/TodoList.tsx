import React, { useCallback } from "react";
import { MyButton } from '../Components/Button';
import { FilterValuesType } from "../AppWithRedux";
import { AddItemForm } from "../Components/AddItemForm";
import { EditableSpan } from "../Components/EditableSpan";
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import { filterButtonsContainerSx, getListItemSx } from './Todolist.styles';
import {Task} from "../Components/Task";

type TodoListPropsType = {
    title: string;
    todoListId: string;
    tasks: TaskStateType[];
    filter: FilterValuesType;
    removeTask: (taskId: string, todoListId: string) => void;
    changeTaskStatus: (taskId: string, taskStatus: boolean, todoListId: string) => void;
    changeTodolistFilter: (filter: FilterValuesType, todoListId: string) => void;
    addTask: (title: string, todoListId: string) => void;
    removeTodolist: (todolistId: string) => void;
    changeTaskTitle: (todoListId: string, taskId: string, title: string) => void;
    changeTodoListTitle: (todoListId: string, title: string) => void;
};

export type TaskStateType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type TasksStateType = {
    [key: string]: TaskStateType[];
};

export const TodoList = React.memo(({
                                        title, todoListId, tasks,
                                        filter, removeTask, addTask,
                                        changeTaskStatus, changeTaskTitle,
                                        changeTodolistFilter, removeTodolist, changeTodoListTitle
                                    }: TodoListPropsType) => {

    const addTaskCallback = useCallback((title: string) => {
        addTask(title, todoListId);
    }, [todoListId, addTask]);

    const removeTaskHandler = useCallback((taskId: string) => {
        removeTask(taskId, todoListId);
    }, [todoListId, removeTask]);

    const changeTaskStatusHandler = useCallback((taskId: string, taskStatus: boolean) => {
        changeTaskStatus(taskId, taskStatus, todoListId);
    }, [todoListId, changeTaskStatus]);

    const changeTodolistFilterHandler = useCallback((filter: FilterValuesType) => {
        changeTodolistFilter(filter, todoListId);
    }, [changeTodolistFilter, todoListId]);

    const removeTodolistHandler = useCallback(() => {
        removeTodolist(todoListId);
    }, [todoListId, removeTodolist]);

    const changeTaskTitleHandler = useCallback((taskId: string, title: string) => {
        changeTaskTitle(todoListId, taskId, title);
    }, [todoListId, changeTaskTitle]);

    const changeTodoListTitleHandler = useCallback((title: string) => {
        changeTodoListTitle(todoListId, title);
    }, [todoListId, changeTodoListTitle]);
    // const addTaskCallback = useCallback((title: string) => {
    //     addTask(title, todoListId);
    // }, [todoListId, addTask]);
    //
    // const removeTaskHandler = (taskId: string) => {
    //     removeTask(taskId, todoListId);
    // };
    //
    // const changeTaskStatusHandler = (taskId: string, taskStatus: boolean) => {
    //     changeTaskStatus(taskId, taskStatus, todoListId);
    // };
    //
    // const changeTodolistFilterHandler = useCallback((filter: FilterValuesType) => {
    //     changeTodolistFilter(filter, todoListId);
    // }, [changeTodolistFilter, todoListId]);
    //
    // const removeTodolistHandler = () => {
    //     removeTodolist(todoListId);
    // };
    //
    // const changeTaskTitleHandler = (taskId: string, title: string) => {
    //     changeTaskTitle(todoListId, taskId, title);
    // };
    //
    // const changeTodoListTitleHandler = (title: string) => {
    //     changeTodoListTitle(todoListId, title);
    // };

    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone);
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone);
    }

    return (
        <div className="todolist">
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "15px" }}>
                <h3 style={{ margin: "0" }}>
                    <EditableSpan value={title} onChange={changeTodoListTitleHandler} />
                </h3>
                <MyButton title={"✕"} onClick={removeTodolistHandler} />
            </div>
            <AddItemForm addItem={addTaskCallback} />
            <List>
                {tasksForTodolist.map((task) => (
                    <Task
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        isDone={task.isDone}
                        onStatusChange={changeTaskStatusHandler}
                        onTitleChange={changeTaskTitleHandler}
                        onTaskRemove={removeTaskHandler}
                    />
                ))}
            </List>
            <Box sx={filterButtonsContainerSx}>
                <Button
                    variant={filter === 'all' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={() => changeTodolistFilterHandler("all")}
                >
                    All
                </Button>
                <Button
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={() => changeTodolistFilterHandler("active")}
                >
                    Active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                    onClick={() => changeTodolistFilterHandler("completed")}
                >
                    Completed
                </Button>
            </Box>
        </div>
    );
});
