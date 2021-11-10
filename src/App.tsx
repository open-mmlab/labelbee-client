import React, { useContext, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.less';
import Annotation from './Annotation';
import ProjectPlatform from './ProjectPlatform';
import { AnnotationContext } from './store';
import { EStore } from './constant/store';

const App = () => {
  const {
    state: { fileList, currentProjectInfo },
    dispatch,
  } = useContext(AnnotationContext);

  useEffect(() => {
    try {
      const projectListString = localStorage.getItem(EStore.LOCAL_PROJECT_LIST) || '[]';
      const projectList = JSON.parse(projectListString);
      if (projectList.length > 0) {
        dispatch({
          type: 'UPDATE_PROJECT_LIST',
          payload: {
            projectList,
          },
        });
      }
    } catch {}
  }, [dispatch]);

  if (currentProjectInfo && fileList.length > 0) {
    return <Annotation fileList={fileList} stepList={currentProjectInfo.stepList} step={1} />;
  }

  return (
    <div className='App'>
      <ProjectPlatform />
    </div>
  );
};

export default App;
