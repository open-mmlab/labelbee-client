import { COLORS_ARRAY } from '@/constant/style';
import { addInputList, changeInputList, deleteInputList } from '@/utils/tool/editTool';
import { CloseCircleFilled } from '@ant-design/icons';
import { Button, Tabs, Input as SenseInput, message as SenseMessage } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import styles from '../../index.module.scss';
import './index.scss';
import { useTranslation } from 'react-i18next';

interface IJsonTabProps {
  value?: any[];
  readonly: boolean;
  onChange?: (value: any[]) => void;
  /** 是否为属性列表 */
  isAttributeList: boolean;
}
const EDIT_SUBSELECTED = false;
const { TabPane } = Tabs;

export const ColorTag = ({ color, style }: any) => {
  return (
    <span
      style={{
        display: 'inline-block',
        height: 14,
        width: 14,
        backgroundColor: color,
        verticalAlign: 'middle',
        ...style,
      }}
    />
  );
};

const JSONTab = (props: IJsonTabProps) => {
  const [jsonCode, setJsonCode] = useState('');
  const attributeListDom = useRef(null);
  const { t } = useTranslation();
  const {
    value = [
      {
        key: '类别1',
        value: '类别1',
      },
    ],
    readonly,
    onChange,
    isAttributeList,
  } = props;

  useEffect(() => {
    setJsonCode(JSON.stringify(value, null, 2));
    const inputListLastDom: any = attributeListDom?.current;
    if (inputListLastDom) {
      inputListLastDom?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [value]);

  const addInputInfo = () => {
    onChange?.(addInputList(value, EDIT_SUBSELECTED));
  };

  const changeTagType = (v: any) => {};

  // 更改标签工具里面的对应值
  const changeInputInfo = (e: any, target: 'key' | 'value', index: number) => {
    onChange?.(changeInputList(e, target, value, index));
  };

  // 删除对应输入
  const deleteInputInfo = (i: number) => {
    onChange?.(deleteInputList(value, i));
  };

  const editorChange = (v: string) => {
    try {
      const newInputList = JSON.parse(v);
      if (value?.constructor !== newInputList.constructor) {
        SenseMessage.error(t('ConfigurationFormatErrorNotify'));
        return;
      }
      onChange?.(newInputList);
    } catch (e) {
      // message.error('JSON 格式错误');
    }
  };

  // 限定质检
  const options = {
    selectOnLineNumbers: true,
    renderSideBySide: false,
  };

  return (
    <Tabs onChange={changeTagType}>
      <TabPane tab={t('Form')} key='1'>
        {value?.map((info, i) => (
          <div className='sensebee-input-wrap' key={`inputList_${i}`}>
            <div className={styles.select}>
              <span className={styles.inputSerial}>{i + 1}</span>
              <SenseInput
                className={`sensebee-input`}
                value={info.key}
                placeholder={t('Type')}
                onChange={(e: any) => changeInputInfo(e, 'key', i)}
                disabled={readonly}
                addonBefore={isAttributeList && <ColorTag color={COLORS_ARRAY[i % 8]} />}
              />
              <SenseInput
                className={'sensebee-input'}
                value={info.value}
                placeholder={t('Value')}
                onChange={(e: any) => changeInputInfo(e, 'value', i)}
                disabled={readonly}
              />

              {i > 0 && !readonly && (
                <a className={styles.deleteIcon} onClick={() => deleteInputInfo(i)}>
                  <CloseCircleFilled />
                </a>
              )}
            </div>
          </div>
        ))}

        {!readonly && (
          <Button
            className={styles.addButton}
            onClick={() => addInputInfo()}
            ref={attributeListDom}
          >
            {t('New')}
          </Button>
        )}
      </TabPane>

      <TabPane tab='JSON' key='2'>
        <MonacoEditor
          width='800'
          height='300'
          language='json'
          theme='vs-dark'
          value={jsonCode}
          options={options}
          onChange={editorChange}
        />
      </TabPane>
    </Tabs>
  );
};

export const MapStateJSONTab = JSONTab;
