import express, { Request, Response } from 'express';
import Todo, { TodoType } from '../models/todo';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const todoList = await Todo.find();
    res.status(200).json(todoList);
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: 'Unable to fetch todolist' });
  }
});

router.post('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();

    return res.status(200).json(newTodo);
  } catch(err) {
    console.log(err);
    res.status(500).send({ message: 'Error creating todo' });
  }
});

router.put('/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id;
    const completed = { completed: req.body.completed };
    const updated = await Todo.findOneAndUpdate({
      _id: id,
    }, completed, { new: true });

    if (!updated) {
      return res.status(404).send({ message: 'Todo item not found' });
    }

    await updated.save();
    res.status(200).json(updated);
  } catch(err) {
    res.status(500).json({ message: 'Error completing todo' });
  }
});

router.delete('/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id;
    const deleted = await Todo.findByIdAndDelete(id);

    if (!deleted) {
      throw new Error('Error deleting record');
    }
    res.status(200).json({ message: 'Todo deleted' });
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: 'Error deleting todo' });
  }
});

export default router;