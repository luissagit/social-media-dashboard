import { Col, Row } from 'antd'
import { Layout } from './components'
import { Post, User } from './modules'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <RecoilRoot>
      <Layout>
        <Row gutter={[8, 8]} style={{ maxWidth: 1600, margin: '0 auto' }}>
          <Col xs={24} sm={24} md={8} lg={8} xl={6} xxl={5}>
            <User />
          </Col>
          <Col xs={24} sm={24} md={16} lg={16} xl={12} xxl={12}>
            <Post />
          </Col>
        </Row>
      </Layout>
    </RecoilRoot>
  )
}

export default App
