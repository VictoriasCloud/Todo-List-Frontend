import { motion } from 'framer-motion';
import { useState } from 'react';

const letters = 'Todo List'.split('');

//Компонент анимирует каждую букву "Todo List" в хэдере при перезагрузке страницы и при клике
//Анимация букв запускается по очереди (эффект постукивания) с помощью delay на каждый символ.
//transition={{ delay: index * 0.1, -поочерёдное воспроизведение анимации
//При клике на букву счётчик обновляется, что заставляет React пересоздать элементы и повторить анимацию.


export const AnimatedTitle = () => {
  const [trigger, setTrigger] = useState(0);

  return (
    <div
      style={{ display: 'flex', gap: 2, cursor: 'pointer' }}
      onClick={() => setTrigger(prev => prev + 1)}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${trigger}-${index}`}
          initial={{ y: 0 }}
          animate={{ y: [-8, 0] }}
          transition={{
            delay: index * 0.1,
            duration: 0.4,
            type: 'spring',
            stiffness: 300,
          }}
          style={{
            display: 'inline-block',
            fontSize: 24,
            color: 'white',
            fontWeight: 500,
            userSelect: 'none',
          }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};
