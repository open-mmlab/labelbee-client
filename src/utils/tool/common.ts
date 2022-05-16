import { isObject } from 'lodash';
import { IProjectType } from '@/ProjectPlatform';
import { ReactNode } from 'react';

export function checkNumber(v: string) {
  const reg = /^[1-9]\d*$/g;
  if (reg.test(v)) {
    return true;
  }
  return false;
}

export function formatDate(date: Date, fmt: string) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let k in o) {
    // @ts-ignore
    let str = o[k] + '';
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str: string) {
  return ('00' + str).substr(str.length);
}

export function getCreateProjectCmt(showBase: boolean, Base: ReactNode, Step: ReactNode) {
  return showBase ? Base : Step;
}

export const jsonParser = (content: any, defaultValue: any = {}) => {
  try {
    if (typeof content === 'string') {
      return JSON.parse(content);
    } else {
      return isObject(content) ? content : defaultValue;
    }
  } catch (e) {
    return defaultValue;
  }
};

/**
 * 复制文本
 * @param text
 * @param element
 */
export const copyText = (text: string, element: 'input' | 'textarea' = 'input') => {
  const copyInput = document.createElement(element);
  copyInput.setAttribute(
    'style',
    `
      display: 'none'
    `,
  );

  document.body.appendChild(copyInput);

  copyInput.value = text;
  copyInput.select();

  document.execCommand('copy');
  document.body.removeChild(copyInput);
};

/**
 * 截取文件名
 * @param path - 文件路径
 */
export const getBaseName = (path: string) => {
  const separator = /^Win/.test(navigator.platform) ? '\\' : '/';
  const splitPath = path.split(separator);
  return splitPath[splitPath.length - 1];
};
