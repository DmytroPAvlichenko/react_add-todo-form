import React, { FormEvent, useState } from 'react';
import { User } from '../../Types/Users';
import { Todos } from '../../Types/Todos';
import { getUserById } from '../../servise/Userservice';

interface Props {
  userList: User[];
  onSubmit: (todo: Todos) => void;
}

export const TodoInfo: React.FC<Props> = ({ userList, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const formReset = () => {
    setTitle('');
    setUserId(0);
  };

  const getFormCheck = (event: FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId) || undefined,
    });

    formReset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={getFormCheck}>
      <div className="field">
        <input
          value={title}
          type="text"
          data-cy="titleInput"
          onChange={handleTitleChange}
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select data-cy="userSelect" value={userId} onChange={handUserIdChange}>
          <option value="0" disabled>
            Choose a user
          </option>

          {userList.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {userIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
