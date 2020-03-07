
import Todo from './todo.model';

export const getTodos = (req, res) => {
  Todo.find({}, (err, todos) => {
    if(err) return res.status(500).send(err);
    return res.status(200).json({todos});
  })
}

export const addTodo = (req, res) => {
  Todo.create(req.body.todo, (err, todo) => {
    console.log('err --> ', err, ' todo --> ', todo);
    if(err) return res.status(500).send(err);
    return res.status(203).json({todo});
  })
}

export const deleteTodo = (req, res) => {
  Todo.findByIdAndDelete(req.params.id, (err, todo) => {
    if(err) return res.status(500).send(err);
    return res.status(200).send('Todo Deleted!');
  })
}

export const updateTodo = (req, res) => {
  Todo.findOneAndUpdate({_id: req.params.id}, { runValidators: true, new: true }, (err, user) => {
    if(err) return res.status(500).send(err);
    return res.status(200).json({user});
  })
}
