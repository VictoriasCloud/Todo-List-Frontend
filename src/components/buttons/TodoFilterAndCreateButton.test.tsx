/// <reference types="vitest" />

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoFilterAndCreateButton } from './TodoFilterAndCreateButton';

const setFilter = vi.fn();

vi.mock('../../store/TodosStore', () => ({
  useTodosStore: () => ({
    filter: 'all',
    setFilter,
  }),
}));

describe('TodoFilterAndCreateButton', () => {
  it('показывает все кнопки фильтрации', () => {
    render(<TodoFilterAndCreateButton onAddClick={() => {}} />);

    expect(screen.getByText('Все')).toBeInTheDocument();
    expect(screen.getByText('Выполненные')).toBeInTheDocument();
    expect(screen.getByText('Не выполненные')).toBeInTheDocument();
    expect(screen.getByText('Избранное')).toBeInTheDocument();
  });

  it('вызывает setFilter при нажатии на кнопку фильтра "Выполненные"', () => {
    render(<TodoFilterAndCreateButton onAddClick={() => {}} />);

    fireEvent.click(screen.getByText('Выполненные'));
    expect(setFilter).toHaveBeenCalledWith('completed');
  });

  it('вызывает setFilter при нажатии на кнопку "Избранное"', () => {
    render(<TodoFilterAndCreateButton onAddClick={() => {}} />);

    fireEvent.click(screen.getByText('Избранное'));
    expect(setFilter).toHaveBeenCalledWith('favorites');
  });
});
