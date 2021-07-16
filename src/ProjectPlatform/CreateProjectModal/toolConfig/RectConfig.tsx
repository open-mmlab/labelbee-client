import React from 'react';
import { Form, Input } from 'antd';
import SelectFolder from '../SelectFolder';

const RectConfig: React.FC<{}> = () => {
  return (
    <>
      <Form.Item name='name' label='项目名称'>
        <Input placeholder='input placeholder' />
      </Form.Item>
      <Form.Item name="path" label='选择图片文件夹'>
        <SelectFolder  key='path'/>
      </Form.Item>
      <Form.Item name="resultPath" label='选择结果文件夹'>
        <SelectFolder key='resultPath' />
      </Form.Item>
    </>
  );
};


export default RectConfig;
