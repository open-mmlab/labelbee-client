import React, { useState } from 'react';
import { Upload } from 'antd';
import './App.css';
import 'antd/dist/antd.css';

import Annotation from './Annotation';
import { Button } from 'antd';

function App() {
  const [imgList, setImgList] = useState([]);
  const [isAnnotation, setIsAnnotation] = useState(false);

  const uploadProps = {
    action: '',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        const reader = new FileReader();
        reader.addEventListener(
          'load',
          function () {
            console.log('src', reader.result);
            setImgList([...imgList, reader.result]);
          },
          false,
        );
        reader.readAsDataURL(file.originFileObj);
      }
    },
    defaultFileList: [],
  };

  const nextStep = () => {
    if (imgList.length > 0) {
      setIsAnnotation(true);
    }
  };

  const goBack = (data) => {
    console.log('goBack', data);
  };

  if (isAnnotation) {
    return <Annotation imgList={imgList} goBack={goBack} />;
  }

  return (
    <div className='App'>
      <div>
        <Upload {...uploadProps}>
          <Button>Upload</Button>
        </Upload>
        {imgList.map((v, i) => (
          <img key={i} src={v} />
        ))}

        <Button onClick={nextStep}>下一步</Button>
      </div>
    </div>
  );
}

export default App;
