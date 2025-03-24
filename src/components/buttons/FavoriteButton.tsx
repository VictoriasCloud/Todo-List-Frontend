import { Button } from 'antd';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

interface Props {
  isFavorite: boolean;
  onToggle: () => void;
}

export const FavoriteButton = ({ isFavorite, onToggle }: Props) => (
  <Button
    type="text"
    onClick={onToggle}
    icon={
      <motion.span
        initial={false}
        animate={isFavorite ? 'animate' : 'initial'}
        variants={{
          initial: { scale: 1, rotate: 0, opacity: 1 },
          animate: {
            scale: [1.3, 1.3, 1],
            rotate: [0, 18, -10, 0],
            opacity: [0.6, 1],
            transition: { duration: 0.6, ease: 'easeInOut' },
          },
        }}
        style={{
          display: 'inline-block',
          color: isFavorite ? '#fadb14' : 'inherit',
        }}
      >
        <FaStar
          size={14}
          style={{
            fill: isFavorite ? '#fadb14' : 'none',
            stroke: 'black',
            strokeWidth: 40,
          }}
        />
      </motion.span>
    }
  />
);
