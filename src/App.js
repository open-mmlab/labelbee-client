import React, { useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Annotation from './Annotation';
import { fileList as mockFileList, rectDefaultResult } from './mock/index';
import { stepList } from './mock/taskConfig';

const App = () => {

  
  const [fileList, setFileList] = useState(mockFileList.map((i) => ({ url: i, result: rectDefaultResult  })));

  const goBack = (data) => {
    console.log('goBack', data);
  };

  if (fileList.length > 0) {
    return <Annotation fileList={fileList} goBack={goBack} stepList={stepList} step={1} />;
  }

  return <div className='App'>123</div>;
};

export default App;
