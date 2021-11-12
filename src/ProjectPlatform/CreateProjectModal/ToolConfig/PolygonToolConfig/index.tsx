// cl 2021/8/5 09:49
import React, { useEffect } from 'react';
import { Form, FormInstance, Select, Switch } from 'antd';
import { ELineTypes, ELineColor, ETextType, EToolName } from '@/constant/store';
import GraphicsPointLimitInput from './GraphicsPointLimitInput';
import TextConfigurable from '../../ToolConfig/TextConfigurable';
import ToolCommonFiled from '../ToolCommonFiled';
import { MapStateJSONTab } from '@/ProjectPlatform/CreateProjectModal/ToolConfig/RectConfig/AttributeConfig';
import { ToolConfigIProps } from '../../Tools';

import styles from '../index.module.scss';
import { useTranslation } from 'react-i18next';
const { Option } = Select;

const initLowerLimitPoint: any = {
  [EToolName.Polygon]: { num: 3, text: 'ClosedPoints' },
  [EToolName.Line]: { num: 2, text: 'PointsLimit' },
};

const selectList = [
  {
    label: 'LineType',
    value: ELineTypes.Line,
    name: 'lineType',
    select: [
      {
        key: 'StraightLine',
        value: ELineTypes.Line,
      },
      {
        key: 'CurveLine',
        value: ELineTypes.Curve,
      },
    ],
  },
  // {
  //   label: '线条颜色',
  //   name: 'lineColor',
  //   value: ELineColor.SingleColor,
  //   select: [
  //     { key: '单色', value: ELineColor.SingleColor },
  //     { key: '多色', value: ELineColor.MultiColor },
  //   ],
  // },
];

const PolygonToolConfig: React.FC<ToolConfigIProps> = ({ dataSourceStep, toolName, form }) => {
  const { t } = useTranslation();
  const setEdgeAdsorption = (val: ELineTypes) => {
    if (val === ELineTypes.Curve) {
      form?.setFieldsValue({ edgeAdsorption: false });
    }
  };
  useEffect(() => {
    form?.setFieldsValue({
      toolGraphicsPoint: { lowerLimitPointNum: initLowerLimitPoint[toolName].num },
    });
  }, [toolName]);
  return (
    <React.Fragment>
      {selectList.map((item) => (
        <Form.Item
          name={item.name}
          initialValue={item.value}
          label={<span className={styles.formTitle}>{t(item.label)}</span>}
          key={item.label}
        >
          <Select onChange={setEdgeAdsorption}>
            {item.select.map((itm: any) => (
              <Option value={itm.value} key={itm.value}>
                {t(itm.key)}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ))}
      <Form.Item
        name='toolGraphicsPoint'
        label={<span className={styles.formTitle}>{t(initLowerLimitPoint[toolName].text)}</span>}
      >
        <GraphicsPointLimitInput />
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {() => {
          return (
            <Form.Item
              label={<span className={styles.formTitle}>{t('EdgeAdsorption')}</span>}
              name='edgeAdsorption'
              valuePropName='checked'
              initialValue={false}
            >
              <Switch disabled={form?.getFieldValue('lineType') === ELineTypes.Curve} />
            </Form.Item>
          );
        }}
      </Form.Item>
      <ToolCommonFiled copyBackwardResultDisabled={!!dataSourceStep} />
      <Form.Item
        label={<span className={styles.formTitle}>{t('TextAnnotation')}</span>}
        name='textConfigurableContext'
        initialValue={{
          textConfigurable: false,
          textCheckType: ETextType.AnyString,
          customFormat: '',
        }}
      >
        <TextConfigurable />
      </Form.Item>

      <Form.Item
        valuePropName='checked'
        label={<span className={styles.formTitle}>{t('AttributeAnnotation')}</span>}
        name='attributeConfigurable'
        initialValue={false}
      >
        <Switch disabled={false} />
      </Form.Item>

      <Form.Item noStyle shouldUpdate>
        {() => {
          return (
            form?.getFieldValue('attributeConfigurable') && (
              <Form.Item
                label=' '
                name='attributeList'
                initialValue={[
                  {
                    key: '类别1',
                    value: '类别1',
                  },
                ]}
              >
                <MapStateJSONTab isAttributeList={true} readonly={false} />
              </Form.Item>
            )
          );
        }}
      </Form.Item>
    </React.Fragment>
  );
};

export default PolygonToolConfig;
