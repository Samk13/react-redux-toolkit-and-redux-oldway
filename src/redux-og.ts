import { Todo } from './type';
import { v1 as uuid } from 'uuid';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

// constants
const CREATE_TODO = 'CREATE_TODO';
const EDIT_TODO = 'EDIT_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';
const SELECT_TODO = 'SELECT_TODO';

// ACTIONS & ACTIONS TYPES
interface CreateTodoActionType {
  type: typeof CREATE_TODO;
  payload: Todo;
}

export const createTodoActionCreator = ({
  desc,
}: {
  desc: string;
}): CreateTodoActionType => {
  return {
    type: CREATE_TODO,
    payload: {
      id: uuid(),
      desc,
      isComplete: false,
    },
  };
};

interface EditTodoActionType {
  type: typeof EDIT_TODO;
  payload: {
    id: string;
    desc: string;
  };
}

export const EditTodoActionCreator = ({
  id,
  desc,
}: {
  desc: string;
  id: string;
}): EditTodoActionType => {
  return {
    type: EDIT_TODO,
    payload: {
      id,
      desc,
    },
  };
};

interface ToggleTodoActionType {
  type: typeof TOGGLE_TODO;
  payload: {
    id: string;
    isComplete: boolean;
  };
}

export const ToggleTodoActionCreator = ({
  id,
  isComplete,
}: {
  id: string;
  isComplete: boolean;
}): ToggleTodoActionType => ({
  type: TOGGLE_TODO,
  payload: { id, isComplete },
});

interface DeleteTodoActionType {
  type: typeof DELETE_TODO;
  payload: { id: string };
}

export const DeleteTodoActionCreator = ({
  id,
}: {
  id: string;
}): DeleteTodoActionType => ({
  type: DELETE_TODO,
  payload: { id },
});

interface SelectTodoActionType {
  type: typeof SELECT_TODO;
  payload: { id: string | null };
}

export const SelectTodoActionCreator = ({
  id,
}: {
  id: string;
}): SelectTodoActionType => ({
  type: SELECT_TODO,
  payload: { id },
});

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
// Reducers
type TodoActionType =
  | CreateTodoActionType
  | EditTodoActionType
  | ToggleTodoActionType
  | DeleteTodoActionType;

const todosReducer = (
  state: Todo[] = todosIntialState,
  action: TodoActionType
) => {
  switch (action.type) {
    case CREATE_TODO: {
      return [...state, action.payload];
    }
    case EDIT_TODO: {
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, desc: action.payload.desc }
          : todo
      );
    }

    case TOGGLE_TODO: {
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isComplete: action.payload.isComplete }
          : todo
      );
    }
    case DELETE_TODO: {
      return state.filter((todo) => todo.id !== action.payload.id);
    }

    default:
      return state;
  }
};

type SelectedTodoActionType = SelectTodoActionType;

const SelectedTodoReducer = (
  state: string | null = null,
  action: SelectedTodoActionType
) => {
  switch (action.type) {
    case SELECT_TODO:
      return action.payload.id;
    default:
      return state;
  }
};

const counterReducer = (state: number = 0, action: TodoActionType) => {
  switch (action.type) {
    case CREATE_TODO:
      return state + 1;
    case EDIT_TODO:
      return state + 1;
    case TOGGLE_TODO:
      return state + 1;
    case DELETE_TODO:
      return state + 1;

    default:
      return state;
  }
};

const reducers = combineReducers({
  todos: todosReducer,
  selectedTodo: SelectedTodoReducer,
  counter: counterReducer,
});

// store

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, logger))
);
