// cl 2021/9/13 14:51
import React, { ReactNode } from 'react';
import { IStepInfo } from '@/store';
import { List, Modal } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { TOOL_NAME } from '@/constant/store';
import { deleteStep } from '@/utils/tool/task';
import './index.scss';

interface IProps {
  footer: ReactNode;
  stepList: IStepInfo[];
  setStepLIst: (stepInfos: IStepInfo[]) => void;
}

const TaskStep: React.FC<IProps> = ({stepList, footer, setStepLIst }) => {

  // 删除步骤， step为步骤
  const delStep = (step: number) => {
    const list = stepList.slice();
    const { deleteStepList, newStepList } = deleteStep(step, list);
    Modal.confirm({
      title: '确定删除以下步骤？',
      content: deleteStepList.map((item: any, index: number) => (
        <div style={{ margin: '5px 0' }} key={index}>
          {item}
        </div>
      )),
      okButtonProps: { type: 'primary' },
      okText: '确定',
      onOk: () => {
        setStepLIst(newStepList)
      },
      cancelText: '取消',
      autoFocusButton: null,
    });
  };

  return (
    <List
      size="small"
      header="任务步骤"
      className='task-step-list'
      footer={<div style={{textAlign: 'right'}}>{footer}</div>}
      bordered
      dataSource={stepList}
      renderItem={item => (
        <List.Item
          actions={[<CloseCircleOutlined onClick={() => delStep(item.step)} />]}
        >
          <span>{item.step} - {TOOL_NAME[item.tool]}</span>
        </List.Item>
      )}
    />
  );
};

export default TaskStep;