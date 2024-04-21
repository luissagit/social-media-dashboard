import { Avatar, List as AntdList, ModalProps, Typography } from "antd";
import { List } from "../../components";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DetailPost, FormPost } from "./components";
import { useRecoilState } from "recoil";
import { userState } from "../../lib";

const { Title } = Typography;

export function Post() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showDetailPost, setShowDetailPost] = useState(false);
  const [users] = useRecoilState(userState);
  
  const postId = searchParams.get('post_id');
  function togglePost(show: boolean) {
    setShowDetailPost(show);
  }
  function onCancelModal(e?: any) {
    e.preventDefault();
    setSearchParams(undefined);
  }
  
  const modalProps: ModalProps = {
    open: showDetailPost,
    onCancel: onCancelModal,
  }
  
  async function generateDetailPost(postId: any) {
    if (postId) {
      togglePost(true);
    } else {
      togglePost(false);
    }
  }

  useEffect(() => {
    generateDetailPost(postId);
  }, [postId]);

  return (
    <div>
      <List
        listProps={{
          style: {
            maxHeight: '75vh',
            overflowY: 'auto'
          }
        }}
        modulConfiguration={{
          title: 'Post',
          apiUrl: 'posts',
        }}
        renderForm={() => <FormPost />}
        showCreate={true}
        showEdit={true}
        showDelete={true}
        renderContent={({ data, index }) => {
          const user: any = users?.find((item: any) => item?.id === data?.userId);
          return (
            <Link to={`/dashboard?post_id=${data?.id}`} style={{ width: '100%' }}>
              <AntdList.Item.Meta
                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                title={user?.name ?? ''}
                description={(
                  <div>
                    <Title level={4} style={{ fontSize: '16px', padding: 0, margin: 0 }}>{data?.title ?? ''}</Title>
                    <p style={{ padding: 0, margin: 0 }}>{data?.body ?? ''}</p>
                  </div>
                )}
              />
            </Link>
          );
        }}
      />
      <DetailPost modalProps={modalProps} postId={postId} />
    </div>
  );
}