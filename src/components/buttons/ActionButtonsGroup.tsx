import { Space } from 'antd';
import { FavoriteButton } from './FavoriteButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface Props {
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const ActionButtonsGroup = ({
  isFavorite,
  onToggleFavorite,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <Space>
      <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
      <Button type="text" icon={<EditOutlined />} onClick={onEdit} />
      <Button type="text" icon={<DeleteOutlined />} danger onClick={onDelete} />
    </Space>
  );
};
