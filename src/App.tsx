import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from 'uuid'
import backgroundImg from './assets/pink-marble-background_621302-3332.jpg.avif'
import {AddItemForm} from "./Copmonents/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
	id: string;
	title: string;
	filter: FilterValuesType;
};

	function App() {

	let todoListID1 = v1()
	let todoListID2 = v1()

	const [todoLists, setTodoLists] = useState<TodolistType[]>([
		{ id: todoListID1, title: 'List of books:', filter: 'all' },
		{ id: todoListID2, title: 'What to learn:', filter: 'all' },
	]);

	const [tasks, setTasks] = useState<{[key: string]: TaskType[]}>({
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
		<div className="App">
			<div className="background" style={{ backgroundImage: `url(${backgroundImg})` }}></div>
			<AddItemForm addItem={addTodolist} />
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
				);
			})}
		</div>
	);
}

export default App;
