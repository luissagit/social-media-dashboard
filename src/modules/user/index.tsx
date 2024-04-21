import { Avatar, List as AntdList, Button, ModalProps } from "antd";
import { List } from "../../components";
import { useRecoilState } from "recoil";
import { userState } from "../../lib";
import { CameraOutlined } from "@ant-design/icons";
import { useState } from "react";
import { DetailAlbum } from "./album";

export function User() {
  const [, setUser] = useRecoilState<any>(userState);
  const [showDetailAlbum, setShowDetailAlbum] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  function onCancelModal(e?: any) {
    e.preventDefault();
    togglePost(false)
  }

  function togglePost(show: boolean) {
    setShowDetailAlbum(show);
  }
  
  const modalProps: ModalProps = {
    open: showDetailAlbum,
    onCancel: onCancelModal,
  }

  return (
    <>
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
            <div style={{ display: 'flex', width: '100%' }}>
              <AntdList.Item.Meta
                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                title={data?.name}
              />
              <Button
                size="small"
                onClick={() => {
                  setSelectedUser(data)
                  togglePost(true)
                }}
                icon={<CameraOutlined />}
              />
            </div>
          );
        }}
      />
      <DetailAlbum modalProps={modalProps} user={selectedUser} />
    </>
  );
}