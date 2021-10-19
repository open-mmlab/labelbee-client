// cl 2021/9/10 17:40
import React, { ReactNode, useEffect } from 'react';
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
  dataSourceStep?: number;
  stepInfo?: IStepInfo | null;
  toolName: EToolName;
  form: FormInstance;
}
export type ToolConfigIProps = Omit<IProps, 'stepInfo'>

const Component: {[key: string]: ReactNode} = {
  [EToolName.Rect]: RectConfig,
  [EToolName.Tag]: TagConfig,
  [EToolName.Polygon]: PolygonToolConfig,
  [EToolName.Line]: PolygonToolConfig,
  [EToolName.Point]: PointConfig,
  [EToolName.Text]: TextToolConfig,
}

const Tools: React.FC<IProps> = ({dataSourceStep, toolName, stepInfo, form,  }) => {
  const { state: { currentProjectInfo } } = useAnnotation();
  const CurrentToolConfig = React.useMemo(() => {

    let ToolConfig = Component[toolName]

    // @ts-ignore
    return ToolConfig ? React.cloneElement(<ToolConfig />, {toolName, dataSourceStep, form}) : null

  }, [dataSourceStep, form, toolName])

  // 普通编辑和多步骤编辑设置值
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
  }, [currentProjectInfo, toolName, stepInfo])

  return CurrentToolConfig
};

export default Tools;