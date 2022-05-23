import { checkNumber } from '@/utils/tool/common';
import { message, Row, Col, Input as SenseInput } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// const iconMorePoint = require('@/assets/editStep/icon_morePoint.svg');
// const iconLessPoint = require('@/assets/editStep/icon_lessPoint.svg');

interface GraphicsValue {
  lowerLimitPointNum?: string;
  upperLimitPointNum?: string | undefined;
}

interface IProps {
  value?: GraphicsValue;
  minLowerLimitPointNum?: number;
  onChange?: (value: GraphicsValue) => void;
}

/**
 * 图形工具标注顶点数限制输入控件
 * @param props
 */
const GraphicsPointLimitInput: React.FC<IProps> = ({
  value = {},
  minLowerLimitPointNum = 3,
  onChange,
}) => {
  const [lowerLimitPointNum, setLowerLimitPointNum] = useState('');
  const [upperLimitPointNum, setUpperLimitPointNum] = useState('');
  const { t } = useTranslation();

  const triggerChange = (changeValue: GraphicsValue) => {
    onChange?.({ lowerLimitPointNum, upperLimitPointNum, ...value, ...changeValue });
  };

  const confirmScopeChange = (e: any, pattern: 'lowerLimitPointNum' | 'upperLimitPointNum') => {
    let newValue = e.target.value;
    const isLowerLim = pattern === 'lowerLimitPointNum';
    const isUpperLim = pattern === 'upperLimitPointNum';
    const DEFAULT_VALUE = '';

    // 数字检查
    if (!checkNumber(newValue)) {
      let showError = true;
      if (isLowerLim) {
        newValue = minLowerLimitPointNum.toString();
      }

      if (isUpperLim) {
        // 上限值允许为空
        if (newValue === DEFAULT_VALUE) {
          showError = false;
        }

        newValue = DEFAULT_VALUE;
      }

      if (showError) {
        message.error(t('PointsZeroLimitNotify'));
      }
    }

    // 下限值检查
    if (isLowerLim && newValue < minLowerLimitPointNum) {
      newValue = minLowerLimitPointNum;
      message.error(t('PointLowLimitNotify', { num: minLowerLimitPointNum }));
    }

    // 上限值检查
    if (
      isUpperLim &&
      newValue &&
      ~~newValue < ~~(value?.lowerLimitPointNum ?? lowerLimitPointNum)
    ) {
      newValue = DEFAULT_VALUE;
      message.error(t('LowLimitMustGreaterThanUpNotify'));
    }

    if (!(pattern in value)) {
      isLowerLim && setLowerLimitPointNum(newValue);
      isUpperLim && setUpperLimitPointNum(newValue);
    }
    triggerChange({ [pattern]: newValue });
  };

  return (
    <Row>
      <Col span={11} className='border_bottom'>
        <SenseInput
          type='text'
          suffix={<ArrowDownOutlined />}
          value={value.lowerLimitPointNum || lowerLimitPointNum}
          placeholder={t('LowerLimitPoints')}
          onChange={(e) => triggerChange({ lowerLimitPointNum: e.target.value })}
          onBlur={(e) => confirmScopeChange(e, 'lowerLimitPointNum')}
        />
      </Col>
      <Col span={11} className='border_bottom' offset={2}>
        <SenseInput
          type='text'
          placeholder={t('UpperLimitPoints')}
          suffix={<ArrowUpOutlined />}
          value={value.upperLimitPointNum || upperLimitPointNum}
          onChange={(e) => triggerChange({ upperLimitPointNum: e.target.value })}
          onBlur={(e) => confirmScopeChange(e, 'upperLimitPointNum')}
        />
      </Col>
    </Row>
  );
};

export default GraphicsPointLimitInput;
