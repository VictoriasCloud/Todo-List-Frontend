import { useState } from 'react';
import { Input, message } from 'antd';
import { useTodosStore } from '../store/TodosStore';
import { forwardRef } from 'react';
import confetti from 'canvas-confetti';
import { TodoActionsButtons } from './buttons/TodoActionsButtons';
import { AnimatedCard } from './cards/AnimatedCard';
import { StatusToggleButton } from './buttons/StatusToggleButton';
import { ActionButtonsGroup } from './buttons/ActionButtonsGroup';
import { motion } from 'framer-motion';

interface TodoItemProps {
  todo: {
    id: number;
    title: string;
    description: string;
    status: string;
  };
  isLast?: boolean; 
}


export const TodoItem = forwardRef<HTMLDivElement, TodoItemProps>(
  ({ todo, isLast }, ref) => {
    const { favorites, toggleFavorite, deleteTodo, updateTodo } = useTodosStore();

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);
    const [editedDescription, setEditedDescription] = useState(todo.description);
    const [loading, setLoading] = useState(false);

    const isFavorite = favorites.includes(todo.id);

    const handleStatusToggle = () => {
      const newStatus = todo.status === 'done' ? 'active' : 'done';
      updateTodo(todo.id, { status: newStatus });
    
      //салют при завершении
      if (newStatus === 'done') {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    };
    

    const handleSave = async () => {
      if (!editedTitle.trim() || !editedDescription.trim()) {
        message.warning('Заполните все поля');
        return;
      }
      setLoading(true);
      await updateTodo(todo.id, {
        title: editedTitle,
        description: editedDescription,
      });
      setIsEditing(false);
      setLoading(false);
    };

    const handleCancelEdit = () => {
      setEditedTitle(todo.title);
      setEditedDescription(todo.description);
      setIsEditing(false);
    };

    return (
      <motion.div
          layout
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
        <div ref={isLast ? ref : undefined}>
          <AnimatedCard
              title={
                isEditing ? (
                  <Input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    placeholder="Заголовок"
                  />
                ) : (
                  <div style={{ fontWeight: 500 }}>{todo.title}</div>
                )
              }
              extra={
                !isEditing && (
                  <ActionButtonsGroup
                    isFavorite={isFavorite}
                    onToggleFavorite={() => toggleFavorite(todo.id)}
                    onEdit={() => setIsEditing(true)}
                    onDelete={() => deleteTodo(todo.id)}
                  />
                )
              }
              
              
              
            >
              {isEditing ? (
                <>
                  <Input.TextArea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    placeholder="Описание"
                    autoSize={{ minRows: 2, maxRows: 6 }}
                  />
                  <div style={{ marginTop: 12 }}>
                    <TodoActionsButtons
                      onSave={handleSave}
                      onCancel={handleCancelEdit}
                      loading={loading}
                      disabled={!editedTitle.trim() || !editedDescription.trim()}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div style={{ marginBottom: 8 }}>{todo.description}</div>
                  <div>
                  <StatusToggleButton
                    status={todo.status as 'done' | 'active'}
                    onToggle={handleStatusToggle}
                  />
                  </div>
                </>
              )}
          </AnimatedCard>
        </div>
        </motion.div>
    );
  }
);
