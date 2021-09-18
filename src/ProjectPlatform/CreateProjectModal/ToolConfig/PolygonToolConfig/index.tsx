// cl 2021/8/5 09:49
import React, { useEffect } from 'react';
import { Form, FormInstance, Select, Switch } from 'antd';
import { ELineTypes, ELineColor, ETextType, EToolName } from '@/constant/store';
import GraphicsPointLimitInput from './GraphicsPointLimitInput';
import TextConfigurable from '../../ToolConfig/TextConfigurable';
import { MapStateJSONTab } from '@/ProjectPlatform/CreateProjectModal/ToolConfig/RectConfig/AttributeConfig';
import { toolCommonField } from '../publicConfig';
import styles from '../index.module.scss';
const { Option } = Select;
interface IProps {
  toolName: EToolName;
  form?: FormInstance;
}

const initLowerLimitPoint: any = {
  [EToolName.Polygon]: { num: 3, text: '闭合点数' },
  [EToolName.Line]: { num: 2, text: '顶点数限制' },
};

const selectList = [
  {
    label: '线条类型',
    value: ELineTypes.Line,
    name: 'lineType',
    select: [
      {
        key: '直线',
        value: ELineTypes.Line,
      },
      {
        key: '曲线',
        value: ELineTypes.Curve,
      },
    ],
  },
  {
    label: '线条颜色',
    name: 'lineColor',
    value: ELineColor.SingleColor,
    select: [
      { key: '单色', value: ELineColor.SingleColor },
      { key: '多色', value: ELineColor.MultiColor },
    ],
  },
];

const polygonConfig = toolCommonField.map((item) => {
  if(item.key === 'copyBackwardResult') {
    item.disabled = true
  }
  return item;
})
// const modelList = [
//   {model: 'general', name: '通用'},
//   {model: 'mask', name: '口罩'},
//   {model: 'transparency', name: '透明物体'},
//   {model: 'carton', name: '卡通'},
// ]

const PolygonToolConfig: React.FC<IProps> = ({toolName, form }) => {
  const setEdgeAdsorption = (val: ELineTypes) => {
    if(val === ELineTypes.Curve) {
      form?.setFieldsValue({edgeAdsorption: false})
    }
  }
  useEffect(() => {
    form?.setFieldsValue({toolGraphicsPoint: {lowerLimitPointNum: initLowerLimitPoint[toolName].num}})
  }, [toolName])
  return (
    <React.Fragment>
      {
        selectList.map((item) => (
          <Form.Item
            name={item.name}
            initialValue={item.value}
            label={<span className={styles.formTitle}>{item.label}</span>}
            key={item.label}>
            <Select onChange={setEdgeAdsorption}>
              {
                item.select.map((itm: any) => (
                  <Option value={itm.value} key={itm.value}>{itm.key}</Option>
                ))
              }
            </Select>
          </Form.Item>
        ))
      }
      <Form.Item name='toolGraphicsPoint'
                 label={<span className={styles.formTitle}>{initLowerLimitPoint[toolName].text}</span>}
      >
        <GraphicsPointLimitInput />
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate>
        {() => {
          return (
            <Form.Item label={<span className={styles.formTitle}>边缘吸附</span>}
                       name='edgeAdsorption'
                       valuePropName='checked'
                       initialValue={false}>
              <Switch disabled={form?.getFieldValue('lineType') === ELineTypes.Curve} />
            </Form.Item>
          );
        }}
      </Form.Item>
      {
        polygonConfig.map(item => (
          <Form.Item key={item.key}
                     name={item.key}
                     label={<span className={styles.formTitle}>{item.name}</span>}
                     initialValue={item.value}
                     valuePropName='checked'>
            <Switch disabled={item.disabled} />
          </Form.Item>
        ))
      }
      <Form.Item
        label={<span className={styles.formTitle}>文本标注</span>}
        name='textConfigurableContext'
        initialValue={{
          textConfigurable: false,
          textCheckType: ETextType.AnyString,
          customFormat: '',
        }}
      >
        <TextConfigurable />
      </Form.Item>

      <Form.Item valuePropName='checked'
                 label={<span className={styles.formTitle}>属性标注</span>}
                 name='attributeConfigurable'
                 initialValue={false}
      >
        <Switch disabled={false} />
      </Form.Item>

      <Form.Item noStyle shouldUpdate>
        {() => {
          return form?.getFieldValue('attributeConfigurable') && (
            <Form.Item label=" " name='attributeList' initialValue={[{
              key: '类别1',
              value: '类别1',
            }]}>
              <MapStateJSONTab
                isAttributeList={true}
                readonly={false}
              />
            </Form.Item>);
        }}
      </Form.Item>

    </React.Fragment>
  );
};

export default PolygonToolConfig;