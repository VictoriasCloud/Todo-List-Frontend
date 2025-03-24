import { Layout } from 'antd';
import { AnimatedTitle } from './AnimatedTitle';

const { Header } = Layout;

export const AppHeader = () => {
  return (
    <Header
      style={{
        color: 'white',
        fontSize: 24,
        display: 'flex',
        alignItems: 'center',
        height: 64,
      }}
    >
      <AnimatedTitle />
    </Header>
  );
};
