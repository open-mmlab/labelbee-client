// cl 2021/9/10 18:29
import React, { Fragment } from 'react';
import { Menu, Select } from 'antd';
import styles from '@/ProjectPlatform/CreateProjectModal/index.module.scss';
import { EToolName, TOOL_NAME } from '@/constant/store';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

export const annotationTypeList = [
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
export type Itool = typeof annotationTypeList[0];
interface IProps {
  disabled?: boolean;
  type?: 'menu' | 'select';
  tools?: Itool[];
  toolName?: EToolName;
  onChange: (text: EToolName) => void;
}

const SelectTool: React.FC<IProps> = ({ disabled, type = 'menu', toolName, tools, onChange }) => {
  const { t } = useTranslation();
  return (
    <Fragment>
      {type === 'menu' ? (
        <Menu
          defaultSelectedKeys={[toolName || EToolName.Rect]}
          defaultOpenKeys={[toolName || EToolName.Rect]}
          className={styles.projectTypeSelected}
          onClick={(info) => {
            onChange(info.key as EToolName);
          }}
        >
          {annotationTypeList.map((annotationType) => (
            <Menu.Item disabled={disabled} key={annotationType.key}>
              {t(annotationType.name)}
            </Menu.Item>
          ))}
        </Menu>
      ) : (
        <Select
          style={{ width: '100%' }}
          disabled={disabled}
          value={toolName}
          onChange={(key) => {
            onChange(key as EToolName);
          }}
        >
          {tools?.map((info, index) => (
            <Option key={index} value={info.key}>
              {t(TOOL_NAME[info.key])}
            </Option>
          ))}
        </Select>
      )}
    </Fragment>
  );
};

export default SelectTool;
