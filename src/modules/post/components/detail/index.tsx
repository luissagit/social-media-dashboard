import { Avatar, Modal, ModalProps, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { getData, userState } from "../../../../lib";
import { useRecoilState } from "recoil";
import { Comment } from "../../../comment";

const { Title } = Typography;

interface Props {
  modalProps?: ModalProps;
  postId: any;
}

export function DetailPost(props: Props) {
  const { modalProps = {}, postId } = props;
  const [loading, setLoading] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);
  const [users] = useRecoilState(userState);

  async function generateDetailPost(postId: any) {
    setDetailData(null);
    if (modalProps?.open && postId) {
      setLoading(true);
      const data = await getData({
        url: `posts/${postId}`
      })
      const user = users?.find((item: any) => item?.id === data?.userId);
      setDetailData({...data, user})
      setLoading(false);
    }
  }

  useEffect(() => {
    generateDetailPost(postId);
  }, [modalProps?.open]);

  return (
    <Modal {...modalProps} footer={[]} width={700} destroyOnClose>
      <Spin spinning={loading}>
        <Title level={3} style={{ fontSize: '18px' }}>{(
          <div>
            <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${1}`} />
            <span style={{ marginLeft: '10px' }}>{detailData?.user?.name ?? ''}</span>
          </div>
        )}</Title>
        <Title level={4} style={{ fontSize: '16px' }}>{detailData?.title ?? ''}</Title>
        <p>{detailData?.body ?? ''}</p>
      </Spin>
      <Comment postId={postId} />
    </Modal>
  );
}