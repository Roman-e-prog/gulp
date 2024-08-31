import React, { useState, useEffect } from 'react';
import * as styles from './output.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { MdDelete, MdModeEdit } from "react-icons/md";
import Edit from '../edit/Edit';
import { useTodos } from '../context';

const Output = () => {
    const { todos, setTodos } = useTodos();
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(false);
    const [editData, setEditData] = useState("");
    const [editId, setEditId] = useState(null);
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
    }, [setTodos]);

    const handleEdit = (id, todo) => {
        setEditId(id);
        setEditData(todo)
        setEdit(true)
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/todos/${id}`, {
                method: "DELETE",
            });
            const response = await fetch('http://localhost:5000/api/todos/find/');
            if (!response.ok) {
                throw new Error(`HTTP error: Status ${response.status}`);
            } else {
                let todosData = await response.json();
                setTodos(todosData)
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <ToastContainer data-testid="toastContainer" />
            <h1 className={styles.title}>Todos</h1>
            {loading ? <p data-testid="loader">...Loading</p> : null}
            {todos && todos.length > 0 ? todos.map((item) => (
                <div key={item.todo_id} className={styles.fieldWrapper}>
                    <p className={styles.todo} data-testid="todoText">{item.todo}</p>
                    <div className={styles.icon}>
                        <MdModeEdit onClick={() => handleEdit(item.todo_id, item.todo)} className={styles.icons} />
                        <MdDelete onClick={() => handleDelete(item.todo_id)} className={styles.icons} />
                    </div>
                </div>
            )) : null}
            {edit ? <Edit editData={editData} setEdit={setEdit} editId={editId} setTodos={setTodos}/> : null}
        </div>
    );
};

export default Output;
