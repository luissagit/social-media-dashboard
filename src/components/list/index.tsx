import { List as AntdList, Button, Card, CardProps, Form, ListProps, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { ModulEntity } from "../../entities";
import { deleteData, getData, postData } from "../../lib";
import { UndoOutlined, SyncOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';

interface RenderContentProps {
  data: any;
  index: number;
}

interface Props {
  listProps?: ListProps<any>;
  cardProps?: CardProps;
  renderContent(props: RenderContentProps): any;
  modulConfiguration: ModulEntity;
  callbackData?(data: any[]): any;
  transformData?(data: any[]): any[];
  renderForm?(): any;
  showCreate?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
}

export function List(props: Props) {
  const { listProps = {}, renderContent, modulConfiguration, cardProps = {}, callbackData, transformData, renderForm, showCreate = false, showEdit = false, showDelete = false } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [dataForm, setDataForm] = useState<any>(null);

  const [form] = Form.useForm();

  async function generateData() {
    setLoading(true);
    const data = await getData({ url: `${modulConfiguration.apiUrl}${modulConfiguration?.params ? `?${modulConfiguration?.params}` : ''}` })
    const transformedData = transformData ? transformData(data) : data;
    setData(transformedData);
    if (callbackData) callbackData(data);
    setLoading(false);
  }

  async function onSubmit(payload: any) {
    setLoadingSave(true);
    await postData({ url: `${modulConfiguration?.apiUrl}${payload?.id ? `/${payload?.id}` : ''}`, body: payload, method: payload?.id ? 'put' : 'post' });
    handleCloseForm();
    generateData();
    setLoadingSave(false);
  }

  async function handleDelete(payload: any) {
    setLoading(true);
    await deleteData({ url: modulConfiguration.apiUrl, id: payload?.id });
    generateData();
  }

  function handleEdit(data: any) {
    setShowForm(true);
    setDataForm(data);
    form.setFieldsValue(data);
  }

  function handleCloseForm() {
    form.resetFields();
    setDataForm(null);
    setShowForm(false);
  }

  function handleCreate() {
    setShowForm(true);
    setDataForm(null);
    form.resetFields();
  }

  useEffect(() => {
    generateData();
  }, []);

  return (
    <Card
      size="small"
      title={modulConfiguration?.title}
      extra={(
        <div>
          {showCreate && !showForm && (
            <Tooltip title={`${dataForm?.id ? 'Edit' : 'Create'} ${modulConfiguration?.title ?? ''}`}>
              <Button icon={<FormOutlined />}
                size="small"
                shape="circle"
                onClick={handleCreate}
              />
            </Tooltip>
          )}
          <Button icon={loading ? <SyncOutlined spin /> : <UndoOutlined />}
            size="small"
            shape="circle"
            onClick={generateData}
            style={{ marginLeft: '10px' }}
          />
        </div>
      )}
      {...cardProps}
    >
      {showForm && (
        <Card
          size="small"
          title={`${dataForm?.id ? 'Edit' : 'Create'} ${modulConfiguration?.title ?? ''}`}
          extra={(
            <div>
              <Button size="small" onClick={form.submit} style={{ marginRight: '6px' }} loading={loadingSave}>Save</Button>
              <Button size="small" onClick={handleCloseForm} disabled={loadingSave}>Close</Button>
            </div>
          )}>
          <Form form={form} onFinish={onSubmit} layout="vertical">
            {renderForm ? renderForm() : <></>}
            <Form.Item name="id" noStyle />
          </Form>
        </Card>
      )}
      <AntdList
        size="small"
        loading={loading}
        itemLayout="horizontal"
        dataSource={data}
        {...listProps}
        renderItem={(data, index) => (
          <AntdList.Item>
            <div style={{ display: 'flex', width: '100%' }}>
              {renderContent({ data, index })}
              {showDelete && <Button size="small" style={{ marginRight: '6px' }} icon={<DeleteOutlined />} onClick={() => handleDelete(data)} />}
              {showEdit && <Button size="small" icon={<FormOutlined />} onClick={() => handleEdit(data)} />}
            </div>
          </AntdList.Item>
        )}
      />
    </Card>
  );
}