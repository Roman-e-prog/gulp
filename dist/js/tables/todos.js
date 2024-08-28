let pool=require("../db/dbConnect"),createTodosTable=()=>{pool.query(`
        CREATE TABLE IF NOT EXISTS todosTable(
            todo_id SERIAL PRIMARY KEY,
            todo TEXT NOT NULL,
            createdAt DATE,
            updatedAt Date
    )`,(e,o)=>{e?console.log(e.message):console.log("TodosTable successfully created")})};module.exports=createTodosTable;