import { List as AntdList, Form, Input, Typography } from "antd";
import { List } from "../../components";

const { Title } = Typography;

interface Props {
  postId?: any;
}

export function Comment(props: Props) {
  const { postId } = props;
  return (
    <List
      showCreate={true}
      showEdit={true}
      showDelete={true}
      listProps={{
        style: {
          maxHeight: '40vh',
          overflowY: 'auto'
        },
      }}
      modulConfiguration={{
        title: 'Comment',
        apiUrl: `comments`,
        params: `postId=${postId}`,
      }}
      renderForm={() => {
        return (
          <div>
            <Form.Item name="name" label="Name" rules={[{ required: true }]} style={{ margin: 0 }}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true }, { type: 'email' }]} style={{ margin: 0 }}>
              <Input />
            </Form.Item>
            <Form.Item name="body" label="Content" rules={[{ required: true }]} style={{ margin: 0 }}>
              <Input.TextArea />
            </Form.Item>
          </div>
        );
      }}
      renderContent={({ data }) => {
        return (
          <AntdList.Item.Meta
            title={data?.name ?? ''}
            description={(
              <div>
                  <Title level={5} style={{ fontSize: '13px', padding: 0, margin: 0 }}>{data?.email ?? ''}</Title>
                  <p style={{ padding: 0, margin: 0 }}>{data?.body ?? ''}</p>
              </div>
            )}
          />
        );
      }}
    />
  );
}