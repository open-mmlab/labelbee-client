import { EStore, EToolName } from '@/constant/store';
import * as React from 'react';

export interface IProjectInfo {
  name: string;
  path: string;
  resultPath: string;
  toolName: EToolName
  createdAt: string;
  stepList: IStepInfo[]
}

export interface IStepInfo {
  step: 1,
  tool: EToolName,
  config: string
}

export interface IFileInfo {
  url: string;
  result: string;
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

export const AnnotationContext = React.createContext<{
  state: typeof initialState;
  dispatch: (action: Action) => void;
}>({
  state: initialState,
  dispatch: () => {},
});
export const MenuConsumer = AnnotationContext.Consumer;

export function AnnotationProvider(props: any) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  console.log(value);
  return <AnnotationContext.Provider value={value}>{props.children}</AnnotationContext.Provider>;
}
