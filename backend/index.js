const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const createTodosTable = require('./tables/todos');
const todosRouter = require('./router/todosRouter');
const path = require('path')
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;
console.log(port);
console.log(process.env.NODE_ENV, 'here environment')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
createTodosTable();
app.use('/api/todos', todosRouter);
if (process.env.NODE_ENV === 'production') {
    console.log('Running in production mode');
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
} else{
    console.log('Please set the NODE_ENV to production')
}

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
