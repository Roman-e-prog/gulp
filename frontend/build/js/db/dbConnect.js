var _require=require("pg"),Pool=_require.Pool,dotenv=require("dotenv"),pool=(dotenv.config(),new Pool({user:process.env.DB_USER,host:process.env.DB_HOST||"localhost",database:"todo_gulp",password:process.env.DATABASE_PASSWORD,port:process.env.PORT}));pool.query("SELECT NOW()",function(o,e){o?console.log("Connection to Database failed",o):console.log("Database connection successful",e.rows)}),module.exports=pool;