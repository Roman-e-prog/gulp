import React from 'react'
import * as styles from './edit.module.scss'
import {useForm} from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const Edit = ({editId, setEdit, editData, setTodos}) => {
    const {register, handleSubmit, formState} = useForm({
        defaultValues:{
            todo: editData
        }
    })
    const {errors} = formState;

    const onSubmit = async (data)=>{
        const id = editId;
        try{
            const response = await fetch(`http://localhost:5000/api/todos/${id}`,
                {
                    method:"PUT",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(data)
                }
            )
            if(response.ok){
                const response = await fetch('http://localhost:5000/api/todos/find/');
                if (!response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}`);
                } else {
                    let todosData = await response.json();
                    setTodos(todosData)
                }
                setEdit(false);
            }
        }
         catch(error){
            toast.error(error.message)
        }
    }
  return (
    <div className={styles.container}>
        <ToastContainer/>
        <h1 className={styles.title}>Edit</h1>
        <div className={styles.closeWrapper}>
            <span className={styles.close} onClick={()=>setEdit(false)}>X</span>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
                <label htmlFor="todoEdit" className={styles.label}>Edit Todo</label>
                <input type="text" 
                       id="todoEdit"
                       data-testid="todoEdit"
                       {...register('todo',{
                        required:{
                            value:true,
                            message:'Bitte todo editieren oder zurück'
                        }
                       })} 
                       className={styles.input} />
                {/* <div className="error">{errors.todo.message}</div> */}
            </div>
            <div className={styles.buttonWrapper}>
                <button className={styles.inputBtn}>Absenden</button>
            </div>
        </form>
    </div>
  )
}

export default Edit