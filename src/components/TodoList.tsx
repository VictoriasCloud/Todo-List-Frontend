import { useEffect, useRef } from 'react';
import { List, Spin } from 'antd';
import { useTodosStore } from '../store/TodosStore';
import { TodoItem } from './TodoItem';
import { AnimatePresence } from 'framer-motion';

export const TodoList = () => {
  const {
    Todos,
    favorites,
    filter,
    loading,
    hasMore,
    loadTodos,
  } = useTodosStore();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || loading || !hasMore) return;
  
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadTodos();
      }
    });
  
    observer.observe(node);
    observerRef.current = observer;
  
    return () => observer.disconnect();
  }, [loading, hasMore]);
  

  const filteredTodos = Todos.filter((todo) => {
    if (filter === 'favorites') return favorites.includes(todo.id);
    if (filter === 'completed') return todo.status === 'done';
    if (filter === 'incomplete') return todo.status !== 'done';
    return true;
  });

  return (
    <List
      loading={loading && Todos.length === 0}
      renderItem={() => null}
    >
      <AnimatePresence mode="popLayout">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </AnimatePresence>

      <div ref={loadMoreRef} style={{ height: 1, visibility: 'hidden' }} />
  
      {loading && <Spin style={{ display: 'block', marginTop: 16 }} />}
    </List>
  );
  
  
};
