import { Input, message } from 'antd';
import { useState } from 'react';
import { useTodosStore } from '../../store/TodosStore';
import { AnimatedCard } from './AnimatedCard';
import { TodoActionsButtons } from '../buttons/TodoActionsButtons';

interface Props {
  onCancel: () => void;
}

export const AddTodoCard = ({ onCancel }: Props) => {
  const { addTodo } = useTodosStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim() || !description.trim()) {
      message.warning('Заполните все поля');
      return;
    }

    setLoading(true);
    await addTodo({ title, description, status: 'active' });
    setTitle('');
    setDescription('');
    setLoading(false);
    onCancel();
  };

  return (
    <AnimatedCard
      title={
        <Input
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ fontWeight: 500 }}
        />
      }
    >
      <Input.TextArea
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        autoSize={{ minRows: 2, maxRows: 6 }}
        style={{ marginBottom: 12 }}
      />
      <TodoActionsButtons
        onSave={handleCreate}
        onCancel={onCancel}
        loading={loading}
        disabled={!title.trim() || !description.trim()}
      />
    </AnimatedCard>
  );
};
