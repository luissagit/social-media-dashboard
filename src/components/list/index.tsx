import { List as AntdList, Button, ListProps, Typography } from "antd";
import { useEffect, useState } from "react";
import { ModulEntity } from "../../entities";
import { getData } from "../../lib";
import { UndoOutlined, SyncOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface RenderContentProps {
  data: any;
  index: number;
}

interface Props {
  listProps?: ListProps<any>;
  renderContent(props: RenderContentProps): any;
  modulConfiguration: ModulEntity;
}

export function List(props: Props) {
  const { listProps = {}, renderContent, modulConfiguration } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function generateData() {
    setLoading(true);
    const data = await getData({ url: modulConfiguration.apiUrl })
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    generateData();
  }, []);

  return (
    <AntdList
      header={(
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Title level={2} style={{ fontSize: '14px' }}>{modulConfiguration?.title}</Title>
          <Button icon={loading ? <SyncOutlined spin /> : <UndoOutlined />} size="small" shape="circle" onClick={generateData}></Button>
        </div>
      )}
      loading={loading}
      itemLayout="horizontal"
      dataSource={data}
      {...listProps}
      renderItem={(data, index) => (
        <AntdList.Item>
          {renderContent({ data, index })}
        </AntdList.Item>
      )}
    />
  );
}