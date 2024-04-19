import { Layout, List } from './components'

function App() {
  return (
    <Layout>
      <List
        modulConfiguration={{
          title: 'User',
          apiUrl: 'users',
        }}
        renderContent={({ data, index }) => {
          return (
            <div key={index}>
              {data?.name ?? '-'}
            </div>
          );
        }}
      />
    </Layout>
  )
}

export default App
