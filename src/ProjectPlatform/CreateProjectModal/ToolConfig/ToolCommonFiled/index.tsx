// cl 2021/10/14 16:03
import React from 'react';
import { toolCommonField } from '../publicConfig';
import { Form, Switch } from 'antd';
import styles from '@/ProjectPlatform/CreateProjectModal/ToolConfig/index.module.scss';

interface IProps {
  copyBackwardResultDisabled: boolean;
}

const ToolCommonFiled: React.FC<IProps> = ({ copyBackwardResultDisabled }) => {
  return <>
    {
      toolCommonField.map((info, index) => (
        <Form.Item
          label={<span className={styles.formTitle}>{info.name}</span>}
          valuePropName='checked'
          key={info.key} name={info.key} initialValue={info.value}>
          <Switch disabled={info.key === 'copyBackwardResult' && copyBackwardResultDisabled} />
        </Form.Item>
      ))
    }
  </>;
};

export default ToolCommonFiled;