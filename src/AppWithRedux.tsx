import React, {useCallback, useState} from 'react';
import {TasksStateType, TodoList} from "./TodoList/TodoList";
import {AddItemForm} from "./Components/AddItemForm";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper';
import {MenuButton} from "./Components/MenuButton";
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

type ThemeMode = 'dark' | 'light'

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

function AppWithRedux() {

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#1e90ff',
            },
        },
    })

    // let todoListID1 = v1()
    // let todoListID2 = v1()

    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TasksStateType>( state => state.tasks);
    const dispatch = useDispatch();

    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const removeTask = useCallback( (taskId: string, todoListId: string) => {
        const action = removeTaskAC(taskId, todoListId)
        dispatch(action)
    }, [])

    const addTask = useCallback( (title: string, todoListId: string) => {
        const action = addTaskAC(title, todoListId)
        dispatch(action)
    }, [])

    const changeTaskStatus = useCallback( (taskId: string, taskStatus: boolean, todoListId: string) => {
        const action = changeTaskStatusAC(taskId, taskStatus, todoListId)
        dispatch(action)
    }, [])

    const changeTodolistFilter = useCallback( (filter: FilterValuesType, todoListId: string) => {
        const action = changeTodolistFilterAC(filter, todoListId);
        dispatch(action);
    }, [])

    const removeTodolist = useCallback( (todoListId: string) => {
        const action = removeTodolistAC(todoListId)
        dispatch(action)
    }, [])

    const addTodolist = useCallback( (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [])

    const changeTaskTitle = useCallback( (todoListId: string, taskId: string, title: string) => {
        const action = changeTaskTitleAC(todoListId, taskId, title)
        dispatch(action)
    }, [])

    const changeTodolistTitle = useCallback( (todoListId: string, title: string) => {
        const action = changeTodolistTitleAC(todoListId, title)
        dispatch(action)
    }, [])

    return (
        <div
            style={{
                backgroundColor: theme.palette.mode === 'dark' ? '#303030' : '#ffffff',
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
            }}
        >
            <CssBaseline/>
            <ThemeProvider theme={theme}>
                <AppBar position="static" sx={{marginBottom: '30px'}}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <IconButton color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <div>
                            <MenuButton>Login</MenuButton>
                            <MenuButton>Logout</MenuButton>
                            <MenuButton>Faq</MenuButton>
                            <Switch color={'default'} onChange={changeModeHandler} />
                        </div>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container sx={{marginBottom: '30px'}}>
                        <AddItemForm addItem={addTodolist} />
                    </Grid>
                    <Grid container spacing={8}>
                        {todoLists.map(tl => (
                            <Grid key={tl.id}>
                                <Paper sx={{ padding: '20px' }}>
                                    <TodoList
                                        key={tl.id}
                                        title={tl.title}
                                        todoListId={tl.id}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeTodolistFilter={changeTodolistFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default AppWithRedux;
