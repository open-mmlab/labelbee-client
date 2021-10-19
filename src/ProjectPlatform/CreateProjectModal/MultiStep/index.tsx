// cl 2021/9/13 09:53
import React, { useEffect, useMemo, useState } from 'react';
import { Col, Row, Select, Button, Form, message } from 'antd';
import { isNumber, omit, pick } from 'lodash';
import { IStepInfo } from '@/store';
import { EToolName, TOOL_NAME } from '@/constant/store';
import SelectTool, { annotationTypeList, Itool } from '../SelectTool';
import Tools from '../Tools';
import { formatData } from '@/ProjectPlatform/CreateProjectModal';
import styles from './index.module.scss'
import uuid from '@/utils/tool/uuid';

const { Option } = Select;

interface IProps {
  stepId?: string;
  stepList: IStepInfo[];
  changeTaskVisible: () => void;
  setStepLIst: (stepInfos: IStepInfo[]) => void;
}

const MultiStep: React.FC<IProps> = ({stepId, stepList, setStepLIst, changeTaskVisible}) => {
  const [dataSourceStep, setDataSourceStep] = useState<number>();
  const [toolName, setToolName] = useState<EToolName>();

  const [multiStepForm] = Form.useForm();

  const tools = useMemo(() => {
    let relyTool = stepList.find((item) => item.step === dataSourceStep)?.tool;
    if(!relyTool || [EToolName.Rect, EToolName.Polygon, EToolName.Tag].includes(relyTool)) {
      return [...annotationTypeList]
    } else if(relyTool === EToolName.Line) {
      return [annotationTypeList.find(info => info.key === EToolName.Tag)]
    } else {
      return null
    }
  }, [dataSourceStep, stepList]) as Itool[]

  // 编辑的时候才有
  const stepInfo = useMemo(() => {
    const info = stepList.find(item => item.id === stepId)
    setToolName(info?.tool);
    setDataSourceStep(info?.dataSourceStep)
    return info;
  }, [stepId, stepList])

  const save = () => {
    if(!isNumber(dataSourceStep)) {
      message.error('请选择数据源')
      return
    }
    if(!toolName) {
      message.error('请选择标注工具')
      return
    }

    multiStepForm.validateFields().then((values) => {
      const result = formatData(omit(values, ['name', 'path', 'resultPath']), toolName, multiStepForm)
      const index = stepList.findIndex((item) => item.id === stepInfo?.id)
      const newStepList = [...stepList];
      if(index === -1) {
        newStepList.push({step: stepList.length + 1, dataSourceStep, tool: toolName, id: uuid(), config: result})
      }else {
        newStepList[index].config = result;
      }
      setStepLIst(newStepList)
      changeTaskVisible()
    });
  }

  return (
    <div>
      <div className={styles.multistep}>
        <Row>
          <Col span={6} >
            <div className={styles.selectedName}>数据源</div>
          </Col>
          <Col span={18} className={styles.mb_24}>
            <Select disabled={!!stepInfo} value={dataSourceStep} style={{width: '100%'}} onChange={(v) => {
              setDataSourceStep(v as number)
              setToolName(undefined)
            }}>
              <Option value={0}>原图</Option>
              {
                stepList?.map((info, index) => (
                  <Option key={info.step} value={info.step}>
                    {TOOL_NAME[info.tool]}
                  </Option>))
              }
            </Select>
          </Col>
          {
            isNumber(dataSourceStep) && <>
              <Col span={6}>
                <div className={styles.selectedName}>标注工具</div>
              </Col>
              <Col span={18} className={styles.mb_24}>
                {
                  <SelectTool disabled={!!stepInfo} toolName={toolName} type='select' tools={tools} onChange={(key) => {
                    setToolName(key);
                  }
                  } />
                }
              </Col>
            </>
          }
          <Col span={24} className={styles.mb_24}>
            {
              toolName &&
              <Form form={multiStepForm}
                    preserve={false}
                    labelAlign='left'
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}>
                <Tools dataSourceStep={dataSourceStep} stepInfo={stepInfo || null } form={multiStepForm} toolName={toolName}></Tools>
              </Form>
            }
          </Col>
        </Row>
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={save}>保存</Button>
      </div>
    </div>
  );
};

export default MultiStep;
