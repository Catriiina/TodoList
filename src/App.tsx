import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import { v1 } from 'uuid'

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const TodoListTitle = "List of books:"
    const initState: Array<TaskType> = [
        {id: v1(), title: "Атлант расправил плечи(том 3)", isDone: false},
        {id: v1(), title: "Уроки химии", isDone: true},
        {id: v1(), title: "The Heaven & Earth Grocery Store", isDone: false}
    ]
    const [tasks, setTasks] = React.useState(initState)
    const [filter, setFilter] = React.useState<FilterValuesType>("all")
    const removeTask = (taskId: string) => {
        const updatedState = tasks.filter(task => task.id !== taskId)
        setTasks(updatedState)
    }

    const addTask =(title:string)=>{
        const newTask: TaskType ={
            id:  v1(),
            title,
            isDone: false
        }
        const updatedState = [newTask,...tasks]
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
            <TodoList title={TodoListTitle}
                      tasks={filteredTasks}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;
//test git