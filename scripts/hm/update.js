/**
 * 更改 hm 内的版本信息，用于 Electron 内版本跟 package.json 的同步
 */

const fs = require('fs');
const path = require('path');
const package = require('../../package.json');

try {
  const hmString = fs.readFileSync(path.resolve(__dirname, './hm-origin.js'), 'utf-8');
  let href = "window.location.href.split('/').slice(-1)[0]";
  let host = `"labelbee-Client-${package.version.replace(/\./g, '_')}.sensebee.xyz"`;

  const hmFormat = hmString
    .replace(/document.location.hostname/g, `${host}`) // file和chrome-extension等协议不存在document.location.hostname,直接使用新增网站时的网站域名来替代
    .replace(/window.location.host|document.location.host/g, `${host}`) // file和chrome-extension等协议不存在document.location.host,直接使用新增网站时的网站域名来替代
    .replace(
      /window.location.href|document.location.href/g,
      `"https://${host.replace(/"/gi, '')}/" + ` + href,
    ) // file和chrome-extension等协议的访问路径过长，直接使用url中最后的一个字符"/"后面的路径替换
    .replace('/https?:/.test(document.location.protocol)', `true`); // 不校验协议

  fs.writeFileSync('./public/hm.js', hmFormat);
  console.log(`HM 打点版本更改至 ${package.version}`);
} catch (err) {
  console.error(err);
}
