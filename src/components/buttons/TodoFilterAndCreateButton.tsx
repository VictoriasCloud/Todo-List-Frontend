import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTodosStore } from '../../store/TodosStore';
import type { FilterType } from '../../store/TodosStore'; 



interface Props {
  onAddClick: () => void;
}

export const TodoFilterAndCreateButton = ({ onAddClick }: Props) => {
  const { filter, setFilter } = useTodosStore();

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'Все' },
    { value: 'completed', label: 'Выполненные' },
    { value: 'incomplete', label: 'Не выполненные' },
    { value: 'favorites', label: 'Избранное' },
  ];
  

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
      }}
    >
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {filters.map(({ value, label }) => (
          <Button
            key={value}
            type="default"
            onClick={() => setFilter(value as FilterType)}

            style={{
              borderRadius: 8,
              backgroundColor: 'white',
              borderColor: filter === value ? '#1677ff' : '#d9d9d9',
              color: filter === value ? '#1677ff' : 'inherit',
            }}
          >
            {label}
          </Button>
        ))}
      </div>

      <Button
        type="default"
        icon={<PlusOutlined />}
        onClick={onAddClick}
      >
        Новая задача
      </Button>
    </div>
  );
};
