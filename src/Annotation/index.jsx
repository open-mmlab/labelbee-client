import React from 'react';
import RectTool from 'little-bee';
import 'little-bee/lib/index.css';

const config = {
  showConfirm: false,
  skipWhileNoDependencies: false,
  drawOutsideTarget: false,
  copyBackwardResult: true,
  minWidth: 1,
  minHeight: 1,
  isShowOrder: true,
  filterData: ['valid', 'invalid'],
  attributeConfigurable: true,
  attributeList: [
    { key: '我是1', value: '类别1' },
    { key: '哈哈', value: 'class-Ad' },
    { key: '你', value: 'class-EX' },
    { key: '类别Hl', value: 'class-Hl' },
    { key: '类别J5', value: 'class-J5' },
    { key: '类别ve', value: 'class-ve' },
    { key: '类别oJ', value: 'class-oJ' },
    { key: '类别qz', value: 'class-qz' },
    { key: '类别0x', value: 'class-0x' },
    { key: '类别Hv', value: 'class-Hv' },
    { key: '类别sd', value: 'class-sd' },
    { key: '类别Ks', value: 'class-Ks' },
    { key: '类别7Y', value: 'class-7Y' },
    { key: '类别Ie', value: 'class-Ie' },
    { key: '类别6v', value: 'class-6v' },
    { key: '类别wX', value: 'class-wX' },
  ],
  textConfigurable: true,
  textCheckType: 0,
  customFormat: '',
};

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
        config={JSON.stringify(config)}
      />
    </div>
  );
};

export default Annotation;
