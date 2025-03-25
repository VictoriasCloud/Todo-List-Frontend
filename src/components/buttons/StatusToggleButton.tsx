import { Button } from 'antd';
import { CheckCircleOutlined, ReloadOutlined } from '@ant-design/icons';

interface Props {
  status: 'active' | 'done';
  onToggle: () => void;
}

export const StatusToggleButton = ({ status, onToggle }: Props) => {
  const isDone = status === 'done';

  return (
    <Button
      type="default"
      size="small"
      icon={isDone ? <ReloadOutlined /> : <CheckCircleOutlined />}
      onClick={onToggle}
      aria-label={isDone ? 'Вернуть задачу' : 'Завершить задачу'}
    >
      {isDone ? 'Вернуть' : 'Завершить'}
    </Button>
  );
};
