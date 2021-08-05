
import { COLORS_ARRAY } from '@/constant/style';
import { addInputList, changeInputList, deleteInputList } from '@/utils/tool/editTool';
import { CloseCircleFilled } from '@ant-design/icons';
import { Button, Tabs, Input as SenseInput, message as SenseMessage } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import styles from '../../index.module.scss';

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
    <div
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
  const { value = [{
    key: '类别1',
    value: '类别1',
  }], readonly, onChange, isAttributeList } = props;

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

  const changeTagType = (v: any) => {
  };

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
        SenseMessage.error('配置格式错误');
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
      <TabPane tab='表单' key='1'>
        {value?.map((info, i) => (
          <div key={`inputList_${i}`}>
            <div className={styles.select}>
              <span className={styles.inputSerial}>{i + 1}</span>

              <SenseInput
                className={styles.input_single}
                value={info.key}
                placeholder='类别'
                onChange={(e: any) => changeInputInfo(e, 'key', i)}
                disabled={readonly}
                addonBefore={isAttributeList && <ColorTag color={COLORS_ARRAY[i % 8]} />}
              />
              <SenseInput
                className={styles.input_single}
                value={info.value}
                placeholder='值'
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
            新建
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

const mapStateToProps = ({ stepConfig }: any) => {
  return { stepConfig };
};

// export const MapStateJSONTab = connect(mapStateToProps)(JSONTab);
export const MapStateJSONTab = JSONTab;