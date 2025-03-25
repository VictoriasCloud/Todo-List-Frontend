import { create } from 'zustand';
import { Todo } from '../types/todo';
import { TodosApi } from '../api/TodosApi';

export type FilterType = 'all' | 'completed' | 'incomplete' | 'favorites';

interface TodosStore {
  Todos: Todo[];
  favorites: number[];
  filter: FilterType;
  page: number;
  hasMore: boolean;
  loading: boolean;

  setFilter: (filter: FilterType) => void;
  toggleFavorite: (id: number) => void;
  loadTodos: (reset?: boolean) => Promise<void>;
  addTodo: (Todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  updateTodo: (id: number, data: Partial<Todo>) => Promise<void>;
}

const FAVORITES_KEY = 'favoriteTodos';

export const useTodosStore = create<TodosStore>((set, get) => ({
  Todos: [],
  favorites: JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]'),
  filter: 'all',
  page: 1,
  hasMore: true,
  loading: false,

  setFilter: (filter) => {
    set({ filter, page: 1, Todos: [], hasMore: true });
    get().loadTodos(true);
  },

  toggleFavorite: (id) => {
    const current = get().favorites;
    const updated = current.includes(id)
      ? current.filter((favId) => favId !== id)
      : [...current, id];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    set({ favorites: updated });
  },

  loadTodos: async (reset = false) => {
    if (get().loading || (!reset && !get().hasMore)) return;

    set({ loading: true });

    const nextPage = reset ? 1 : get().page;
    const pageSize = 10;

    try {
      const response = await TodosApi.getTodos({
        'pagination[page]': nextPage,
        'pagination[pageSize]': pageSize,
        'pagination[withCount]': true,
      });

      const newTodos = response.data.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
      }));

      set((state) => ({
        Todos: reset ? newTodos : [...state.Todos, ...newTodos],
        page: nextPage + 1,
        hasMore: newTodos.length === pageSize,
      }));
    } catch (error) {
      console.error('Ошибка загрузки задач:', error);
    } finally {
      set({ loading: false });
    }
  },

  addTodo: async (TodoData) => {
    try {
      const response = await TodosApi.createTodo(TodoData);
      const Todo = {
        id: response.data.data.id,
        ...response.data.data.attributes,
      };
      set((state) => ({ Todos: [Todo, ...state.Todos] }));
    } catch (error) {
      console.error('Ошибка добавления задачи:', error);
    }
  },

  deleteTodo: async (id) => {
    try {
      await TodosApi.deleteTodo(id);
      set((state) => ({
        Todos: state.Todos.filter((t) => t.id !== id),
      }));
    } catch (error) {
      console.error('Ошибка удаления задачи:', error);
    }
  },

  updateTodo: async (id, data) => {
    try {
      await TodosApi.updateTodo(id, data);
      set((state) => ({
        Todos: state.Todos.map((t) => (t.id === id ? { ...t, ...data } : t)),
      }));
    } catch (error) {
      console.error('Ошибка обновления задачи:', error);
    }
  },
}));
