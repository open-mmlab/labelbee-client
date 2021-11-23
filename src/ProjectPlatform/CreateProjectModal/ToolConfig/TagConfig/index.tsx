// cl 2021/8/4 10:45
import React, { useEffect } from 'react';
import { Button, FormInstance, Tabs, Form, Checkbox } from 'antd';
import TagInput from './TagInput';
import {
  addInputList,
  changeInputList,
  deleteInputList,
  judgeIsTagConfig,
} from '@/utils/tool/editTool';
import MonacoEditor from 'react-monaco-editor';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

const { TabPane } = Tabs;
interface IProps {
  form?: FormInstance;
}

const EDIT_SUBSELECTED = true;
export interface IInputList {
  isMulti?: Boolean;
  key: string;
  value: string;
  subSelected?: IInfoList[];
}

interface IInfoList {
  isDefault?: any;
  key: string;
  value: string;
}

const initInputList = [
  {
    key: '类别1',
    value: 'class-1',
    isMulti: false,
    subSelected: [{ key: '选项1-1', value: 'option1-1', isDefault: false }],
  },
];

const initInputList_EN = [
  {
    key: 'className1',
    value: 'class-1',
    isMulti: false,
    subSelected: [{ key: 'optionName1-1', value: 'option1-1', isDefault: false }],
  },
];

// 限定质检
const options = {
  selectOnLineNumbers: true,
  renderSideBySide: false,
};

const ToolConfig: React.FC<IProps> = ({ form }) => {
  const { t } = useTranslation();
  // 更改标签工具里面的对应值
  const changeInputInfo = (
    e: any,
    target: 'key' | 'value' | 'isMulti' | 'isDefault',
    index: number,
    subIndex?: number,
  ) => {
    // 这个是什么情况才有 ？
    if (e?.target?.value?.indexOf('@') > -1 && !['isMulti', 'isDefault'].includes(target)) {
      return;
    }
    const inputList = form?.getFieldValue('inputList');
    form?.setFieldsValue({ inputList: changeInputList(e, target, inputList, index, subIndex) });
  };
  // add inputList
  const addInputInfo = (i?: number) => {
    const inputList = form?.getFieldValue('inputList');
    form?.setFieldsValue({
      inputList: addInputList(inputList, EDIT_SUBSELECTED, i, {
        isMulti: true,
        lang: i18n.language,
      }),
    });
  };
  // 删除对应输入
  const deleteInputInfo = (i: number, subIndex?: number) => {
    const inputList = form?.getFieldValue('inputList');
    form?.setFieldsValue({ inputList: deleteInputList(inputList, i, subIndex) });
  };

  // 编辑器更改
  const editorChange = (v: string) => {
    try {
      const newInputList = JSON.parse(v);
      // 做编辑步骤的格式验证
      if (judgeIsTagConfig(newInputList)) {
        form?.setFieldsValue({ inputList: newInputList });
      }
    } catch (e) {
      // message.error('JSON 格式错误');
    }
  };
  useEffect(() => {
    // 通过 form 来管理数据 后面有异步的话也可以通过这里管理
    let inputList = initInputList;
    if (i18n.language === 'en') {
      inputList = initInputList_EN;
    }

    form?.setFieldsValue({ inputList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      {/* 两个switch 站位用的 便于 form 拿数据 */}
      <Form.Item
        valuePropName='checked'
        style={{ display: 'none' }}
        name='showConfirm'
        initialValue={true}
      >
        <Checkbox />
      </Form.Item>
      <Form.Item
        valuePropName='checked'
        style={{ display: 'none' }}
        name='skipWhileNoDependencies'
        initialValue={true}
      >
        <Checkbox />
      </Form.Item>
      <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }} shouldUpdate>
        {() => {
          let inputList: IInputList[] = form?.getFieldValue('inputList');
          return (
            <Tabs>
              <TabPane tab={t('Form')} key='1'>
                <div>
                  {inputList?.map((info, i) => (
                    <TagInput
                      inputInfo={info}
                      isAllReadOnly={false}
                      changeInputInfo={changeInputInfo}
                      addInputInfo={addInputInfo}
                      deleteInputInfo={deleteInputInfo}
                      inputIndex={i}
                      key={i}
                    />
                  ))}

                  <Button style={{ marginTop: 10 }} onClick={() => addInputInfo()}>
                    {t('New')}
                  </Button>
                </div>
              </TabPane>
              <TabPane tab='JSON' key='2'>
                <MonacoEditor
                  width='800'
                  height='300'
                  language='json'
                  theme='vs-dark'
                  value={JSON.stringify(inputList, null, 2)}
                  options={options}
                  onChange={editorChange}
                />
              </TabPane>
            </Tabs>
          );
        }}
      </Form.Item>
    </React.Fragment>
  );
};

export default ToolConfig;
