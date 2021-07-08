import React from 'react';
import { Form, Input } from 'antd';
import SelectFolder from './SelectFolder';

const RectConfig: React.FC<{}> = () => {
  return (
    <div>
      <Form layout="vertical">
        <Form.Item name="name" label='项目名称'>
          <Input placeholder='input placeholder' />
        </Form.Item>
        <Form.Item label='选择图片文件夹'>
          <SelectFolder />
        </Form.Item>
      </Form>
    </div>
  );
};

export default RectConfig;
