var _require=require("pg"),Pool=_require.Pool,dotenv=require("dotenv"),pool=(dotenv.config(),console.log("DB_USER:",process.env.DB_USER),console.log("DB_PASSWORD:",process.env.DB_PASSWORD),console.log("DB_HOST:",process.env.DB_HOST),console.log("DB_NAME:",process.env.DB_NAME),new Pool({user:process.env.DB_USER,host:process.env.DB_HOST,database:process.env.DB_NAME,password:process.env.DB_PASSWORD,port:process.env.PORT}));pool.query("SELECT NOW()",function(o,e){o?console.log("Connection to Database failed",o):console.log("Database connection successful",e.rows)}),module.exports=pool;