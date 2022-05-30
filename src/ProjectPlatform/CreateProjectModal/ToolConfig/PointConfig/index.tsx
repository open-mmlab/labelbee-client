/*
 * @Author: Laoluo luozefeng@sensetime.com
 * @Date: 2022-01-12 13:15:51
 * @LastEditors: Laoluo luozefeng@sensetime.com
 * @LastEditTime: 2022-05-30 16:15:22
 */
// import SenseInput from '@/components/customAntd/Input';
import { Switch, InputNumber, Form } from 'antd';
import React from 'react';
import styles from '../index.module.scss';
import { MapStateJSONTab } from '@/ProjectPlatform/CreateProjectModal/ToolConfig/RectConfig/AttributeConfig';
import TextConfigurable from '../TextConfigurable';
import ToolCommonFiled from '../ToolCommonFiled';
import { DEFAULT_ATTRIBUTE_LIST, ETextType } from '@/constant/store';
import { ToolConfigIProps } from '../../Tools';
import { useTranslation } from 'react-i18next';

const isAllReadOnly = false;

const PointConfig = (props: ToolConfigIProps) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Form.Item
        name='upperLimit'
        initialValue={null}
        label={<span className={styles.formTitle}>{t('UpperLimitPoints')}</span>}
      >
        <InputNumber min={1} />
      </Form.Item>
      <ToolCommonFiled copyBackwardResultDisabled={!!props.dataSourceStep} />
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
        <Switch disabled={isAllReadOnly} />
      </Form.Item>

      <Form.Item noStyle shouldUpdate>
        {() => {
          return (
            props.form?.getFieldValue('attributeConfigurable') && (
              <Form.Item label=' ' name='attributeList' initialValue={DEFAULT_ATTRIBUTE_LIST}>
                <MapStateJSONTab isAttributeList={true} readonly={isAllReadOnly} />
              </Form.Item>
            )
          );
        }}
      </Form.Item>
    </React.Fragment>
  );
};

export default PointConfig;
