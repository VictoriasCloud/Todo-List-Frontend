/// <reference types="vitest" />
import confetti from 'canvas-confetti';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from './TodoItem';
import { describe, it, expect, vi } from 'vitest';

// Мок-функции для управления состоянием
const toggleFavorite = vi.fn();
const deleteTodo = vi.fn();
const updateTodo = vi.fn();

vi.mock('canvas-confetti', () => ({
  default: vi.fn(), //заглушка чтобы не зависеть от библиотеки
}));

const todo = {
  id: 1,
  title: 'Test Todo',
  description: 'Some description',
  status: 'active',
};

vi.mock('../store/TodosStore', () => ({
  useTodosStore: () => ({
    favorites: [],
    toggleFavorite,
    deleteTodo,
    updateTodo,
  }),
}));

describe('TodoItem', () => {
  it('отображает заголовок и описание задачи', () => {
    render(<TodoItem todo={todo} />);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Some description')).toBeInTheDocument();
  });

  it('отображает поле редактирования при клике на иконку редактирования', () => {
    render(<TodoItem todo={todo} />);
    fireEvent.click(screen.getByLabelText(/edit/i));
    expect(screen.getByPlaceholderText(/заголовок/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/описание/i)).toBeInTheDocument();
  });

  it('вызывает deleteTodo при удалении', () => {
    render(<TodoItem todo={todo} />);
    fireEvent.click(screen.getByLabelText(/delete/i));
    expect(deleteTodo).toHaveBeenCalledWith(todo.id);
  });

  it('переключает статус задачи с активной на завершенную вызывая updateTodo при нажатии на кнопку "Завершить"', () => {
    render(<TodoItem todo={todo} />);
    fireEvent.click(screen.getByLabelText(/завершить задачу/i));
    expect(updateTodo).toHaveBeenCalledWith(todo.id, { status: 'done' });
  });

  it('переключает статус задачи с завершенной на активную вызывая updateTodo при нажатии на кнопку "Вернуть"', () => {
    render(<TodoItem todo={{ ...todo, status: 'done' }} />);
    fireEvent.click(screen.getByRole('button', { name: /вернуть/i }));
    expect(updateTodo).toHaveBeenCalledWith(todo.id, { status: 'active' });
  });
  
  it('вызывает конфетти при завершении задачи', () => {
    render(<TodoItem todo={todo} />);
    fireEvent.click(screen.getByRole('button', { name: /завершить/i }));
    expect(confetti).toHaveBeenCalled();
  });
});
