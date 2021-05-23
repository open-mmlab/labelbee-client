import React from 'react';
import AnnotationOperation from 'label-bee';
import 'label-bee/dist/index.css';

const Annotation = (props) => {
  const { fileList, goBack, stepList, step } = props;

  const exportData = (data) => {
    console.log('exportData', data);
  };

  return (
    <div>
      <AnnotationOperation
        exportData={exportData}
        imgList={fileList}
        goBack={goBack}
        stepList={stepList}
        step={step}
      />
    </div>
  );
};
export default Annotation;
