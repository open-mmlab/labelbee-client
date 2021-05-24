import React from 'react';
import AnnotationOperation from 'label-bee';
import 'label-bee/dist/index.css';

const Annotation = (props) => {
  const { fileList, goBack, stepList, step } = props;

  // const exportData = (data) => {
  //   console.log('exportData', data);
  // };

  const onSubmit = (data) => {
    // 翻页时触发当前页面数据的输出
    console.log('submitData', data);
  }

  return (
    <div>
      <AnnotationOperation
        // exportData={exportData}
        onSubmit={onSubmit}
        imgList={fileList}
        goBack={goBack}
        stepList={stepList}
        step={step}
      />
    </div>
  );
};
export default Annotation;
