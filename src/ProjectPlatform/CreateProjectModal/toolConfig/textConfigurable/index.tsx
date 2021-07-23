import { ETextType, TEXT_TYPE } from '@/constant/store';
import { Select as SenseSelect, Input as SenseInput } from 'antd';
import { Select, Switch } from 'antd';
import React, { useEffect } from 'react';
import styles from '../index.module.scss';

const TextConfigurable = (props: any) => {
  const { textConfigurable, textCheckType, customFormat, isAllReadOnly, updateData } = props;

  return (
    <>
      <div className={styles.switchMain}>
        <div className={styles.selectedName}>文本标注</div>
        <Switch
          checked={textConfigurable}
          onChange={() => {
            updateData({ textConfigurable: !textConfigurable });
          }}
          disabled={isAllReadOnly}
        />
      </div>
      {textConfigurable && (
        <SenseSelect
          style={{ width: '100%', marginBottom: '24px' }}
          disabled={isAllReadOnly}
          value={~~textCheckType ?? ETextType.AnyString}
          onChange={(textCheckType: any) => updateData({ textCheckType: Number(textCheckType) })}
        >
          {Object.entries(TEXT_TYPE).map(item => (
            <Select.Option value={~~item[0]} key={~~item[0]}>
              {item[1]}
            </Select.Option>
          ))}
        </SenseSelect>
      )}
      {textCheckType === ETextType.CustomFormat && (
        <SenseInput
          placeholder='请输入正则表达式(建议联系开发人员协助)'
          style={{ width: '100%', marginBottom: '24px' }}
          disabled={isAllReadOnly}
          value={customFormat}
          onChange={(e: any) => updateData({ customFormat: e.target.value })}
        />
      )}
    </>
  );
};
export default TextConfigurable;
