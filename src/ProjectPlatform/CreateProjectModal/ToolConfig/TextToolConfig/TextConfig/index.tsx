// cl 2021/9/8 14:17
import React from 'react';
import { Form, FormInstance, InputNumber, Input } from 'antd';
import { ItextConfig } from '../TextList';
const { TextArea } = Input;

interface IProps {
  form: FormInstance;
}

const Index: React.FC<IProps & ItextConfig> = ({ label, maxLength, default: defaultValue, form }) => {
  return (
    <Form
      preserve={false}
      layout='horizontal'
      labelAlign='left'
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}>
      <Form.Item label='名称'>{label}</Form.Item>
      <Form.Item
        label='文本输入上限'
        name='maxLength'
        rules={[{ required: true, message: '必填项' }]}
        initialValue={maxLength}
      >
        <InputNumber
          min={1} max={1000}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate
      >
        {() => {
          const len = form.getFieldValue('maxLength')
          return (
            <Form.Item label='文本默认值'
                       initialValue={defaultValue}
                       name='default'
                       rules={[{max: len, message: `请输入不超过 ${len} 个字的文本默认值`}]}
            >
              <TextArea
                maxLength={len}
                showCount
              />
            </Form.Item>
          );
        }}
      </Form.Item>
    </Form>
  );
};

export default Index;