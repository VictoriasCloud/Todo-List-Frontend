import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AddTodoCard } from './AddTodoCard';

const addTodo = vi.fn(() => Promise.resolve());
const onCancel = vi.fn();

vi.mock('../../store/TodosStore', () => ({
  useTodosStore: () => ({ addTodo }),
}));

describe('AddTodoCard', () => {
    it('создаёт задачу c заполнении полей при клике по кнопке "Сохранить"', async () => {
      render(<AddTodoCard onCancel={onCancel} />);
  
      const titleInput = screen.getByPlaceholderText(/заголовок/i);
      const descInput = screen.getByPlaceholderText(/описание/i);
      const saveButton = screen.getByRole('button', { name: /сохранить/i });
  
      // До ввода: кнопка должна быть disabled
      expect(saveButton).toBeDisabled();
  
      fireEvent.change(titleInput, { target: { value: 'Новая таска' } });
      fireEvent.change(descInput, { target: { value: 'Описание' } });
  
      // Проверяем, что кнопка активна(доступна для нажатия)
      expect(saveButton).not.toBeDisabled();
  
      fireEvent.click(saveButton);
  
      // И наконец проверяем, что задача добавлена !и модальное окно закрыто!. делаем await потому что может задержка при отрисовке
      await vi.waitFor(() => {
        expect(addTodo).toHaveBeenCalledWith({
          title: 'Новая таска',
          description: 'Описание',
          status: 'active',
        });
        expect(onCancel).toHaveBeenCalled();
      });
    });
  });
  
