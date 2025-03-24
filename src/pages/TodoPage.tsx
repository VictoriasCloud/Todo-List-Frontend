import { useState } from 'react';
import { TodoFilterAndCreateButton } from '../components/buttons/TodoFilterAndCreateButton';
import { AddTodoCard } from '../components/cards/AddTodoCard';
import { TodoList } from '../components/TodoList';

export const TodoPage = () => {
  const [adding, setAdding] = useState(false);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr min(900px, 100%) 1fr',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <div />
      <div style={{ padding: '0 24px' }}>
        <TodoFilterAndCreateButton onAddClick={() => setAdding(true)} />
        {adding && <AddTodoCard onCancel={() => setAdding(false)} />}
        <TodoList />
      </div>
      <div />
    </div>
  );
};
