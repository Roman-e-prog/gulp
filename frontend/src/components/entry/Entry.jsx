import React, { useEffect } from 'react';
import * as styles from './entry.module.scss';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useTodos } from '../context';

const Entry = () => {
    const { register, handleSubmit, formState, reset } = useForm({
        defaultValues: {
            todo: "",
        }
    });
    const { errors, isDirty, isValid, isSubmitting, isSubmitted } = formState;
    const { setTodos } = useTodos();
    console.log(setTodos)
    useEffect(() => {
        if (isSubmitted) {
            reset();
        }
    }, [isSubmitted, reset]);

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/api/todos/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const newTodo = await response.json();
            setTodos(prevTodos => [...prevTodos, newTodo]);
        } catch (err) {
            console.log(err.message);
            toast.error(err.message);
        }
    };

    return (
        <div className={styles.container} data-testid="entryContainer">
            <ToastContainer />
            <div className={styles.entryField}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formGroup}>
                        <label htmlFor="addTodo" className={styles.label}>Eingabe Todo</label>
                        <input type="text"
                            id="addTodo"
                            data-testid="addTodo"
                            {...register('todo', {
                                required: {
                                    value: true,
                                    message: 'Bitte gib ein Todo ein'
                                }
                            })}
                            className={styles.input} />
                        <div className="error">{errors.addTodo?.message}</div>
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.inputBtn} disabled={!isValid || !isDirty || isSubmitting}>Absenden</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Entry;
