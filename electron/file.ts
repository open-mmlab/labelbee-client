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

  const suffix = fileName.slice(-1)[0];

  if (supportedSuffix.includes(suffix)) {
    fileName.push('json');
    return fileName.join('.');
  }

  return '';
};

/**
 * 获取当前路径下的结果集合
 * @param files
 * @param supportedSuffix
 * @returns
 */
export const getResultFromFiles = (files: any[], supportedSuffix: string[]) => {
  return files.map((file, i) => {
    const url = 'file:///' + file;
    try {
      const result = fs.readFileSync(getResultFromImg(file, supportedSuffix));
      return {
        id: i + 1,
        result: result.toString(),
        url,
      };
    } catch {
      return {
        id: i + 1,
        result: '{}',
        url,
      };
    }
  });
};
