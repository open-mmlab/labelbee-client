const fs = require('fs');
const path = require('path');

const getFileSuffix = (filename) => {
  if (filename && filename.includes('.')) {
    return filename.split('.').pop().toLocaleLowerCase();
  }
  return '';
};

/**
 * 获取当前文件的所有文件路径
 * @param dirPath
 * @param existFiles
 */
export const getFilesFromDirectory = (
  dirPaths: string | string[],
  supportedSuffix: string[],
  existFiles?: string[],
) => {
  const dirFiles = existFiles || [];
  const dirPath = Array.isArray(dirPaths) ? dirPaths[0] : dirPaths;
  const stat = fs.lstatSync(dirPath);

  if (stat.isDirectory()) {
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
      const filePath = path.resolve(dirPath.toString(), file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isFile()) {
        const suffix = getFileSuffix(file);
        if (!supportedSuffix || supportedSuffix.includes(suffix)) {
          dirFiles.push(filePath);
        }
      }

      if (fileStat.isDirectory()) {
        getFilesFromDirectory(filePath, supportedSuffix, dirFiles);
      }
    });
  }

  return dirFiles;
};

/**
 * 获取当前图片的json url
 * @param path
 * @param supportedSuffix
 * @returns
 */
export const getResultFromImg = (path: string, supportedSuffix: string[]) => {
  const fileName = path.split('.');

  const suffix = fileName.slice(-1)[0]?.toLowerCase() ?? '';

  if (supportedSuffix.includes(suffix)) {
    fileName.push('json');
    return fileName.join('.');
  }

  return '';
};

/**
 * 通过图片路径 + 图片文件夹 + 结果文件夹路径，得到结果文件夹
 * @param url
 * @param path
 * @param resultPath
 * @returns
 */
export const getResultPathFromImgPath = (url: string, path: string, resultPath: string) => {
  const urls = url.split(path);
  if (urls.length === 1) {
    // 返回自己
    return url;
  }

  urls.shift();
  urls.unshift(resultPath);

  return urls.join('');
};

/**
 * 通过图片路径 + 图片文件夹 + 结果文件夹路径，获取图片的相对路径
 * @param url
 * @param path
 * @param resultPath
 * @returns
 */
export const getImgRelativePath = (url: string, path: string, resultPath: string) => {
  const urls = url.split(path);
  if (urls.length === 1) {
    // 返回自己
    return url;
  }

  urls.shift();

  return urls.join('');
};
