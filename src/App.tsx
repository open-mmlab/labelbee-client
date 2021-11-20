import React, { useContext, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.less';
import Annotation from './Annotation';
import ProjectPlatform from './ProjectPlatform';
import { AnnotationContext } from './store';
import { EStore } from './constant/store';
import { useLocale } from './store/locale';
import { ConfigProvider } from 'antd';

const App = () => {
  const {
    state: { fileList, currentProjectInfo },
    dispatch,
  } = useContext(AnnotationContext);
  const {
    state: { locale },
  } = useLocale();

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
    <ConfigProvider locale={locale}>
      <div className='App'>
        <ProjectPlatform />
      </div>
    </ConfigProvider>
  );
};

export default App;
