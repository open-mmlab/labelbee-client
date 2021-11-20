import React, { useEffect } from 'react';
import { Modal, Form, Radio, message, Popover } from 'antd';
import SelectFolder from '@/ProjectPlatform/CreateProjectModal/SelectFolder';
import { IProjectInfo } from '@/store';
import { EIpcEvent } from '@/constant/event';
import DataTransfer from '@/utils/DataTransfer';
import { EToolName } from '@/constant/store';
import { useTranslation } from 'react-i18next';

interface IProps {
  projectInfo?: IProjectInfo;
  setProjectInfo: (info?: IProjectInfo) => void;
}

const electron = window.require && window.require('electron');
const ipcRenderer = electron && electron.ipcRenderer;

const ExportData = (props: IProps) => {
  const { projectInfo, setProjectInfo } = props;
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [projectInfo]);

  /**
   * 判断当前是否允许被转换成 coco 格式
   */
  const isTransfer2Coco =
    projectInfo?.toolName === EToolName.Rect || projectInfo?.toolName === EToolName.Polygon;

  const onOk = () => {
    if (!ipcRenderer || !projectInfo) {
      return;
    }
    form.validateFields().then((values: any) => {
      ipcRenderer.send(EIpcEvent.SendDirectoryImages, projectInfo.path, projectInfo.resultPath);
      ipcRenderer.once(EIpcEvent.GetDirectoryImages, function (event: any, fileList: any[]) {
        let json: any = {};
        let name = '';

        switch (values.format) {
          case 'default':
            json = fileList;
            name = `${projectInfo.name}-default`;
            break;
          case 'coco':
            json = DataTransfer.transferDefault2Coco(fileList);
            name = `${projectInfo.name}-coco`;
            break;
        }

        electron.ipcRenderer.send(
          EIpcEvent.SaveFile,
          JSON.stringify(json),
          values.path + `/${name}.json`,
        );
        message.success(t('ExportSuccess'));
        ipcRenderer.send(EIpcEvent.OpenDirectory, values.path + '/');
        setProjectInfo(undefined);
      });
    });
  };

  const onCancel = () => {
    setProjectInfo(undefined);
  };
  return (
    <Modal
      visible={!!projectInfo}
      title={t('SelectExportFormat')}
      onOk={onOk}
      width='50%'
      onCancel={onCancel}
      getContainer={window.document.body}
    >
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} layout='horizontal' form={form}>
        <Form.Item label={t('ExportFormat')} name='format' initialValue='default'>
          <Radio.Group>
            <Radio.Button value='coco' disabled={!isTransfer2Coco}>
              {isTransfer2Coco ? (
                'COCO'
              ) : (
                <Popover content={t('ExportLimitMsg')}>COCO</Popover>
              )}
            </Radio.Button>
            <Radio.Button value='default'>{t('StandardFormat')}</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name='path'
          label={<span>{t('SelectedExportPath')}</span>}
          rules={[{ required: true, message: t('SelectedExportPath') }]}
        >
          <SelectFolder key='path' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ExportData;
