const MOCK_URL = 'http://127.0.0.1:7001/';
export const fileList = ['500001884', '500001885', '500001886', '100000031654', '100000031706'].map(
  (i) => `${MOCK_URL}/${i}.jpg`,
);

export const rectDefaultResult = JSON.stringify({
  height: 200,
  width: 100,
  rotate: 0,
  step_1: {
    dataSource: 0,
    tool: 'rectTool',
    result: [
      {
        id: 'xs23da23a',
        sourceID: '0',
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        valid: true,
        order: 1,
        attribute: '',
        textAttribute: '',
      },
    ],
  },
});

export const tagDefaultResult = JSON.stringify({
  height: 200,
  width: 100,
  rotate: 0,
  step_1: {
    dataSource: 0,
    tool: 'tagTool',
    result: [],
  },
});
