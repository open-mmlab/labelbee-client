// cl 2021/9/13 09:53
import React, { useMemo, useState } from 'react';
import { Col, Row, Select, Button, Form, message } from 'antd';
import { isNumber, omit, pick } from 'lodash';
import { IStepInfo } from '@/store';
import { EToolName, TOOL_NAME } from '@/constant/store';
import SelectTool, { annotationTypeList, Itool } from '../SelectTool';
import Tools from '../Tools';
import { formatData } from '@/ProjectPlatform/CreateProjectModal';
import styles from './index.module.scss'

const { Option } = Select;

interface IProps {
  stepList: IStepInfo[];
  changeTaskVisible: () => void;
  setStepLIst: (stepInfos: IStepInfo[]) => void;
}

const Index: React.FC<IProps> = ({stepList, setStepLIst, changeTaskVisible}) => {
  const [dataSourceStep, setDataSourceStep] = useState<number>();
  const [toolName, setToolName] = useState<EToolName>();

  const [form] = Form.useForm();

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

  const save = () => {
    if(!isNumber(dataSourceStep)) {
      message.error('请选择数据源')
      return
    }
    if(!toolName) {
      message.error('请选择标注工具')
      return
    }

    form.validateFields().then((values) => {
      const result = formatData(omit(values, ['name', 'path', 'resultPath']), toolName, form)
      let step = {step: stepList.length + 1, dataSourceStep, tool: toolName, config: result}
      setStepLIst([...stepList, step])
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
            <Select style={{width: '100%'}} onChange={(v) => {
              setDataSourceStep(v as number)
            }}>
              <Option value={0}>原图</Option>
              {
                stepList?.map((info, index) => (
                  <Option key={info.step} value={info.step}>
                    {TOOL_NAME[info.tool]} = {info.step}
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
                  <SelectTool type='select' tools={tools} onChange={(key) => {
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
              <Form form={form}
                    preserve={false}
                    labelAlign='left'
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}>
                <Tools form={form} toolName={toolName}></Tools>
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

export default Index;
