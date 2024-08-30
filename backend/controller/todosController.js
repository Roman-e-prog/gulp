const pool = require('../db/dbConnect')
console.log(pool, 'log the connection')
const createTodo = async (req, res)=>{
    const todo = req.body.todo;
    try{
        const result = await pool.query(
            "INSERT INTO todosTable (todo, createdAt, updatedAt) Values ($1, $2, $3) RETURNING *",[todo, new Date(new Date).toISOString(), new Date(new Date).toISOString()]
        )
        res.status(200).json(result.rows[0])
    } catch(error){
        res.status(500).json({error: error.message})
    }
}
const updateTodo = async (req, res)=>{
    const id = req.params.id;
    const todo = req.body.todo;
    try{
        const result = await pool.query(
            "UPDATE todosTable SET todo=$1, updatedAt=$2 WHERE todo_id=$3", [todo,new Date(new Date().toISOString()), id]
        )
        res.status(200).json(result.rows[0])
    } catch(error){
        res.status(404).json('Not found')
    }
}
const deleteTodo = async (req, res)=>{
    const id = req.params.id
    try{
        const result = await pool.query(
            "DELETE FROM todosTable WHERE todo_id=$1", [id]
        )
        res.status(200).json(`Todo mit der id ${id} wurde gelöscht`)
    } catch(error){
        res.status(404).json('Not found')
    }
}
const getTodo = async (req, res)=>{
    const id = req.params.id;
    try{
        const result = await pool.query(
            "SELECT * FROM todosTable WHERE todo_id=$1",[id]
        )
        res.status(200).json(result.rows[0])
    } catch(error){
        res.status(404).json('Not found')
    }
}
const getAllTodo = async (req,res)=>{
    try{
        const result = await pool.query(
            "SELECT * FROM todosTable"
        )
        res.status(200).json(result.rows)
    } catch(error){
        res.status(404).json('Keine Einträge gefunden')
    }
}
const todosController = {
    createTodo,
    updateTodo,
    deleteTodo,
    getTodo,
    getAllTodo
}

module.exports = todosController;
