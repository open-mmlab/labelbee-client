import React from 'react';
import RectTool from 'little-bee';
import 'little-bee/lib/index.css';

const Annotation = (props) => {
  const exportData = (data) => {
    console.log('exportData', data);
  };

  return (
    <div>
      <RectTool
        tool={'rectTool'}
        exportData={exportData}
        imgList={props.imgList}
        goBack={props.goBack}
        config={''}
        data={[]}
      />
    </div>
  );
};

export default Annotation;
