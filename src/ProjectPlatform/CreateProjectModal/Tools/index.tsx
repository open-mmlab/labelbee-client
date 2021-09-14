// cl 2021/9/10 17:40
import React, { useEffect } from 'react';
import { FormInstance } from 'antd';
import { EToolName } from '@/constant/store';
import RectConfig from '../ToolConfig/RectConfig';
import TagConfig from '../ToolConfig/TagConfig';
import PolygonToolConfig from '../ToolConfig/PolygonToolConfig';
import PointConfig from '../ToolConfig/PointConfig';
import TextToolConfig from '../ToolConfig/TextToolConfig';
import { IStepInfo, useAnnotation } from '@/store';
import { pick } from 'lodash';

interface IProps {
  stepInfo?: IStepInfo;
  toolName: EToolName;
  form: FormInstance;
}

const Tools: React.FC<IProps> = ({stepInfo, toolName, form,  }) => {
  const { state: { currentProjectInfo } } = useAnnotation();
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

  useEffect(() => {
    if(currentProjectInfo || stepInfo) {
      const info = stepInfo?.config || currentProjectInfo?.stepList[0].config
      const config = JSON.parse(info || '')
      const textConfigurableContext = pick(config, ['textConfigurable', 'textCheckType', 'customFormat']);
      switch (toolName) {
        case EToolName.Rect:
          return form.setFieldsValue({
            ...pick(config, ['minWidth', 'minHeight', 'drawOutsideTarget', 'copyBackwardResult', 'isShowOrder', 'attributeConfigurable', 'attributeList']),
            textConfigurableContext,
          })
        case EToolName.Tag:
          return form.setFieldsValue({
            ...pick(config, ['inputList'])
          })
        case EToolName.Polygon:
        case EToolName.Line:
          return form.setFieldsValue({
            ...pick(config, ['lineType', 'lineColor', 'edgeAdsorption', 'drawOutsideTarget',  'copyBackwardResult', 'isShowOrder', 'attributeConfigurable', 'attributeList']),
            toolGraphicsPoint: pick(config, ['lowerLimitPointNum', 'upperLimitPointNum']),
            textConfigurableContext,
          })
        case EToolName.Point:
            return form.setFieldsValue({
              ...pick(config, ['upperLimit', 'drawOutsideTarget', 'copyBackwardResult', 'isShowOrder', 'attributeConfigurable', 'attributeList']),
              textConfigurableContext,
            })
        case EToolName.Text:
          return form.setFieldsValue({
            ...pick(config, ['configList'])
          })
        default:
          return
      }
    }
  }, [currentProjectInfo, toolName])

  return CurrentToolConfig
};

export default Tools;