const rectConfigString = JSON.stringify({
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

const tagConfigString = JSON.stringify({
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
      isMulti: false,
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

export const stepList = [
  {
    step: 1,
    dataSourceStep: 0,
    tool: 'rectTool',
    config: rectConfigString,
  },
];
