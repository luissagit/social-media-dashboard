import { Layout as AntdLayout, Typography } from "antd";

const { Header, Content } = AntdLayout;
const { Title } = Typography;

interface Props {
  children: React.ReactNode;
}

export function Layout(props: Props) {
  const { children } = props;

  return (
    <AntdLayout>
      <Header style={{ position: 'fixed', width: '100vw' }}>
        <Title style={{ fontSize: '24px', color: 'white' }}>Social Media Dashboard</Title>
      </Header>
      <Content style={{ minHeight: '100vh', padding: '85px 20px 20px 20px' }}>
        {children}
      </Content>
    </AntdLayout>
  );
}