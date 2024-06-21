import MainView from '@/views/MainView';
import { IPointCloudBox, i18n } from '@labelbee/lb-utils';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { store } from '.';
import { LabelBeeContext } from '@/store/ctx';
import { AppState } from './store';
import { ANNOTATION_ACTIONS } from './store/Actions';
import {
  InitAnnotationState,
  InitTaskData,
  loadImgList,
  UpdateInjectFunc,
} from './store/annotation/actionCreators';
import { AfterCommonLoaded, LoadFileAndFileData } from './store/annotation/reducer';
import { ToolInstance } from './store/annotation/types';
import {
  GetFileData,
  IFileItem,
  LoadFileList,
  OnPageChange,
  OnSave,
  OnStepChange,
  OnSubmit,
} from './types/data';
import { Header, RenderFooter, Sider, DrawLayerSlot } from './types/main';
import { IStepInfo } from './types/step';
import { ConfigProvider } from 'antd/es';
import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';
import { EPointCloudName } from '@labelbee/lb-annotation';

interface IAnnotationStyle {
  strokeColor: string;
  fillColor: string;
  textColor: string;
  toolColor: any;
}

export interface IPreDataProcessParams {
  // 标注类型:暂时只支持点云
  tool: EPointCloudName.PointCloud | string;
  // 更新数据
  dataList: IPointCloudBox[];
  // 更新数据的具体动作
  action: 'preDataProcess' | 'viewUpdateBox';
  // 当前步骤的config
  stepConfig: IStepInfo['config'];
}

export interface AppProps {
  exportData?: (data: any[]) => void;
  goBack?: () => void;
  imgList?: IFileItem[];
  config: string;
  stepList: IStepInfo[];
  step: number;
  onSubmit?: OnSubmit;
  onSave?: OnSave;
  onPageChange?: OnPageChange;
  onStepChange?: OnStepChange;
  getFileData?: GetFileData;
  pageSize: number;
  loadFileList?: LoadFileList;
  headerName?: string;
  initialIndex?: number;
  className?: string;
  toolInstance: ToolInstance;
  header?: Header;
  footer?: RenderFooter;
  sider?: Sider;
  style?: {
    layout?: { [key: string]: any };
    header?: { [key: string]: any };
    sider?: { [key: string]: any };
    footer?: { [key: string]: any };
  };
  setToolInstance?: (tool: ToolInstance) => void;
  mode?: 'light' | 'dark'; // 临时需求应用于 toolFooter 的操作
  showTips?: boolean; // 是否展示 tips
  tips?: string; // Tips 具体内容
  defaultLang: 'en' | 'cn'; // 国际化设置
  leftSider?: () => React.ReactNode | React.ReactNode;

  // data Correction
  skipBeforePageTurning?: (pageTurning: Function) => void;
  beforeRotate?: () => boolean;

  drawLayerSlot?: DrawLayerSlot;

  // 标注信息扩展的功能
  dataInjectionAtCreation: (annotationData: any) => {};
  // 渲染增强
  renderEnhance: {
    staticRender?: (canvas: HTMLCanvasElement, data: any, style: IAnnotationStyle) => void;
    selectedRender?: (canvas: HTMLCanvasElement, data: any, style: IAnnotationStyle) => void;
    creatingRender?: (canvas: HTMLCanvasElement, data: any, style: IAnnotationStyle) => void;
  };
  customRenderStyle?: (data: any) => IAnnotationStyle;

  checkMode?: boolean;
  intelligentFit?: boolean;
  enableColorPicker?: boolean;
  highlightAttribute?: string;
  onLoad?: ({ toolInstance }: { toolInstance: ToolInstance }) => void;
  preDataProcess?: (params: IPreDataProcessParams) => IPointCloudBox[];
  auditContext?: any;
}

const App: React.FC<AppProps> = (props) => {
  const [_, forceRender] = useState(0);
  const {
    imgList,
    step = 1,
    stepList,
    onSubmit,
    onSave,
    onPageChange,
    onStepChange,
    initialIndex = 0,
    toolInstance,
    setToolInstance,
    getFileData,
    pageSize = 10,
    loadFileList,
    defaultLang = 'cn',
    skipBeforePageTurning,
    beforeRotate,
    checkMode = false,
    intelligentFit = true,
    highlightAttribute = '',
    preDataProcess,
    imgIndex
  } = props;

  useEffect(() => {
    store.dispatch(
      InitTaskData({
        onSubmit,
        stepList,
        step,
        getFileData,
        pageSize,
        loadFileList,
        onSave,
        onPageChange,
        onStepChange,
        skipBeforePageTurning,
        beforeRotate,
        checkMode,
        highlightAttribute,
        preDataProcess,
      }),
    );

    initImgList();
    // 初始化国际化语言
    i18n.changeLanguage(defaultLang);

    const i18nLanguageChangedFunc = () => {
      forceRender((v) => v + 1);
    };

    i18n.on('languageChanged', i18nLanguageChangedFunc);
    return () => {
      i18n.off('languageChanged', i18nLanguageChangedFunc);

      // Init all annotation state after unmounting
      InitAnnotationState(store.dispatch);
    };
  }, []);

  useEffect(() => {
    store.dispatch(
      UpdateInjectFunc({
        onSubmit,
        stepList,
        getFileData,
        pageSize,
        loadFileList,
        onSave,
        onPageChange,
        onStepChange,
        beforeRotate,
        highlightAttribute,
        preDataProcess,
      }),
    );

    i18n.changeLanguage(defaultLang);
  }, [
    onSubmit,
    stepList,
    getFileData,
    pageSize,
    loadFileList,
    onSave,
    onPageChange,
    onStepChange,
    defaultLang,
    beforeRotate,
    highlightAttribute,
    preDataProcess,
  ]);

  useEffect(() => {
    setToolInstance?.(toolInstance);
  }, [toolInstance]);

  useEffect(()=>{
    store.dispatch({
      type: ANNOTATION_ACTIONS.UPDATE_IMG_INDEX,
      payload: {
        imgIndex,
      },
    });
    store.dispatch(LoadFileAndFileData(imgIndex));
  },[imgIndex])

  // 初始化imgList 优先以loadFileList方式加载数据
  const initImgList = () => {
    if (loadFileList) {
      loadImgList(store.dispatch, store.getState, initialIndex, true).then((isSuccess) => {
        if (isSuccess) {
          store.dispatch(LoadFileAndFileData(initialIndex));
        }
      });
    } else if (imgList && imgList.length > 0) {
      store.dispatch({
        type: ANNOTATION_ACTIONS.UPDATE_IMG_LIST,
        payload: {
          imgList,
        },
      });
      store.dispatch(LoadFileAndFileData(initialIndex));
    }
  };

  return (
    <div>
      <ConfigProvider locale={i18n.language === 'en' ? enUS : zhCN}>
        <MainView {...props} intelligentFit={intelligentFit} checkMode={checkMode} />
      </ConfigProvider>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  toolInstance: state.annotation.toolInstance,
});

export default connect(mapStateToProps, null, null, { context: LabelBeeContext })(App);
