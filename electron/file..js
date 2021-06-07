const fs = require('fs');
const path = require('path');

/**
 * 获取当前文件的所有文件路径
 * @param dirPath
 * @param existFiles
 */
const getFilesFromDirectory = (dirPaths, existFiles) => {
  const dirFiles = existFiles || [];
  const dirPath = Array.isArray(dirPaths) ? dirPaths[0] : dirPaths;
  const stat = fs.lstatSync(dirPath);

  if (stat.isDirectory()) {
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
      const filePath = path.resolve(dirPath.toString(), file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isFile()) {
        dirFiles.push(filePath);
      }

      if (fileStat.isDirectory()) {
        getFilesFromDirectory(filePath, dirFiles);
      }
    });
  }

  return dirFiles;
};
module.exports = {
  getFilesFromDirectory,
};
