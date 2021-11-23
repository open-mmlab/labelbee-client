import { cloneDeep } from 'lodash';
import uuid from './uuid';
import { message } from 'antd';
import { IInputList } from '@/ProjectPlatform/CreateProjectModal/ToolConfig/TagConfig';

// export const DEFAULT_LINK = '@@';
// const DEFAULT_TOOL_ATTRIBUTE = ['valid', 'invalid'];

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
    lang: 'cn' | 'en';
  },
) => {
  inputList = cloneDeep(inputList);
  let baseClassName = '类别';
  let baseOptionName = '选项';

  switch (specialState?.lang) {
    case 'en':
      baseClassName = 'className';
      baseOptionName = 'optionName';
      break;
    default: {
      //
      break;
    }
  }

  if (i !== undefined) {
    if (inputList[i].subSelected) {
      const len = inputList[i].subSelected.length + 1;
      inputList[i].subSelected.push({
        key: `${baseOptionName}${i + 1}-${len}`,
        value: `option${i + 1}-${len}`,
        isDefault: false,
      });
    } else {
      inputList[i].subSelected = [
        { key: `${baseOptionName}${i + 1}-1`, value: `option${i + 1}-1`, isDefault: false },
      ];
    }
  } else {
    const len = inputList.length + 1;
    const id = uuid(2, 62);
    const newData = {
      key: `${baseClassName}${id}`,
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
        subSelected: [
          { key: `${baseOptionName}${len}-1`, value: `option${len}-1`, isMulti: false },
        ],
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
        inputList = inputList.map((v) => ({ ...v, isDefault: false }));
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

/**
 * 判断是否含有 key value 两个属性
 *
 * @param {Object} object
 * @returns
 */
export function isHasKeyValue(object: any) {
  if (typeof object?.key === 'string' && typeof object?.value === 'string') {
    return object?.key && object?.value;
  }

  return false;
}

/**
 * 判断是否符合标签工具的配置 IInputList
 * @param config
 */
export function judgeIsTagConfig(inputList: any) {
  if (Array.isArray(inputList)) {
    let formatNum = 0;
    for (const info of inputList) {
      if (isHasKeyValue(info)) {
        if (info?.subSelected) {
          if (Array.isArray(info?.subSelected)) {
            let num = 0;
            for (const d of info.subSelected) {
              if (isHasKeyValue(d)) {
                num++;
              }
            }

            if (num === info.subSelected.length) {
              formatNum++;
            }
          }
        }
      }
    }

    return formatNum === inputList.length;
  }
  return false;
}

export function repeatInputList(inputList?: IInputList[]) {
  if (!inputList) return false;
  let keyMap: { [key: string]: string[] } = {};
  let valMap: { [key: string]: string[] } = {};
  let isRepeat = false;
  function dep(list: IInputList[], key: string) {
    list.forEach((item, index: number) => {
      if (item.key === '' || item.value === '') {
        message.info('请填写完整标注的表单信息');
        isRepeat = true;
      }
      if (item.value.includes(';')) {
        message.info('value 并不能带有分号');
        isRepeat = true;
      }
      if (keyMap[key] || valMap[key]) {
        if (keyMap[key].includes(item.key) || valMap[key].includes(item.value)) {
          message.info('表单项不能设置相同的值！');
          isRepeat = true;
        }
        keyMap[key].push(item.key);
        valMap[key].push(item.value);
      } else {
        keyMap[key] = [item.key];
        valMap[key] = [item.value];
      }
      item.subSelected && dep(item.subSelected, `sub${index}`);
    });
  }
  dep(inputList, 'root');
  return isRepeat;
}
