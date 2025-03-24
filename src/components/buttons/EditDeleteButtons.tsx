import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export const EditDeleteButtons = ({ onEdit, onDelete }: Props) => (
  <>
    <Button type="text" icon={<EditOutlined />} onClick={onEdit} />
    <Button type="text" icon={<DeleteOutlined />} danger onClick={onDelete} />
  </>
);
