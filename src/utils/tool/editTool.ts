
import { cloneDeep } from 'lodash';
import uuid from './uuid';

export const DEFAULT_LINK = '@@';
const DEFAULT_TOOL_ATTRIBUTE = ['valid', 'invalid'];

/**
 * 添加步骤单元
 * @param inputList 原步骤信息
 * @param isInitSubSelected 是否需要添加 subSelected
 * @param i 是否是 subSelected 进行创建
 * @param specialState // 是否需要创建一个顶层的默认属性
 */
export const addInputList = (
  inputList: any,
  isInitSubSelected: boolean,
  i?: number,
  specialState?: {
    isMulti?: boolean;
    isDefault?: boolean;
  },
) => {
  inputList = cloneDeep(inputList);
  if (i !== undefined) {
    if (inputList[i].subSelected) {
      const len = inputList[i].subSelected.length + 1;
      inputList[i].subSelected.push({
        key: `选项${i + 1}-${len}`,
        value: `option${i + 1}-${len}`,
        isDefault: false,
      });
    } else {
      inputList[i].subSelected = [
        { key: `选项${i + 1}-1`, value: `option${i + 1}-1`, isDefault: false },
      ];
    }
  } else {
    const len = inputList.length + 1;
    const id = uuid(2, 62);
    const newData = {
      key: `类别${id}`,
      value: `class-${id}`,
    };

    if (specialState?.isMulti === true) {
      Object.assign(newData, { isMulti: false });
    }

    if (specialState?.isDefault === true) {
      Object.assign(newData, { isDefault: false });
    }

    if (isInitSubSelected) {
      Object.assign(newData, {
        subSelected: [{ key: `选项${len}-1`, value: `option${len}-1`, isMulti: false }],
      });
    }
    inputList.push(newData);
  }

  return inputList;
};

/**
 * 清除标签的配置中的所有 default 状态
 *
 * @export
 * @param {IInputList[]} inputList
 * @param {number} index
 * @return
 */
 export function clearTagDefault(inputList: any[], index: number) {
  inputList = cloneDeep(inputList);

  if (!inputList[index]?.subSelected) {
    return inputList;
  }

  inputList[index].subSelected = inputList[index].subSelected?.map((v: any) => ({
    ...v,
    isDefault: false,
  }));

  return inputList;
}

// 更改标签工具里面的对应值
export const changeInputList = (
  e: any,
  target: 'key' | 'value' | 'isMulti' | 'isDefault',
  inputList: any[],
  index: number,
  subIndex?: number,
) => {
  inputList = cloneDeep(inputList);
  switch (target) {
    case 'key':
      if (subIndex !== undefined && inputList[index].subSelected) {
        inputList[index].subSelected[subIndex].key = e.target.value;
      } else {
        inputList[index].key = e.target.value;
      }
      break;

    case 'value':
      if (subIndex !== undefined && inputList[index].subSelected) {
        inputList[index].subSelected[subIndex].value = e.target.value;
      } else {
        inputList[index].value = e.target.value;
      }
      break;

    case 'isMulti': {
      const isMulti = !inputList[index].isMulti;
      inputList[index].isMulti = isMulti;

      // 初始化所有 subSelected 的值
      if (isMulti === false) {
        inputList = clearTagDefault(inputList, index);
      }
      break;
    }

    case 'isDefault':
      if (subIndex !== undefined && inputList[index].subSelected) {
        const isDefault = !inputList[index].subSelected[subIndex].isDefault;

        if (isDefault === true && inputList[index].isMulti !== true) {
          // 仅为一个 isDefault
          inputList = clearTagDefault(inputList, index);
        }

        inputList[index].subSelected[subIndex].isDefault = isDefault;
      } else {
        const newIsDefault = !inputList[index].isDefault;

        // 顶层更新数据更新
        inputList = inputList.map(v => ({ ...v, isDefault: false }));
        inputList[index].isDefault = newIsDefault;
      }
      break;
  }
  return inputList;
};

// 删除对应输入
export const deleteInputList = (inputList: any[], i: number, subIndex?: number) => {
  inputList = cloneDeep(inputList);
  if (subIndex !== undefined) {
    if (inputList[i].subSelected.length <= 1) {
      return inputList;
    }

    inputList[i].subSelected = [
      ...inputList[i].subSelected.slice(0, subIndex),
      ...inputList[i].subSelected.slice(subIndex + 1, inputList[i].subSelected.length),
    ];
  } else {
    inputList = [...inputList.slice(0, i), ...inputList.slice(i + 1, inputList.length)];
  }
  return inputList;
};