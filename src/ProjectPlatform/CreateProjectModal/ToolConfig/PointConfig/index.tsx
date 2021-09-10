// import SenseInput from '@/components/customAntd/Input';
import { Switch, InputNumber, Form, FormInstance } from 'antd';
import React from 'react';
import styles from '../index.module.scss';
import { MapStateJSONTab } from '@/ProjectPlatform/CreateProjectModal/ToolConfig/RectConfig/AttributeConfig';
import TextConfigurable from '../TextConfigurable';
import { ETextType, EToolName } from '@/constant/store';
import { onfiguration } from '../publicConfig';

interface IProps {
  toolName?: EToolName;
  form?: FormInstance;
}

const isAllReadOnly = false;

const PointConfig = (props: IProps) => {
  return (
    <React.Fragment>
      <Form.Item
        name="upperLimit"
        initialValue={null}
        label={<span className={styles.formTitle}>上限点数</span>}
      >
        <InputNumber min={1} />
      </Form.Item>
      {onfiguration.map((info, index) => (
        <Form.Item
          label={<span className={styles.formTitle}>{info.name}</span>}
          valuePropName='checked'
          key={info.key} name={info.key} initialValue={info.value}>
          <Switch />
        </Form.Item>
      ))}
      <Form.Item
        label={<span className={styles.formTitle}>文本标注</span>}
        name='textConfigurableContext'
        initialValue={{
          textConfigurable: false,
          textCheckType: ETextType.AnyString,
          customFormat: '',
        }}>
        <TextConfigurable />
      </Form.Item>
      <Form.Item valuePropName='checked'
                 label={<span className={styles.formTitle}>属性标注</span>}
                 name='attributeConfigurable'
                 initialValue={false}
      >
        <Switch disabled={isAllReadOnly} />
      </Form.Item>

      <Form.Item noStyle shouldUpdate>
        {() => {
          return props.form?.getFieldValue('attributeConfigurable') && (
            <Form.Item label=" " name='attributeList' initialValue={[{
              key: '类别1',
              value: '类别1',
            }]}>
              <MapStateJSONTab
                isAttributeList={true}
                readonly={isAllReadOnly}
              />
            </Form.Item>);
        }}
      </Form.Item>
    </React.Fragment>
  );
};

export default PointConfig;
