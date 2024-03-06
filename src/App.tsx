import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const TodoListTitle = "Список книг:"
    const initState: Array<TaskType> = [
        {id: 1, title: "Атлант расправил плечи(том 3)", isDone: false},
        {id: 2, title: "Уроки химии", isDone: true},
        {id: 3, title: "The Heaven & Earth Grocery Store", isDone: false}
    ]
    const [tasks, setTasks] = React.useState(initState)
    const [filter, setFilter] = React.useState<FilterValuesType>("all")
    const removeTask = (taskId: number) => {
        const updatedState = tasks.filter(task => task.id !== taskId)
        setTasks(updatedState)
    }

    const changeTodoListFilter = (filter: FilterValuesType) =>{
        setFilter(filter)
    }

    const getFilteredTasks = (allTasks: Array<TaskType>, currentFilter: FilterValuesType): Array<TaskType> => {
        switch (currentFilter) {
            case "active":
                return allTasks.filter(t => !t.isDone)
            case "completed":
                return allTasks.filter(t => t.isDone)
            default:
                return allTasks;
        }
    }

    const filteredTasks = getFilteredTasks(tasks, filter)

    return (
        <div className="App">
            <TodoList title={TodoListTitle} tasks={filteredTasks} removeTask={removeTask} changeTodoListFilter={changeTodoListFilter}/>
        </div>
    );
}

export default App;
