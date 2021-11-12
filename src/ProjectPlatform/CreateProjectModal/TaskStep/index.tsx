// cl 2021/9/13 14:51
import React, { ReactNode } from 'react';
import { IStepInfo, useAnnotation } from '@/store';
import { List, Modal } from 'antd';
import { CloseCircleOutlined, EditOutlined } from '@ant-design/icons';
import { TOOL_NAME } from '@/constant/store';
import { deleteStep } from '@/utils/tool/task';
import { icon } from '@/ProjectPlatform/ProjectList';
import './index.scss';
import { useTranslation } from 'react-i18next';

interface IProps {
  footer: ReactNode;
  stepList: IStepInfo[];
  setStepId: (id: string) => void;
  changeTaskVisible: () => void;
  setStepLIst: (stepInfos: IStepInfo[]) => void;
}

const TaskStep: React.FC<IProps> = ({
  stepList,
  footer,
  setStepId,
  changeTaskVisible,
  setStepLIst,
}) => {
  const {
    state: { currentProjectInfo },
  } = useAnnotation();
  const { t } = useTranslation();
  // 删除步骤， step为步骤
  const delStep = (step: number) => {
    const list = stepList.slice();
    const { deleteStepList, newStepList } = deleteStep(step, list);
    Modal.confirm({
      title: t('ConfirmToDeleteSteps'),
      content: deleteStepList.map((item: any, index: number) => (
        <div style={{ margin: '5px 0' }} key={index}>
          {item}
        </div>
      )),
      okButtonProps: { type: 'primary' },
      okText: t('Confirm'),
      onOk: () => {
        setStepLIst(newStepList);
      },
      cancelText: t('Cancel'),
      autoFocusButton: null,
    });
  };
  const edit = (id: string) => {
    setStepId(id);
    changeTaskVisible();
  };

  return (
    <List
      size='small'
      header={t('TaskSteps')}
      className='task-step-list'
      footer={!currentProjectInfo && <div style={{ textAlign: 'right' }}>{footer}</div>}
      bordered
      dataSource={stepList}
      renderItem={(item) => (
        <List.Item
          actions={[
            <EditOutlined
              onClick={() => {
                edit(item.id);
              }}
            />,
            !currentProjectInfo && <CloseCircleOutlined onClick={() => delStep(item.step)} />,
          ].filter(Boolean)}
        >
          <div className='ant-list-item-icon'>
            <span>{item.step} - </span>
            <img className='icon' src={icon[item.tool || 'step']} alt='' />
            <span>{TOOL_NAME[item.tool]}</span>
          </div>
        </List.Item>
      )}
    />
  );
};

export default TaskStep;
