import { Schema, model } from 'mongoose';

export type TodoType = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
};

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = model<TodoType>('Todo', todoSchema);

export default Todo;