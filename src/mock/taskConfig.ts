export const rectConfigString = JSON.stringify({
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
});

export const tagConfigString = JSON.stringify({
  showConfirm: true,
  skipWhileNoDependencies: false,
  inputList: [
    {
      key: '类别1',
      value: 'class1',
      isMulti: false,
      subSelected: [
        { key: '选项1', value: 'option1', isDefault: false },
        { key: '选项2', value: 'option1-2', isDefault: false },
      ],
    },
    {
      key: '类别2',
      value: 'class-AH',
      isMulti: true,
      subSelected: [
        { key: '选项2-1', value: 'option2-1', isMulti: false },
        { key: '选项2-2', value: 'option2-2', isDefault: false },
        { key: '选项2-3', value: 'option2-3', isDefault: false },
      ],
    },
    {
      key: '类别3',
      value: 'class-0P',
      isMulti: false,
      subSelected: [
        { key: '选项3-1', value: 'option3-1', isMulti: false },
        { key: '选项3-2', value: 'option3-2', isDefault: false },
        { key: '选项3-3', value: 'option3-3', isDefault: false },
      ],
    },
  ],
});

export const polygonnConfigString = JSON.stringify({
  lineType: 0,
  lineColor: 0,
  lowerLimitPointNum: 3,
  upperLimitPointNum: 20,
  edgeAdsorption: true,
  drawOutsideTarget: false,
  copyBackwardResult: false,
  isShowOrder: false,
  attributeConfigurable: true,
  attributeList: [
    { key: '类别1', value: '类别1' },
    { key: '类别tT', value: 'class-tT' },
    { key: '类别FM', value: 'class-FM' },
    { key: '类别r6', value: 'class-r6' },
    { key: '类别Rs22222类别Rs22222', value: 'class-Rs' },
    { key: '类别rp', value: 'class-rp' },
    { key: '类别rp2', value: 'class-rp2' },
    { key: '类别rp3', value: 'class-rp3' },
    { key: '类别Rs4', value: 'class-Rs4' },
    { key: '类别rp5', value: 'class-rp5' },
  ],
  textConfigurable: true,
  textCheckType: 0,
  customFormat: '',
});

export const lineConfigString = JSON.stringify({
  lineType: 0,
  lineColor: 0,
  lowerLimitPointNum: 2,
  upperLimitPointNum: 20,
  edgeAdsorption: true,
  drawOutsideTarget: false,
  copyBackwardResult: false,
  isShowOrder: false,
  attributeConfigurable: true,
  attributeList: [
    { key: '类别1', value: '类别1' },
    { key: '类别tT', value: 'class-tT' },
    { key: '类别FM', value: 'class-FM' },
    { key: '类别r6', value: 'class-r6' },
    { key: '类别Rs22222类别Rs22222', value: 'class-Rs' },
    { key: '类别rp', value: 'class-rp' },
    { key: '类别rp2', value: 'class-rp2' },
    { key: '类别rp3', value: 'class-rp3' },
    { key: '类别Rs4', value: 'class-Rs4' },
    { key: '类别rp5', value: 'class-rp5' },
  ],
  textConfigurable: true,
  textCheckType: 0,
  customFormat: '',
});


const pointConfig = JSON.stringify({
  showConfirm: false,
  drawOutsideTarget: false,
  copyBackwardResult: true,
  upperLimit: 60,
  isShowOrder: true,
  attributeConfigurable: true,
  attributeList: [
    { key: '玩偶', value: 'doll' },
    { key: '喷壶', value: 'wateringCan' },
    { key: '脸盆', value: 'washbasin' },
    { key: '保温杯', value: 'vacuumCup' },
    { key: '纸巾', value: 'tissue' },
    { key: '水壶', value: 'kettle' },
  ],
  textConfigurable: true,
  textCheckType: 0,
  customFormat: '',
})

const textConfig = JSON.stringify({
  showConfirm: false,
  skipWhileNoDependencies: false,
  enableTextRecognition: true,
  recognitionMode: 'general',
  configList: [
    { label: '文本', key: 'text', required: false, default: '从现在', maxLength: 1000 },
    { label: '文本2', key: 'text2', required: true, default: '多少啊', maxLength: 1000 },
    { label: '文本3', key: 'text3', required: true, default: '2431阿斯顿23', maxLength: 1000 },
  ],
})

export const stepList = [
  // {
  //   step: 1,
  //   dataSourceStep: 0,
  //   tool: 'polygonTool',
  //   config: polygonnConfigString,
  // },
  {
    step: 1,
    dataSourceStep: 0,
    tool: 'rectTool',
    config: rectConfigString,
  },
  // {
  //   step: 1,
  //   dataSourceStep: 0,
  //   tool: 'tagTool',
  //   config: tagConfigString,
  // },
];
