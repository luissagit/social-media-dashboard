import { List as AntdList, Button, Card, CardProps, ListProps } from "antd";
import { useEffect, useState } from "react";
import { ModulEntity } from "../../entities";
import { getData } from "../../lib";
import { UndoOutlined, SyncOutlined } from '@ant-design/icons';

interface RenderContentProps {
  data: any;
  index: number;
}

interface Props {
  listProps?: ListProps<any>;
  cardProps?: CardProps;
  renderContent(props: RenderContentProps): any;
  modulConfiguration: ModulEntity;
}

export function List(props: Props) {
  const { listProps = {}, renderContent, modulConfiguration, cardProps = {} } = props;
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
    <Card
      size="small"
      title={modulConfiguration?.title}
      extra={(
        <Button icon={loading ? <SyncOutlined spin /> : <UndoOutlined />}
          size="small"
          shape="circle"
          onClick={generateData}
        />
      )}
      {...cardProps}
    >
      <AntdList
        size="small"
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
    </Card>
  );
}