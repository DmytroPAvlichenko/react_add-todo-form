import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todos } from './Types/Todos';
import { TodoInfo } from './components/TodoInfo';
import { User } from './Types/Users';
import { getUserById } from './servise/Userservice';

const userItitial: User[] = usersFromServer.map(user => ({ ...user }));

export const initialTodos: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId) || undefined,
}));

function getNewTodoId(todo: Todos[]) {
  const maxId = Math.max(...todo.map(todoId => todoId.id));

  return maxId + 1;
}

export const App = () => {
  const [todoList, setTodo] = useState<Todos[]>(initialTodos);

  const addTodo = (todos: Todos) => {
    const newTodo = {
      ...todos,
      id: getNewTodoId(todoList),
    };

    setTodo(currentTodo => [...currentTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoInfo onSubmit={addTodo} userList={userItitial} />
      <TodoList list={todoList} />
    </div>
  );
};
