// import SenseInput from '@/components/customAntd/Input';
import { Form, FormInstance } from 'antd';
import React from 'react';
import { ETextType, EToolName } from '@/constant/store';
import TextList from './TextList';
import styles from '@/ProjectPlatform/CreateProjectModal/ToolConfig/index.module.scss';
import { useTranslation } from 'react-i18next';

interface IProps {
  toolName?: EToolName;
  form?: FormInstance;
}

export const defaultValue = {
  label: '文本',
  key: 'text',
  required: false,
  default: '',
  maxLength: 1000,
};
export type Config = typeof defaultValue;

const TextConfig = (props: IProps) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Form.Item
        label={<span className={styles.formTitle}>{t('TextList')}</span>}
        name='configList'
        initialValue={[{ ...defaultValue }]}
      >
        <TextList />
      </Form.Item>
    </React.Fragment>
  );
};

export default TextConfig;
