import React from 'react';
import { Todos } from '../../Types/Todos';
import { UserInfo } from '../UserInfo';

type Props = {
  list: Todos[];
};

export const TodoList: React.FC<Props> = ({ list }) => {
  return (
    <section className="TodoList">
      {list.map(todo => (
        <article
          key={todo.id}
          data-id={todo.id}
          className="TodoInfo TodoInfo--completed"
        >
          <h2 className="TodoInfo__title">{todo.title}</h2>

          {todo.user && <UserInfo user={todo.user} />}
        </article>
      ))}
    </section>
  );
};
