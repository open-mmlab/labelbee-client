import React, { useEffect, useState } from 'react';
import { Modal, Form, Radio, message, Popover, Spin } from 'antd';
import SelectFolder from '@/ProjectPlatform/CreateProjectModal/SelectFolder';
import { IFileInfo, IProjectInfo } from '@/store';
import { EIpcEvent } from '@/constant/event';
import DataTransfer, {
  getRgbaColorListFromColorCheatSheet,
  getRgbFromColorCheatSheet,
} from '@/utils/DataTransfer';
import { EToolName } from '@/constant/store';
import { useTranslation } from 'react-i18next';
import { jsonParser } from '@/utils/tool/common';
import DataLoading from '@/components/DataLoading';

interface IProps {
  projectInfo?: IProjectInfo;
  setProjectInfo: (info?: IProjectInfo) => void;
}

const electron = window.require && window.require('electron');
const ipcRenderer = electron && electron.ipcRenderer;

const ExportData = (props: IProps) => {
  const { projectInfo, setProjectInfo } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [form, projectInfo]);

  /**
   * 判断当前是否允许被转换成 coco 格式
   */
  const isTransfer2Coco =
    projectInfo?.toolName === EToolName.Rect || projectInfo?.toolName === EToolName.Polygon;

  /**
   * 判断当前是否允许被转换成 yolo 格式
   */
  const isTransfer2Yolo = projectInfo?.toolName === EToolName.Rect;

  /**
   * 是否允许被转换的成 Mask
   */
  const isTransfer2ACE20k = projectInfo?.toolName === EToolName.Polygon;
  const onOk = () => {
    if (!ipcRenderer || !projectInfo) {
      return;
    }
    form.validateFields().then((values: any) => {
      setLoading(true);

      ipcRenderer.send(EIpcEvent.SendDirectoryImages, projectInfo.path, projectInfo.resultPath);
      ipcRenderer.once(EIpcEvent.GetDirectoryImages, function (event: any, fileList: IFileInfo[]) {
        let data: any = {};
        let name = '';
        let suffix = 'json';
        let defaultKeyList: string[] = [];
        let attributeStr = '';

        switch (values.format) {
          case 'default':
            data = JSON.stringify(fileList);
            name = `${projectInfo.name}-labelbee`;
            break;
          case 'coco':
            data = JSON.stringify(
              DataTransfer.transferDefault2Coco(fileList, projectInfo.stepList),
            );
            name = `${projectInfo.name}-coco`;
            break;
          case 'yolo':
            name = `${projectInfo.name}-yolo`;
            suffix = 'txt';
            const { categories, idString } = DataTransfer.attributeConfigFormat(
              projectInfo.stepList,
            );
            fileList.forEach((file, i) => {
              const result = jsonParser(file.result);
              const dataList = DataTransfer.transferDefault2Yolo(result, categories);
              attributeStr = idString;
              electron.ipcRenderer.send(
                EIpcEvent.SaveFile,
                dataList,
                values.path,
                'utf8',
                `${file.fileName}_yolo.${suffix}`,
              );
            });

            electron.ipcRenderer.send(
              EIpcEvent.SaveFile,
              attributeStr,
              values.path,
              'utf8',
              `${name}_ids.${suffix}`,
            );

            break;

          case 'Mask':
            name = `${projectInfo.name}-Mask`;
            suffix = 'png';

            const config = jsonParser(projectInfo.stepList[0].config); // 暂定默认为第一步数据
            defaultKeyList = config?.attributeList.map((v: any) => v.value) ?? [];
            fileList.forEach((file, i) => {
              const result = jsonParser(file.result);

              // 暂时设定为第一步
              if (result['step_1']?.result?.length > 0) {
                const [data, keyList] = DataTransfer.transferPolygon2ADE20k(
                  result.width,
                  result.height,
                  result['step_1'].result,
                  defaultKeyList,
                );

                electron.ipcRenderer.send(
                  EIpcEvent.SaveFile,
                  data,
                  values.path + `${file.fileName}_segmentation.${suffix}`,
                  'base64',
                );

                const [grayData] = DataTransfer.transferPolygon2Gray(
                  result.width,
                  result.height,
                  result['step_1'].result,
                  keyList as string[],
                );

                electron.ipcRenderer.send(
                  EIpcEvent.SaveFile,
                  grayData,
                  values.path + `${file.fileName}_labelTrainIds.${suffix}`,
                  'base64',
                );

                defaultKeyList = keyList as string[];
              }
            });

            // 导出的配置数据
            const colorDataList = defaultKeyList.map((key, i) => ({
              attribute: key,
              color: getRgbFromColorCheatSheet(i + 1),
              colorList: getRgbaColorListFromColorCheatSheet(i + 1),
              trainIds: i + 1,
            }));

            const colorName = `${projectInfo.name}-color-list.json`;
            electron.ipcRenderer.send(
              EIpcEvent.SaveFile,
              JSON.stringify(colorDataList),
              values.path,
              'utf8',
              colorName,
            );
            break;
        }

        if (['default', 'coco'].includes(values.format)) {
          electron.ipcRenderer.send(
            EIpcEvent.SaveFile,
            data,
            values.path,
            'utf8',
            `${name}.${suffix}`,
          );
        }
        setLoading(false);
        message.success(t('ExportSuccess'));
        ipcRenderer.send(EIpcEvent.OpenDirectory, values.path);
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
      <Spin
        spinning={loading}
        indicator={<DataLoading message='Wait a minute ~ Exporting data...' />}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} layout='horizontal' form={form}>
          <Form.Item label={t('ExportFormat')} name='format' initialValue='default'>
            <Radio.Group>
              <Radio.Button value='coco' disabled={!isTransfer2Coco}>
                {isTransfer2Coco ? (
                  'COCO'
                ) : (
                  <Popover content={t('ExportCOCOLimitMsg')}>COCO</Popover>
                )}
              </Radio.Button>
              <Radio.Button value='yolo' disabled={!isTransfer2Yolo}>
                {isTransfer2Yolo ? (
                  'YOLO'
                ) : (
                  <Popover content={t('ExportYOLOLimitMsg')}>YOLO</Popover>
                )}
              </Radio.Button>
              <Radio.Button value='default'>{t('StandardFormat')}</Radio.Button>
              <Radio.Button value='Mask' disabled={!isTransfer2ACE20k}>
                {isTransfer2ACE20k ? (
                  'Mask'
                ) : (
                  <Popover content={t('ExportMaskLimitMsg')}>Mask</Popover>
                )}
              </Radio.Button>
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
      </Spin>
    </Modal>
  );
};

export default ExportData;
