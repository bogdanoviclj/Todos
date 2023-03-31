import { useEffect } from 'react';
import { useState } from 'react'
import './MainContent.css'

export const MainContent = () => {
    const [todos, setTodos] = useState([]);
    const [isAllCompleted, setIsAllCompleted] = useState(false);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        fetch("https://dummyjson.com/todos")
        .then((response) => response.json())
        .then((data) => setTodos(data.todos));
    }, [])

    useEffect(() => {
        const isAllCompleted = todos.every((item) => item.completed);
        setIsAllCompleted(isAllCompleted);
    }, [todos]);

    useEffect (() => {
        const completedTodos = todos.filter((item) => item.completed).length;
        if (!completedTodos || !todos.length) return setPercentage(0);
        const percentage = (completedTodos / todos.length) * 100;
        setPercentage(percentage);
    }, [todos]);

    const onCheckboxHandler = (id) => {
        const updatedTodos = todos.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    completed: !item.completed
                };
            };
            return item;
        });
        setTodos(updatedTodos);
    }

    return (
        <div className="main">
            <h2> ToDo List </h2>
            <p id='percentage'> Percentage of completed tasks is: {Math.round(percentage)}% </p>
            <div className="tasks">
                {todos.map((item) => {
                    return (
                        <div className="todo" key={item.id}>
                        <input type="checkbox" checked={item.completed} onChange={() => onCheckboxHandler(item.id)} />
                        <p> {item.todo} </p>
                        </div>
                    )
                })}
                {isAllCompleted && <h3> All tasks are completed! </h3>}
            </div>
        </div>
    )
}