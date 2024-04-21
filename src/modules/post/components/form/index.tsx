import { Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../../lib";

export function FormPost() {
  const [userOptions, setUserOptions] = useState<any[]>([]);
  const [users] = useRecoilState(userState);

  function generateUserOptions(users: any[]) {
    const options = users?.map((item: any) => {
      return {
        value: item?.id,
        label: item?.name,
      }
    })
    setUserOptions(options);
  }

  useEffect(() => {
    generateUserOptions(users);
  }, [users]);

  return (
    <div>
      <Form.Item name="title" label="Title" rules={[{ required: true }]} style={{ margin: 0 }}>
        <Input />
      </Form.Item>
      <Form.Item name="userId" label="User" style={{ margin: 0 }} rules={[{ required: true }]}>
        <Select options={userOptions} />
      </Form.Item>
      <Form.Item name="body" label="Content" rules={[{ required: true }]} style={{ margin: 0 }}>
        <Input.TextArea rows={3} />
      </Form.Item>
    </div>
  );
}