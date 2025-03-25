// В этом тесте мы не используем реальные запросы к API, дабы сделать тесты  независимыми от сервера.
// Вместо этого мы мокируем(подделываем) методы API, чтобы проверять только логику хранилища задач (TodosStore)
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TodosApi } from '../api/TodosApi';
import { useTodosStore } from './TodosStore';

vi.mock('../api/TodosApi');

describe('TodosStore', () => {
  beforeEach(() => {
    useTodosStore.setState({
      Todos: [],
    });
  });

  it('добавляет новую задачу', async () => {
    const mockedTodo = {
      id: 123,
      title: 'Новая задача',
      description: 'Описание задачи',
      status: 'active',
    };

    (TodosApi.createTodo as any).mockResolvedValue({
      data: { data: { id: mockedTodo.id, attributes: mockedTodo } },
    });


    //
    // 1. Получаем старое состояние
    const store = useTodosStore.getState();
    // 2. Добавляем новую задачу
    await store.addTodo({
      title: mockedTodo.title,
      description: mockedTodo.description,
      status: mockedTodo.status,
    });
    //3. Получаем новое состояние 
    const newState = useTodosStore.getState(); 
    // 4. Проверяем, что задача добавлена
    const added = newState.Todos.find((t) => t.id === mockedTodo.id);
    expect(added).toBeDefined();
    expect(added?.title).toBe('Новая задача');
    expect(added?.description).toBe('Описание задачи');
  });
});
