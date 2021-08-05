// cl 2021/8/5 09:49
import React from 'react';
import { Form, FormInstance, Select, Switch } from 'antd';
import { ELineTypes, ELineColor, ETextType } from '@/constant/store';
import GraphicsPointLimitInput from './GraphicsPointLimitInput';
import styles from '@/ProjectPlatform/CreateProjectModal/toolConfig/index.module.scss';
import TextConfigurable from '../../toolConfig/textConfigurable';
import { MapStateJSONTab } from '@/ProjectPlatform/CreateProjectModal/toolConfig/rectConfig/attributeConfig';
import { changeInputList } from '@/utils/tool/editTool';
const { Option } = Select;
interface IProps {
  form?: FormInstance;
}

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
    // todo 曲线需要关闭边缘吸附
    // onChange: (v: ELineTypes) => {
    //   updateData({ lineType: v });
    //
    //   if (v === ELineTypes.Curve) {
    //     updateData({ edgeAdsorption: false });
    //   }
    // },
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
const polygonConfig = [
  {
    name: '目标外标注',
    key: 'drawOutsideTarget',
    defaultValue: false,
  },
  {
    name: '复制上一张结果',
    key: 'copyBackwardResult',
    defaultValue: false,
    disabled: true,
  },
  {
    name: '显示标注顺序',
    key: 'isShowOrder',
    defaultValue: false,
  },
  {
    name: '分割辅助',
    key: 'segmentSupport',
    defaultValue: false,
  },
];
const modelList = [
  {model: 'general', name: '通用'},
  {model: 'mask', name: '口罩'},
  {model: 'transparency', name: '透明物体'},
  {model: 'carton', name: '卡通'},
]

const Index: React.FC<IProps> = ({ form }) => {
  const setEdgeAdsorption = (val: ELineTypes) => {
    if(val === ELineTypes.Curve) {
      form?.setFieldsValue({edgeAdsorption: false})
    }
  }
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
                item.select.map((itm) => (
                  <Option value={itm.value} key={itm.value}>{itm.key}</Option>
                ))
              }
            </Select>
          </Form.Item>
        ))
      }
      <Form.Item name='polygonToolGraphicsPoint'
                 label={<span className={styles.formTitle}>闭合点数</span>}
                 initialValue={{
                   lowerLimitPointNum: 3,
                 }}>
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
                     initialValue={item.defaultValue}
                     valuePropName='checked'>
            <Switch disabled={item.disabled} />
          </Form.Item>
        ))
      }
      <Form.Item noStyle shouldUpdate>
        {() => {
          return form?.getFieldValue('segmentSupport') && (
            <Form.Item name="panopticModel" initialValue="general">
              <Select>
                {modelList.map((s: any) => (
                  <Option value={s.model} key={s.model}>
                    {s.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )
        }}
      </Form.Item>
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

export default Index;