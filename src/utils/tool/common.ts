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

export function formatDate(date: Date, fmt: string){
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1, (date.getFullYear()+'').substr(4-RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth()+1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for(let k in o){
    // @ts-ignore
    let str = o[k]+'';
    if(new RegExp(`(${k})`).test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1)?str:padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str: string){
  return ('00'+str).substr(str.length);
}

export function getCreateProjectCmt(showBase: boolean, Base: ReactNode, Step: ReactNode) {
  return showBase ? Base : Step
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