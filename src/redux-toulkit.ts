import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stringify } from 'querystring';
import { v1 as uuid } from 'uuid';
import { Todo } from './type';

const todosIntialState: Todo[] = [
  {
    id: uuid(),
    desc: 'Learn React',
    isComplete: true,
  },
  {
    id: uuid(),
    desc: 'Learn Redux',
    isComplete: true,
  },
  {
    id: uuid(),
    desc: 'Learn Redux-ToolKit',
    isComplete: false,
  },
];

const todosSlice = createSlice({
  name: 'todos',
  initialState: todosIntialState,
  reducers: {
    edit: (state, action: PayloadAction<{ id: string; desc: string }>) => {
      const todoToEdit = state.find((todo) => todo.id === action.payload.id);
      todoToEdit ? (todoToEdit.desc = action.payload.id) : null;
    },
  },
});
