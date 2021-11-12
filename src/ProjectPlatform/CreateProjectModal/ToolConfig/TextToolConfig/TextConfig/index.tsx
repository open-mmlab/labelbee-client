// cl 2021/9/8 14:17
import React from 'react';
import { Form, FormInstance, InputNumber, Input } from 'antd';
import { ItextConfig } from '../TextList';
import { useTranslation } from 'react-i18next';
const { TextArea } = Input;

interface IProps {
  form: FormInstance;
}

const Index: React.FC<IProps & ItextConfig> = ({
  label,
  maxLength,
  default: defaultValue,
  form,
}) => {
  const { t } = useTranslation();
  return (
    <Form
      preserve={false}
      layout='horizontal'
      labelAlign='left'
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
    >
      <Form.Item label={t('Name')}>{label}</Form.Item>
      <Form.Item
        label={t('Maximum Text Input')}
        name='maxLength'
        rules={[{ required: true, message: t('Reqired') }]}
        initialValue={maxLength}
      >
        <InputNumber min={1} max={1000} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {() => {
          const len = form.getFieldValue('maxLength');
          return (
            <Form.Item
              label={t('DefaultText')}
              initialValue={defaultValue}
              name='default'
              rules={[{ max: len, message: t('DefaultTextCharactersLimitNotify', { len }) }]}
            >
              <TextArea maxLength={len} showCount />
            </Form.Item>
          );
        }}
      </Form.Item>
    </Form>
  );
};

export default Index;
