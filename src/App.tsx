import { ConfigProvider, Layout, theme } from 'antd';
import { TodoPage } from './pages/TodoPage';
import { AppHeader } from './components/headers/AppHeader';

const { Content } = Layout;

function App() {
  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <Layout style={{ minHeight: '100vh' }}>
        <AppHeader />
        <Content style={{ padding: '24px 0' }}>
          <TodoPage />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
