// import SenseInput from '@/components/customAntd/Input';
import { Col, Row, Switch, Input as SenseInput, Form, FormInstance } from 'antd';
import React from 'react';
import styles from '../index.module.scss';
import { MapStateJSONTab } from './attributeConfig';
import TextConfigurable from './textConfigurable';
import { ETextType, EToolName } from '@/constant/store';

function checkNumber(v: string) {
  const reg = /^[1-9]\d*$/g;
  if (reg.test(v)) {
    return true;
  }
  return false;
}

export const rectScopeChange = (value: string) => {
  if (value) {
    return  undefined;
  }
  if (!checkNumber(value)) {
    return;
  }
  return ~~value
};

interface IProps {
  toolName?: EToolName;
  form?: FormInstance;
}

const drawOutsideTarget = false;
const copyBackwardResult = false;
const isShowOrder = false;
const minWidth = 1, minHeight = 1;
const isAllReadOnly = false;

const index = [
  {
    name: '目标外标注',
    key: 'drawOutsideTarget',
    value: drawOutsideTarget,
  },
  {
    name: '复制上一张结果',
    key: 'copyBackwardResult',
    value: copyBackwardResult,
  },
  {
    name: '显示拉框顺序',
    key: 'isShowOrder',
    value: isShowOrder,
  }
];

const RectConfig = (props: IProps) => {
  const attributeConfigurableChange = (val: boolean) => {
    props.form?.setFieldsValue({attributeList: val ? [{
        key: '类别1',
        value: '类别1',
      }] : null})
  }
  return (
    <React.Fragment>
      <div className={styles.selectedMain}>
        <Row>
          <Col span={6}><div className={styles.selectedName}>最小尺寸</div></Col>
          <Col span={8}>
            <Form.Item name="minWidth" initialValue={minWidth}>
              <SenseInput type='text' suffix={<div>W</div>} disabled={isAllReadOnly} />
            </Form.Item>
          </Col>
          <Col span={1} />
          <Col span={8}>
            <Form.Item name="minHeight" initialValue={minHeight}>
              <SenseInput type='text' suffix={<div>H</div>} disabled={isAllReadOnly} />
            </Form.Item>
          </Col>
        </Row>
      </div>
      {index.map((info, index) => (
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
        <Switch disabled={isAllReadOnly} onChange={attributeConfigurableChange} />
      </Form.Item>

      <Form.Item label={<span></span>} shouldUpdate style={{marginTop: '-12px'}}>
        {() => {
          return props.form?.getFieldValue('attributeConfigurable') && (
            <MapStateJSONTab
              isAttributeList={true}
              inputList={props.form?.getFieldValue('attributeList')}
              readonly={isAllReadOnly}
              updateData={(values: any) => {
                props.form?.setFieldsValue({attributeList: values.inputList})
              }}
            />
          )
        }}
      </Form.Item>
    </React.Fragment>
  );
};

export default RectConfig;
// function mapStateToProps({ editAnnotation, createStep, stepConfig }: any) {
//   return { editAnnotation, createStep, stepConfig };
// }

// export default connect(mapStateToProps)(RectConfig);
