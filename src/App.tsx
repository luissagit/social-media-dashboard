import { Col, Row } from 'antd'
import { Layout } from './components'
import { User } from './modules'

function App() {
  return (
    <Layout>
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
          <User />
        </Col>
      </Row>
    </Layout>
  )
}

export default App
