// import SenseInput from '@/components/customAntd/Input';
import { Col, Row, Select, Switch, Input as SenseInput } from 'antd';
import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { MapStateJSONTab } from './attributeConfig';
import TextConfigurable from './textConfigurable';
import { EToolName, ETextType } from '@/constant/store';

function checkNumber(v: string) {
  const reg = /^[1-9]\d*$/g;
  if (reg.test(v)) {
    return true;
  }
  return false;
}

interface IProps {
  toolName?: EToolName;
}

const RectConfig = (props: IProps) => {
  const { toolName = EToolName.Rect } = props;
  const isTrack = toolName === EToolName.RectTrack; // 如果拉框跟踪工具， 则需要进行特殊选项的判断

  const textConfigurable = true;
  const drawOutsideTarget = false;
  const copyBackwardResult = false;
  const isShowOrder = false;
  const minWidth = 1, minHeight = 1, attributeConfigurable= true, textCheckType = 1 ,customFormat = '';
  const {} = props;

  const isAllReadOnly = false;

  const updateData = (payload: object) => {};

  const rectScopeChange = (e: any, pattern: 'minWidth' | 'minHeight') => {
    let data = e.target.value;
    if (data.length === 0) {
      data = undefined;
    }
    if (!checkNumber(e.target.value)) {
      return;
    }
    updateData({ [pattern]: ~~data });
    e.preventDefault();
  };

  const rectConfig = [
    {
      name: '目标外标注',
      radio: [
        { key: '是', value: true },
        { key: '否', value: false },
      ],
      key: 'drawOutsideTarget',
      value: drawOutsideTarget,
      onChange: (v: boolean) => updateData({ drawOutsideTarget: v }),
    },
    {
      name: '复制上一张结果',
      radio: [
        { key: '是', value: true },
        { key: '否', value: false },
      ],
      key: 'copyBackwardResult',
      value: copyBackwardResult,
      onChange: (v: boolean) => updateData({ copyBackwardResult: v }),
    },
  ];

  // 仅拉框显示
  if (!isTrack) {
    rectConfig.push({
      name: '显示拉框顺序',
      radio: [
        { key: '是', value: true },
        { key: '否', value: false },
      ],
      key: 'isShowOrder',
      value: isShowOrder,
      onChange: (v: boolean) => updateData({ isShowOrder: v }),
    });
  }

  const isNotDependOrigin = false;

  return (
    <React.Fragment>
      <div className={styles.selectedMain}>
        <div className={styles.selectedName}>最小尺寸</div>
        <Row>
          <Col span={11} className='border_bottom'>
            <SenseInput
              type='text'
              suffix={<div>W</div>}
              value={minWidth}
              onChange={(e: any) => rectScopeChange(e, 'minWidth')}
              disabled={isAllReadOnly}
            />
          </Col>
          <Col span={2} />
          <Col span={11} className='border_bottom'>
            <SenseInput
              type='text'
              suffix={<div>H</div>}
              value={minHeight}
              onChange={(e: any) => rectScopeChange(e, 'minHeight')}
              disabled={isAllReadOnly}
            />
          </Col>
        </Row>
      </div>
      {rectConfig.map((info, index) => (
        <div className={styles.switchMain} key={`rectTool_${index}`}>
          <div className={styles.selectedName}>{info.name}</div>
          <div className={styles.selected_switch}>
            <Switch
              checked={info.value}
              onChange={info.onChange}
              disabled={(info.key === 'copyBackwardResult' && isNotDependOrigin)}
            />
          </div>
        </div>
      ))}
      <TextConfigurable
        textConfigurable={textConfigurable}
        textCheckType={textCheckType}
        customFormat={customFormat}
        isAllReadOnly={isAllReadOnly || isTrack}
        updateData={updateData}
      />
      <div className={styles.switchMain}>
        <div className={styles.selectedName}>属性标注</div>
        <Switch
          checked={attributeConfigurable}
          onChange={() => {
            updateData({ attributeConfigurable: !attributeConfigurable });
          }}
          disabled={isAllReadOnly}
        />
      </div>
      {attributeConfigurable && (
        <MapStateJSONTab
          isAttributeList={true}
          inputList={[{
            key: '类别1',
            value: '类别1',
          }]}
          readonly={isAllReadOnly}
          updateData={() => {}}
        />
      )}
    </React.Fragment>
  );
};

export default RectConfig;
// function mapStateToProps({ editAnnotation, createStep, stepConfig }: any) {
//   return { editAnnotation, createStep, stepConfig };
// }

// export default connect(mapStateToProps)(RectConfig);
