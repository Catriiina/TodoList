import React, {useState} from 'react';
import {TaskStateType, TodoList} from "./TodoList/TodoList";
import {v1} from 'uuid'
import {AddItemForm} from "./Copmonents/AddItemForm";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper';
import {MenuButton} from "./Copmonents/MenuButton";
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'

type ThemeMode = 'dark' | 'light'

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
	id: string;
	title: string;
	filter: FilterValuesType;
};

	function App() {

		const [themeMode, setThemeMode] = useState<ThemeMode>('light')

		const theme = createTheme({
			palette: {
				mode: themeMode === 'light' ? 'light' : 'dark',
				primary: {
					main: '#1e90ff',
				},
			},
		})

	let todoListID1 = v1()
	let todoListID2 = v1()

	const [todoLists, setTodoLists] = useState<TodolistType[]>([
		{ id: todoListID1, title: 'List of books:', filter: 'all' },
		{ id: todoListID2, title: 'What to learn:', filter: 'all' },
	]);

	const [tasks, setTasks] = useState<{[key: string]: TaskStateType[]}>({
		[todoListID1]: [
			{ id: v1(), title: "Атлант расправил плечи(том 3)", isDone: false },
			{ id: v1(), title: "Уроки химии", isDone: true },
			{ id: v1(), title: "The Heaven & Earth Grocery Store", isDone: false },
		],
		[todoListID2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	})
	const changeModeHandler = () => {
			setThemeMode(themeMode == 'light' ? 'dark' : 'light')
	}

	const removeTask = (taskId: string, todoListId: string) => {
		const newTodolistTasks = {
			...tasks,
			[todoListId]: tasks[todoListId].filter(t => t.id !== taskId),
		}
		setTasks(newTodolistTasks)
	};

	const addTask = (title: string, todoListId: string) => {
		const newTask = {
			id: v1(),
			title: title,
			isDone: false,
		}
		const newTodolistTasks = {
			...tasks,
			[todoListId]: [newTask, ...tasks[todoListId]]
		}
		setTasks(newTodolistTasks)
	}

	const changeTaskStatus = (taskId: string, taskStatus: boolean, todoListId: string) => {
		const newTodolistTasks = {
			...tasks,
			[todoListId]: tasks[todoListId].map(t => (t.id === taskId ? { ...t, isDone: taskStatus } : t)),
		}
		setTasks(newTodolistTasks)
	}

	const changeFilter = (filter: FilterValuesType, todoListId: string) => {
		const newTodoLists = todoLists.map(tl => {
			return tl.id === todoListId ? {...tl, filter} : tl
		})
		setTodoLists(newTodoLists)
	}

	const removeTodolist = (todoListId: string) => {
		const newTodoLists = todoLists.filter(tl => tl.id !== todoListId)
		setTodoLists(newTodoLists)

		delete tasks[todoListId] // удалим таски для тудулиста из стейта где мы храним таски
		setTasks({ ...tasks })
	}

	const addTodolist = (title: string) => {
		const todoListId = v1()
		const newTodolist: TodolistType = { id: todoListId, title: title, filter: 'all' }
		setTodoLists([newTodolist, ...todoLists])
		setTasks({ ...tasks, [todoListId]: [] })
	}

	const updateTask = (todoListId: string, taskId: string, title: string) => {
			const newTodoListTasks = {
				...tasks,
				[todoListId]: tasks[todoListId].map(t => (t.id === taskId ? { ...t, title } : t)),
			}
			setTasks(newTodoListTasks)
	}

	const updateTodoList = (todoListId: string, title: string) => {
			const newTodoLists = todoLists.map(tl => (tl.id === todoListId ? { ...tl, title } : tl))
			setTodoLists(newTodoLists)
	}

	return (
		<div
			style={{ backgroundColor: theme.palette.mode === 'dark' ? '#303030' : '#ffffff',
				color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' }}
		>
			<CssBaseline/>
			<ThemeProvider theme={theme}>
			<AppBar position="static" sx={{marginBottom: '30px'}}>
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<IconButton color="inherit">
						<MenuIcon />
					</IconButton>
					<div>
						<MenuButton >Login</MenuButton>
						<MenuButton >Logout</MenuButton>
						<MenuButton >Faq</MenuButton>
						<Switch color={'default'} onChange={changeModeHandler} />
					</div>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container sx={{marginBottom: '30px'}}>
			<AddItemForm addItem={addTodolist} />
				</Grid>
				<Grid container spacing={8}>
			{todoLists.map(tl => {
				const allTodolistTasks = tasks[tl.id]
				let tasksForTodolist = allTodolistTasks

				if (tl.filter === 'active') {
					tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
				}

				if (tl.filter === 'completed') {
					tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
				}

				return (
					<Grid >
						<Paper sx={{ padding: '20px' }}>
					<TodoList
						key={tl.id}
						title={tl.title}
						todoListId={tl.id}
						tasks={tasksForTodolist}
						removeTask={removeTask}
						changeFilter={(filter: FilterValuesType, todoListId: string) => changeFilter(filter, todoListId)}
						addTask={addTask}
						changeTaskStatus={changeTaskStatus}
						filter={tl.filter}
						removeTodolist={removeTodolist}
						updateTask={updateTask}
						updateTodoList={updateTodoList}
					/>
						</Paper>
					</Grid>
				);
			})}
				</Grid>
			</Container>
			</ThemeProvider>
		</div>
	);
}

export default App;
