// import SenseInput from '@/components/customAntd/Input';
import { Col, Row, Switch, Input as SenseInput, Form, FormInstance } from 'antd';
import React from 'react';
import styles from './index.module.scss';
import { MapStateJSONTab } from './attributeConfig';
import TextConfigurable from './textConfigurable';
import { EToolName } from '@/constant/store';

function checkNumber(v: string) {
  const reg = /^[1-9]\d*$/g;
  if (reg.test(v)) {
    return true;
  }
  return false;
}

// todo 提交的时候用
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
  from?: FormInstance;
}

const drawOutsideTarget = false;
const copyBackwardResult = false;
const isShowOrder = false;
const minWidth = 1, minHeight = 1;
const isAllReadOnly = false;

const rectConfig = [
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
  return (
    <React.Fragment>
      <div className={styles.selectedMain}>
        <div className={styles.selectedName}>最小尺寸</div>
        <Row>
          <Col span={11}>
            <Form.Item name="minWidth" initialValue={minWidth}>
              <SenseInput type='text' suffix={<div>W</div>} disabled={isAllReadOnly} />
            </Form.Item>
          </Col>
          <Col span={2} />
          <Col span={11}>
            <Form.Item name="minHeight" initialValue={minHeight}>
              <SenseInput type='text' suffix={<div>H</div>} disabled={isAllReadOnly} />
            </Form.Item>
          </Col>
        </Row>
      </div>
      {rectConfig.map((info, index) => (
        <Form.Item valuePropName='checked' key={info.key} label={info.name} name={info.key} initialValue={info.value}>
          <Switch />
        </Form.Item>
      ))}
      <Form.Item name="textConfigurableContext">
        <TextConfigurable />
      </Form.Item>
      <Form.Item valuePropName='checked' label="属性标注" name="attributeConfigurable" initialValue={false}>
        <Switch disabled={isAllReadOnly} onChange={(val) => {
          console.log(val)
        }} />
      </Form.Item>

      <Form.Item shouldUpdate>
        {() => {
          return props.from?.getFieldValue('attributeConfigurable') && (
            <MapStateJSONTab
              isAttributeList={true}
              inputList={props.from?.getFieldValue('attributeList') || [{
                key: '类别1',
                value: '类别1',
              }]}
              readonly={isAllReadOnly}
              updateData={(values: any) => {
                props.from?.setFieldsValue({attributeList: values.inputList})
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
