import { Avatar, List as AntdList } from "antd";
import { List } from "../../components";
import { useRecoilState } from "recoil";
import { userState } from "../../lib";

export function User() {
  const [, setUser] = useRecoilState<any>(userState);
  return (
    <List
      listProps={{
        style: {
          maxHeight: '75vh',
          overflowY: 'auto'
        },
      }}
      callbackData={(data) => setUser(data)}
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