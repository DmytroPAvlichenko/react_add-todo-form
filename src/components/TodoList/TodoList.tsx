import React from 'react';
import { Todos } from '../../Types/Todos';
import { UserInfo } from '../UserInfo';
import classNames from 'classnames';

type Props = {
  todos: Todos[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <article
          key={todo.id}
          data-id={todo.id}
          className={classNames('TodoInfo', {
            'TodoInfo--completed': todo.completed,
          })}
        >
          <h2 className="TodoInfo__title">{todo.title}</h2>

          {todo.user && <UserInfo user={todo.user} />}
        </article>
      ))}
    </section>
  );
};
