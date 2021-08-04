// cl 2021/8/4 10:45
import React from 'react';
import TagInput from './tagInput';
import { Button, Tabs } from 'antd'
import { addInputList, changeInputList, deleteInputList, judgeIsTagConfig } from '@/utils/tool/editTool';
import MonacoEditor from 'react-monaco-editor';

const { TabPane } = Tabs;
interface IProps {

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

const inputList = [
  {
    key: '类别1',
    value: 'class1',
    isMulti: false,
    subSelected: [
      { key: '选项1', value: 'option1', isDefault: false },
      { key: '选项2', value: 'option1-2', isDefault: false },
    ],
  },
  {
    key: '类别2',
    value: 'class-AH',
    isMulti: true,
    subSelected: [
      { key: '选项2-1', value: 'option2-1', isMulti: false },
      { key: '选项2-2', value: 'option2-2', isDefault: false },
      { key: '选项2-3', value: 'option2-3', isDefault: false },
    ],
  },
  {
    key: '类别3',
    value: 'class-0P',
    isMulti: false,
    subSelected: [
      { key: '选项3-1', value: 'option3-1', isMulti: false },
      { key: '选项3-2', value: 'option3-2', isDefault: false },
      { key: '选项3-3', value: 'option3-3', isDefault: false },
    ],
  },
]
// 限定质检
const options = {
  selectOnLineNumbers: true,
  renderSideBySide: false,
};

const Index: React.FC<IProps> = () => {
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
    // updateData({ inputList: changeInputList(e, target, inputList, index, subIndex) });
  };
  // add inputList
  const addInputInfo = (i?: number) => {
    // updateData({ inputList: addInputList(inputList, EDIT_SUBSELECTED, i, { isMulti: true }) });
  };
  // 删除对应输入
  const deleteInputInfo = (i: number, subIndex?: number) => {
   // updateData({ inputList: deleteInputList(inputList, i, subIndex) });
  };

  // 编辑器更改
  const editorChange = (v: string) => {
    try {
      const newInputList = JSON.parse(v);

      // 做编辑步骤的格式验证
      if (judgeIsTagConfig(newInputList)) {
        // updateData({ inputList: newInputList });
      }
    } catch (e) {
      // message.error('JSON 格式错误');
    }
  };

  return (
    <Tabs>
      <TabPane tab='表单' key="1">
        <div>
          {inputList.map((info, i) => (
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

          <Button onClick={() => addInputInfo()}>
            新建
          </Button>
        </div>
      </TabPane>
      <TabPane tab='JSON' key="2">
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
};

export default Index;