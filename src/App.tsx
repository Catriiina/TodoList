import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

function App() {
    const TodoListTitle_1 = "Список книг:"
    const TodoListTitle_2 = "Выучить:"
    const TodoListTitle_3 = "Сделать:"

    const tasks_1: TaskType[]= [
        {id: 1, title: "Атлант расправил плачи(том 3)", isDone: false},
        {id: 2, title:"Уроки химии", isDone: false},
        {id: 3, title:"The Heaven & Earth Grocery Store", isDone: false}
    ]

    const tasks_2: TaskType[]= [
        {id: 4, title:"Js native", isDone: false},
        {id: 5, title:"Js", isDone: false},
    ]

    const tasks_3: TaskType[]= [
        {id: 6, title:"Codewars", isDone: false},
        {id: 7, title:"HW Todo List", isDone: false},
        {id: 8, title:"HW Social Media", isDone: false},
        {id: 9, title:"Exam 1", isDone: false}
    ]
    return (
        <div className="App">
            <TodoList title={TodoListTitle_1} tasks={tasks_1}/>
            <TodoList title={TodoListTitle_2} tasks={tasks_2}/>
            <TodoList title={TodoListTitle_3} tasks={tasks_3}/>
        </div>
    );
}

export default App;
