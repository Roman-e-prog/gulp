import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const TodoContext = createContext();

export const useTodos = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const todosFetch = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/todos/find/');
                if (!response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}`);
                } else {
                    let todosData = await response.json();
                    setTodos(todosData);
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        todosFetch();
    }, []);

    return (
        <TodoContext.Provider value={{ todos, setTodos, loading }}>
            {children}
        </TodoContext.Provider>
    );
};
