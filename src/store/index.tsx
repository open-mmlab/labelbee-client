import { EStore, EToolName } from '@/constant/store';
import * as React from 'react';

export interface IProjectInfo {
  id: string;
  name: string;
  path: string;
  resultPath: string;
  toolName: EToolName;
  createdAt: number;
  stepList: IStepInfo[];
  step: number; // 保存当前标注步骤 用于下次标注时初始化
  imgIndex: number; // 保存当前标注页数 用于下次标注时初始化
}

export interface IStepInfo {
  id: string;
  step: number;
  dataSourceStep?: number;
  tool: EToolName;
  config: string;
}

export interface IFileInfo {
  url: string;
  result: string;
  fileName?: string;
}

interface IAnnotation {
  fileList: IFileInfo[];
  projectList: IProjectInfo[];
  currentProjectInfo?: IProjectInfo; // 当前项目信息
}

type Action = {
  type:
    | 'UPDATE_FILE_LIST'
    | 'ADD_PROJECT_LIST'
    | 'UPDATE_PROJECT_LIST'
    | 'UPDATE_CURRENT_PROJECTINFO';
  payload: any;
};

const initialState: IAnnotation = {
  fileList: [],
  projectList: [],
};

const reducer = (state: IAnnotation = initialState, action: Action) => {
  switch (action.type) {
    case 'UPDATE_FILE_LIST': {
      const fileList = action.payload.fileList;

      return { ...state, fileList };
    }

    case 'UPDATE_PROJECT_LIST': {
      const projectList = action.payload.projectList;
      localStorage.setItem(EStore.LOCAL_PROJECT_LIST, JSON.stringify(projectList));

      return { ...state, projectList };
    }

    case 'ADD_PROJECT_LIST': {
      const projectList = action.payload.projectList;
      const newProjectList = [...state.projectList, ...projectList];
      localStorage.setItem(EStore.LOCAL_PROJECT_LIST, JSON.stringify(newProjectList));
      return { ...state, projectList: newProjectList };
    }

    case 'UPDATE_CURRENT_PROJECTINFO': {
      const currentProjectInfo = action.payload.projectInfo;
      return {
        ...state,
        currentProjectInfo,
      };
    }

    default:
      throw new Error();
  }
};
interface IAnnotationContext {
  state: typeof initialState;
  dispatch: (action: Action) => void;
}
export const AnnotationContext = React.createContext<IAnnotationContext>({
  state: initialState,
  dispatch: () => {},
});
export const MenuConsumer = AnnotationContext.Consumer;

export function AnnotationProvider(props: any) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <AnnotationContext.Provider value={value}>{props.children}</AnnotationContext.Provider>;
}

// 减少引入 context
export const useAnnotation = () => {
  const context: IAnnotationContext = React.useContext(AnnotationContext);
  if (!context) {
    throw new Error('useAnnotation 必须在 AnnotationContext 中使用 ');
  }
  return context;
};
