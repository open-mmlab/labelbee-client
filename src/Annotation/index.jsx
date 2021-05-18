import React from 'react';
import RectTool from 'little-bee';
import 'little-bee/dist/index.css';

const Annotation = (props) => {
  const { fileList, goBack, stepList, step } = props;

  const exportData = (data) => {
    console.log('exportData', data);
  };

  return (
    <div>
      <RectTool
        tool={'rectTool'}
        exportData={exportData}
        imgList={fileList}
        goBack={goBack}
        stepList={stepList}
        data={[]}
        step={step}
      />
    </div>
  );
};

export default Annotation;
