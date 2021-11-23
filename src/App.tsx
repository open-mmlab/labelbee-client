import React, { useContext, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.less';
import Annotation from './Annotation';
import ProjectPlatform from './ProjectPlatform';
import { AnnotationContext } from './store';
import { EStore } from './constant/store';
import { useLocale } from './store/locale';
import { ConfigProvider } from 'antd';
import i18n from './i18n';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';

const App = () => {
  const {
    state: { fileList, currentProjectInfo },
    dispatch,
  } = useContext(AnnotationContext);
  const locale = useLocale();

  useEffect(() => {
    i18n.on('languageChanged', function (lang: string) {
      // 更改内部 antd 的国际化
      switch (lang) {
        case 'cn':
          locale.dispatch({
            type: 'UPDATE_LOCALE',
            payload: {
              locale: zhCN,
            },
          });
          break;

        case 'en':
          locale.dispatch({
            type: 'UPDATE_LOCALE',
            payload: {
              locale: enUS,
            },
          });
          break;
      }
    });
  }, []);

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
    <ConfigProvider locale={locale.state.locale}>
      <div className='App'>
        <ProjectPlatform />
      </div>
    </ConfigProvider>
  );
};

export default App;
