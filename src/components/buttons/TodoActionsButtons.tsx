import { Button, Space } from 'antd';

interface Props {
  onSave: () => void;
  onCancel: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const TodoActionsButtons = ({ onSave, onCancel, loading, disabled }: Props) => {
  return (
    <Space>
      <Button
        type="default"
        onClick={onSave}
        loading={loading}
        disabled={disabled}
      >
        Сохранить
      </Button>
      <Button
        type="default"
        onClick={onCancel}
        disabled={loading}
      >
        Отмена
      </Button>
    </Space>
  );
};
