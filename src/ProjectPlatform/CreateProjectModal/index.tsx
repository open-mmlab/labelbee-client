import React, { useEffect, useState } from 'react';
import { Form, Menu, Modal } from 'antd';
import { omit, pick } from 'lodash';
import styles from './index.module.scss';
import RectConfig, { rectScopeChange } from './ToolConfig/RectConfig';
import TagConfig from './ToolConfig/TagConfig';
import PolygonToolConfig from './ToolConfig/PolygonToolConfig';
import PointConfig from './ToolConfig/PointConfig';
import TextToolConfig from './ToolConfig/TextToolConfig';
import { AnnotationContext } from '../../store';
import { EToolName, TOOL_NAME } from '@/constant/store';
import DefaultConfig from './ToolConfig/DefaultConfig';
import { formatDate } from '@/utils/tool/common';

interface IProps {
  visible: boolean;
  onCancel: () => void;
}

const annotationTypeList = [
  {
    name: TOOL_NAME[EToolName.Rect],
    key: EToolName.Rect,
  },
  {
    name: TOOL_NAME[EToolName.Tag],
    key: EToolName.Tag,
  },
  {
    name: TOOL_NAME[EToolName.Polygon],
    key: EToolName.Polygon,
  },
  {
    name: TOOL_NAME[EToolName.Line],
    key: EToolName.Line,
  },
  {
    name: TOOL_NAME[EToolName.Point],
    key: EToolName.Point,
  },
  {
    name: TOOL_NAME[EToolName.Text],
    key: EToolName.Text,
  },
];

const objToString = (values: any) => {
  return JSON.stringify(values)
}

const CreateProjectModal: React.FC<IProps> = ({ visible, onCancel }) => {
  const [toolName, setToolName] = useState<EToolName>(EToolName.Text);
  const {
    dispatch
  } = React.useContext(AnnotationContext);

  const [form] = Form.useForm();

  useEffect(() => {
    if (visible === false) {
      form.resetFields();
    }
  }, [form, visible]);

  /**
   * 所有  都集中在一个 form 表单
   * 参考 src/mock/taskConfig.ts
   * */
  const formatData = (values: any) => {
    const { textConfigurableContext } = values
    if(toolName === EToolName.Rect) {
      values.minWidth = rectScopeChange(values.minWidth)
      values.minHeight = rectScopeChange(values.minHeight)
      return objToString({...omit(values, ['textConfigurableContext']), ...textConfigurableContext})
    }else if(toolName === EToolName.Tag) {
      return objToString({...values, inputList: form.getFieldValue('inputList')})
    }else if([EToolName.Polygon, EToolName.Line].includes(toolName)) {
      let { toolGraphicsPoint } = values;
      return objToString({
        ...textConfigurableContext,
        ...toolGraphicsPoint,
        ...omit(values, ['textConfigurableContext', 'toolGraphicsPoint'])
      })
    }else if(toolName === EToolName.Point) {
      return objToString({...omit(values, ['textConfigurableContext']), ...textConfigurableContext})
    }else if(toolName === EToolName.Text) {
      return objToString(values)
    }
    return '';
  }

  const createProject = () => {
    form.validateFields().then((values) => {
      const result = formatData(omit(values, ['name', 'path', 'resultPath']))
      dispatch({
        type: 'ADD_PROJECT_LIST',
        payload: {
          projectList: [
            {
              ...pick(values, ['name', 'path', 'resultPath']),
              toolName,
              createdAt: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
              stepList: [{ step: 1, tool: toolName, config: result }],
            },
          ],
        },
      });
      onCancel();
    });
  };
  // 线条  文本  标点
  const CurrentToolConfig = React.useMemo(() => {
    switch (toolName) {
      case EToolName.Rect:
        return <RectConfig form={form} />;
      case EToolName.Tag:
        return <TagConfig form={form} />;
      case EToolName.Polygon:
      case EToolName.Line:
        return <PolygonToolConfig toolName={toolName} form={form} />;
      case EToolName.Point:
        return <PointConfig form={form} />;
      case EToolName.Text:
        return <TextToolConfig form={form} />;
      default: {
        return null;
      }
    }
  }, [form, toolName])

  return (
    <Modal destroyOnClose={true}
           centered visible={visible}
           width={800} title='创建项目'
           onOk={createProject}
           onCancel={onCancel}>
      <div className={styles.main}>
        <Menu
          defaultSelectedKeys={[toolName]}
          defaultOpenKeys={[toolName]}
          className={styles.projectTypeSelected}
          onClick={(info) => {
            form.resetFields(Object.keys(omit(form.getFieldsValue(), ['name'])))
            setToolName(info.key as EToolName)
          }}
        >
          {annotationTypeList.map((annotationType) => (
            <Menu.Item key={annotationType.key}>{annotationType.name}</Menu.Item>
          ))}
        </Menu>
        <div className={styles.config}>
          <Form
            layout='horizontal'
            key={toolName}
            labelAlign='left'
            colon={false}
            preserve={false}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}>
            <DefaultConfig />
            {CurrentToolConfig}
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default CreateProjectModal;
