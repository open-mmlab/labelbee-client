import { ETextType, TEXT_TYPE } from '@/constant/store';
import { Select as SenseSelect, Input as SenseInput } from 'antd';
import { Select, Switch } from 'antd';
import React, { useState } from 'react';
import styles from '../index.module.scss';

interface ITextConfigurableValue {
  textConfigurable?: boolean;
  textCheckType?: string;
  customFormat?: string;
}
interface IProps {
  value?: ITextConfigurableValue,
  onChange?: (value: ITextConfigurableValue) => void;
}

const TextConfigurable: React.FC<IProps> = ({ value = {}, onChange }) => {
  // const { textConfigurable, textCheckType, customFormat, isAllReadOnly, updateData } = props;
  const [textConfigurable, setTextConfigurable] = useState(false);
  const [textCheckType, setTextCheckType] = useState(ETextType.AnyString);
  const [customFormat, setCustomFormat] = useState('');

  const triggerChange = (changeValue: any) => {
    onChange?.({textConfigurable, textCheckType, customFormat, ...value, ...changeValue})
  }

  const onSwitchChange = (newTextConfigurable: boolean) => {
    if(!('textConfigurable' in value)) {
      setTextConfigurable(newTextConfigurable)
    }
    triggerChange({textConfigurable: newTextConfigurable})
  }
  const onSelectChange = (newTextCheckType : keyof typeof TEXT_TYPE) => {
    if(!('textCheckType' in value)) {
      setTextCheckType(newTextCheckType)
    }
    triggerChange({textCheckType: newTextCheckType})
  }
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCustomFormat = e.target.value;
    if(!('customFormat' in value)) {
      setCustomFormat(newCustomFormat)
    }
    triggerChange({customFormat: newCustomFormat})
  }
  return (
    <>
      <div className={styles.switchMain}>
        <div className={styles.selectedName}>文本标注</div>
        <Switch
          checked={value.textConfigurable}
          onChange={onSwitchChange}
        />
      </div>
      {(value.textConfigurable || textConfigurable) && (
        <SenseSelect
          style={{ width: '100%', marginBottom: '24px' }}
          value={~~(value.textCheckType ?? ETextType.AnyString) as ETextType}
          onChange={onSelectChange}
        >
          {Object.entries(TEXT_TYPE).map(item => (
            <Select.Option value={~~item[0]} key={~~item[0]}>
              {item[1]}
            </Select.Option>
          ))}
        </SenseSelect>
      )}
      {(value.textCheckType || textCheckType) === ETextType.CustomFormat && (
        <SenseInput
          placeholder='请输入正则表达式(建议联系开发人员协助)'
          style={{ width: '100%', marginBottom: '24px' }}
          value={value.customFormat ?? customFormat}
          onChange={onInputChange}
        />
      )}
    </>
  );
};
export default TextConfigurable;
