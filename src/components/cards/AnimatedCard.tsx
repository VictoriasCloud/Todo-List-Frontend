import { motion } from 'framer-motion';
import { Card } from 'antd';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  title?: ReactNode;
  extra?: ReactNode;
  children: ReactNode;
}

const cardVariants = {
  initial: {
    scale: 1,
    boxShadow: '0 0 0 rgba(0,0,0,0)',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  hover: {
    scale: 1.01,
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

export const AnimatedCard = ({ title, extra, children }: AnimatedCardProps) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      style={{ width: '100%', marginBottom: 16, borderRadius: 8 }}
    >
      <Card
        style={{ width: '100%', borderRadius: 8 }}
        title={title}
        extra={extra}
      >
        {children}
      </Card>
    </motion.div>
  );
};
