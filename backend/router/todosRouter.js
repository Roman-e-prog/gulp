const todosRouter = require('express').Router();
const todosController = require('../controller/todosController');
console.log(todosController, 'hier Daten')
const {createTodo, updateTodo, deleteTodo, getTodo, getAllTodo} = todosController;
todosRouter.post('/', createTodo );
todosRouter.put('/:id', updateTodo );
todosRouter.delete('/:id', deleteTodo );
todosRouter.get('/find/:id', getTodo );
todosRouter.get('/find/', getAllTodo );

module.exports = todosRouter;