import React from 'react';
import { Form, Input } from 'antd';
import styles from './index.module.scss';
import SelectFolder from '../SelectFolder';

const isRequired = false;
const DefaultConfig: React.FC<{}> = () => {
  return (
    <>
      <Form.Item name='name' label={<span className={styles.formTitle} >项目名称</span>}
                 rules={[{ required: isRequired, message: '必填项' }]}
      >
        <Input placeholder='请输入项目名称，方便后续定位' />
      </Form.Item>
      <Form.Item
        name='path'
        label={<span className={styles.formTitle}>选择图片文件夹</span>}
        rules={[{ required: isRequired, message: '必填项' }]}
      >
        <SelectFolder key='path' />
      </Form.Item>
      <Form.Item
        name='resultPath'
        label={<span className={styles.formTitle}>选择结果文件夹</span>}
        rules={[{ required: isRequired, message: '必填项' }]}
      >
        <SelectFolder key='resultPath' />
      </Form.Item>
    </>
  );
};

export default DefaultConfig;
