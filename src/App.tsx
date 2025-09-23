import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todos } from './Types/Todos';
import { TodoInfo } from './components/TodoInfo';
import { getUserById } from './servise/Userservice';

export const initialTodos: Todos[] = todosFromServer.map(todos => ({
  ...todos,
  user: getUserById(todos.userId) || undefined,
}));

function getNewTodoId(todo: Todos[]) {
  const maxId = Math.max(...todo.map(todoItem => todoItem.id));

  return maxId + 1;
}

export const App = () => {
  const [todoList, setTodo] = useState<Todos[]>(initialTodos);

  const addTodo = (title: string, userId: number) => {
    const user = getUserById(userId);

    if (!user) {
      return;
    }

    const newTodo: Todos = {
      id: getNewTodoId(todoList),
      title,
      userId,
      completed: false,
      user,
    };

    setTodo(currentTodo => [...currentTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoInfo onSubmit={addTodo} users={usersFromServer} />
      <TodoList todos={todoList} />
    </div>
  );
};
