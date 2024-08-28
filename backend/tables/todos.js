const pool = require('../db/dbConnect')

const createTodosTable = ()=>{
    pool.query(`
        CREATE TABLE IF NOT EXISTS todosTable(
            todo_id SERIAL PRIMARY KEY,
            todo TEXT NOT NULL,
            createdAt DATE,
            updatedAt Date
    )`,(err, res)=>{
            if(err){
                console.log(err.message)
            }
            else{
                console.log('TodosTable successfully created')
            }
        })
}
module.exports = createTodosTable;