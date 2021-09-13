// cl 2021/9/10 17:40
import React from 'react';
import { FormInstance } from 'antd';
import { EToolName } from '@/constant/store';
import RectConfig from '../ToolConfig/RectConfig';
import TagConfig from '../ToolConfig/TagConfig';
import PolygonToolConfig from '../ToolConfig/PolygonToolConfig';
import PointConfig from '../ToolConfig/PointConfig';
import TextToolConfig from '../ToolConfig/TextToolConfig';

interface IProps {
  toolName: EToolName;
  form: FormInstance;
}

const Tools: React.FC<IProps> = ({toolName, form,  }) => {
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

  return CurrentToolConfig
};

export default Tools;