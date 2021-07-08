import React, { useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Annotation from './Annotation';
import ProjectPlatform from './ProjectPlatform';
import { stepList } from './mock/taskConfig';


const App = () => {
  const [fileList, setFileList] = useState([]);

  if (fileList.length > 0) {
    return <Annotation fileList={fileList} stepList={stepList} step={1} />;
  
  }

  return (
    <div className='App'>
      <ProjectPlatform setFileList={setFileList} />
      {/* <button onClick={openDir}>open</button> */}
    </div>
  );
};

export default App;
