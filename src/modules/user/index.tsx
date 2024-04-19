import { Avatar, List as AntdList } from "antd";
import { List } from "../../components";

export function User() {
  return (
    <List
      listProps={{
        style: {
          maxHeight: '350px',
          overflowY: 'auto'
        }
      }}
      modulConfiguration={{
        title: 'User',
        apiUrl: 'users',
      }}
      renderContent={({ data, index }) => {
        return (
          <AntdList.Item.Meta
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={data?.name}
          />
        );
      }}
    />
  );
}