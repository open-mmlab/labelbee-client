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
