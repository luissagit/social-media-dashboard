import { Image, List, Modal, ModalProps, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { getData } from "../../../lib";

interface Props {
  modalProps?: ModalProps;
  user: any;
}

export function DetailAlbum(props: Props) {
  const { modalProps = {}, user } = props;
  const [loading, setLoading] = useState(false);
  const [albumOptions, setAlbumOptions] = useState([]);
  const [photos, setPhotos] = useState([]);

  async function generateDetailAlbum(user: any) {
    setPhotos([]);
    setLoading(true);
    const data = await getData({ url: `/albums` });
    const filteredData = data?.filter((item: any) => item?.userId === user?.id);
    const options = filteredData?.map((item: any) => {
      return {
        label: item?.title,
        value: item?.id,
      }
    })
    setAlbumOptions(options);
    setLoading(false);
  }

  async function handleGeneratePhoto(selected: any) {
    setLoading(true);
    setPhotos([]);
    const data = await getData({ url: `/photos` });
    const filteredData = data?.filter((item: any) => item?.albumId === selected);
    setPhotos(filteredData);
    setLoading(false);
  }

  useEffect(() => {
    generateDetailAlbum(user);
  }, [modalProps?.open]);

  return (
    <Modal {...modalProps} title={`Album ${user?.name}`} footer={[]} width={700} destroyOnClose>
      <Spin spinning={loading}>
        <Select onChange={handleGeneratePhoto} style={{ width: '100%' }} options={albumOptions} placeholder="Select Album" />
      </Spin>
      {photos?.length > 0 && (
         <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={photos}
            renderItem={(item: any) => (
              <List.Item>
                <Image
                  src={item?.url}
                  preview={{
                    src: item?.thumbnailUrl,
                  }}
                />
              </List.Item>
            )}
          />
      )}
    </Modal>
  );
}