import {
  configureStore,
  createSlice,
  PayloadAction,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { v1 as uuid } from 'uuid';
import { Todo } from './type';
import logger from 'redux-logger';

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
    create: {
      reducer: (
        state,
        {
          payload,
        }: PayloadAction<{ id: string; desc: string; isComplete: boolean }>
      ) => {
        state.push(payload);
      },
      prepare: ({ desc }: { desc: string }) => ({
        payload: {
          id: uuid(),
          desc,
          isComplete: false,
        },
      }),
    },
    edit: (state, action: PayloadAction<{ id: string; desc: string }>) => {
      const todoToEdit = state.find((todo) => todo.id === action.payload.id);
      if (todoToEdit) {
        todoToEdit.desc = action.payload.desc;
      }
    },
    toggle: (
      state,
      { payload }: PayloadAction<{ id: string; isComplete: boolean }>
    ) => {
      const todoIsComplete = state.find((todo) => todo.id === payload.id);
      if (todoIsComplete) {
        todoIsComplete.isComplete = payload.isComplete;
      }
    },
    remove: (state, { payload }: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((todo) => todo.id === payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

const SelectedTodoSlice = createSlice({
  name: 'SelectedTodo',
  initialState: null as string | null,
  reducers: {
    select: (state, { payload }: PayloadAction<{ id: string }>) => payload.id,
  },
});

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {},
  extraReducers: {
    [todosSlice.actions.create.type]: (state) => ++state,
    [todosSlice.actions.edit.type]: (state) => ++state,
    [todosSlice.actions.remove.type]: (state) => ++state,
    [todosSlice.actions.toggle.type]: (state) => ++state,
  },
});

export const {
  create: createTodoActionCreator,
  edit: EditTodoActionCreator,
  toggle: ToggleTodoActionCreator,
  remove: DeleteTodoActionCreator,
} = todosSlice.actions;

export const { select: SelectTodoActionCreator } = SelectedTodoSlice.actions;

const reducer = {
  todos: todosSlice.reducer,
  selectedTodo: SelectedTodoSlice.reducer,
  counter: counterSlice.reducer,
};

export default configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(), logger],
  devTools: process.env.NODE_ENV !== 'production',
});
