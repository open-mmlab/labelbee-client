/**
 *  数据转换
 */

import { EToolName } from '@/constant/store';
import { IFileInfo } from '@/store';
import { jsonParser } from './tool/common';
import { DrawUtils } from '@labelbee/lb-annotation';
import ColorCheatSheet from '@/assets/color.json';

// 获取 color cheat sheet 内的颜色
export const getRgbFromColorCheatSheet = (index: number) => {
  const rgb = ColorCheatSheet[index].rgb;
  return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
};

export const getRgbaColorListFromColorCheatSheet = (index: number) => {
  const rgb = ColorCheatSheet[index].rgb;
  return [rgb.r, rgb.g, rgb.b, 255];
};

interface CocoDataFormat {
  // 导出数据无需支持
  // info: {
  //   year: number;
  //   version: string;
  //   description: string;
  //   contributor: string;
  //   url: string;
  //   date_created: string; // date_time - 2017/09/01
  // };
  images: Array<ICocoImage>;
  annotations: Array<ICocoObjectDetection>;
  category: Array<{
    id: number;
    name: string;
    supercategory: string;
  }>;
}

interface ICocoImage {
  id: number;
  width: number;
  height: number;
  file_name: string;
  // 导出数据无需支持
  // license: number;
  // flickr_url: string;
  // coco_url: string;
  // date_captured: string;

  // LabelBee 补充内容
  valid?: boolean;
  rotate?: number;
}

interface ICocoObjectDetection {
  id: number;
  image_id: number;
  category_id: number;
  segmentation: number[]; // RLE or [polygon]， 现只支持 [polygon] 格式
  area: number;
  bbox: number[]; // 检测框, x, y, width, height

  // 导出数据无需支持
  iscrowd: 0 | 1; // 0 代表 segmentation 使用 [polygon] 形式， 1 代表 RLE 格式

  textAttribute?: string; // 对其内部数据
  order?: number;
  valid?: boolean;
}

/**
 * 平台默认多边形
 */
interface IDefaultPolygon {
  x: number;
  y: number;
}

export default class DataTransfer {
  /**
   * 将 sensebee 多边形点集转换成的 COCO - POLYGON 格式
   * @param pointList
   * @returns
   */
  public static transferPolygon2CocoPolygon(pointList: IDefaultPolygon[]) {
    return pointList.reduce<number[]>((acc, cur) => [...acc, cur.x, cur.y], []);
  }

  /**
   * 获取多边形面积
   * @param pointList
   * @returns
   */
  public static getPolygonArea(pointList: IDefaultPolygon[]) {
    let total = 0;

    for (let i = 0, l = pointList.length; i < l; i++) {
      const addX = pointList[i].x;
      const addY = pointList[i == pointList.length - 1 ? 0 : i + 1].y;
      const subX = pointList[i == pointList.length - 1 ? 0 : i + 1].x;
      const subY = pointList[i].y;

      total += addX * addY * 0.5;
      total -= subX * subY * 0.5;
    }

    return Math.abs(total);
  }

  /**
   * 获取当前的多边形的边缘 bbox
   * @param pointList
   * @returns
   */
  public static getPolygonBbox(pointList: IDefaultPolygon[]) {
    if (pointList.length < 3 || !pointList.length) {
      return 0;
    }

    let ltx = Number.MAX_SAFE_INTEGER;
    let lty = Number.MAX_SAFE_INTEGER;
    let rbx = 0;
    let rby = 0;

    pointList.forEach((polygon) => {
      if (polygon.x < ltx) {
        ltx = polygon.x;
      }
      if (polygon.y < lty) {
        lty = polygon.y;
      }

      if (polygon.x > rbx) {
        rbx = polygon.x;
      }
      if (polygon.y > rby) {
        rby = polygon.y;
      }
    });
    return [ltx, lty, rbx - ltx, rby - lty];
  }

  /**
   * 将 sensebee 格式转换为 coco 格式
   * 仅限工具： 拉框、多边形
   * 1. 拉框 - 属性属性解析
   * 2. 多边形
   * @param fileList
   */
  public static transferDefault2Coco(fileList: IFileInfo[]) {
    const mainObject: CocoDataFormat = {
      images: [],
      annotations: [],
      category: [
        {
          id: 0,
          name: '',
          supercategory: '',
        },
      ],
    };

    let image_id = 1;
    let result_id = 1;

    fileList.forEach((info) => {
      const result = jsonParser(info.result);
      // 1. 添加图片基础信息
      const images: ICocoImage = {
        id: image_id,
        file_name: info.url,
        width: result?.width ?? 0,
        height: result?.height ?? 0,
        valid: result?.valid ?? true,
        rotate: result?.rotate ?? 0,
      };

      // 2. 标注结果
      const annotation: any[] = [];

      // 获取当前标注
      const getCategoryID = (data: any) => {
        let category_id = 0; // 0 默认为

        if (data?.attribute) {
          const category = mainObject.category.find((v) => v.name === data.attribute);
          if (category) {
            category_id = category.id;
          } else {
            category_id = mainObject.category.length + 1;
            mainObject.category.push({
              id: category_id,
              name: data.attribute,
              supercategory: '',
            });
          }
        }
        return category_id;
      };

      // TODO 默认使用第一步的数据
      const step1Result = result['step_1']?.result;
      switch (result['step_1']?.toolName) {
        case EToolName.Rect:
          step1Result?.forEach((rect: any) => {
            let category_id = getCategoryID(rect);
            const defaultData = {
              image_id,
              id: result_id,
              bbox: [rect.x, rect.y, rect.width, rect.height],
              iscrowd: 0,
              segmentation: [],
              category_id,
            };

            if (rect.textAttribute) {
              Object.assign(defaultData, { textAttribute: rect.textAttribute });
            }
            if (rect.order) {
              Object.assign(defaultData, { order: rect.order });
            }

            annotation.push(defaultData);
            result_id++;
          });
          break;
        case EToolName.Polygon:
          step1Result?.forEach((polygon: any) => {
            let category_id = getCategoryID(polygon);
            const defaultData = {
              image_id,
              id: result_id,
              iscrowd: 0,
              segmentation: [this.transferPolygon2CocoPolygon(polygon.pointList)],
              area: this.getPolygonArea(polygon.pointList),
              bbox: this.getPolygonBbox(polygon.pointList),
              category_id,
            };
            if (polygon.textAttribute) {
              Object.assign(defaultData, { textAttribute: polygon.textAttribute });
            }
            if (polygon.order) {
              Object.assign(defaultData, { order: polygon.order });
            }
            annotation.push(defaultData);
            result_id++;
          });
          break;

        default: {
          //
        }
      }

      mainObject.images.push(images);
      mainObject.annotations = mainObject.annotations.concat(annotation);
      image_id++;
    });
    return mainObject;
  }

  /**
   * 导出 Mask 的格式数据
   * @param width
   * @param height
   * @param polygon
   * @param defaultKeyList
   * @returns
   */
  public static transferPolygon2ADE20k(
    width: number,
    height: number,
    polygon: any[],
    defaultKeyList: string[] = [],
  ) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const keyList: string[] = [...defaultKeyList];

    // 背景绘制为的 0 - 全黑 - rgb (0,0,0)
    DrawUtils.drawRectWithFill(canvas, { x: 0, y: 0, width, height }, { color: `rgb(0, 0, 0)` });

    if (polygon.length > 0) {
      polygon.forEach((p) => {
        let key = '';
        if (p.attribute) {
          key = p.attribute;
        }

        let colorIndex = keyList.findIndex((v) => v === key);
        if (colorIndex === -1) {
          keyList.push(key);
          colorIndex = keyList.length - 1;
        }

        DrawUtils.drawPolygonWithFill(canvas, p.pointList, {
          color: getRgbFromColorCheatSheet(colorIndex + 1),
        });
      });
    }

    const MIME_TYPE = 'image/png';

    // Get the DataUrl from the Canvas
    const url = canvas.toDataURL(MIME_TYPE, 1);

    // remove Base64 stuff from the Image
    const base64Data = url.replace(/^data:image\/png;base64,/, '');

    return [base64Data, keyList];
  }

  /**
   * 导出灰值图
   * canvas 仅能导出三通道的值，暂时以上相同值导出
   * @param width
   * @param height
   * @param polygon
   * @param defaultKeyList
   * @returns
   */
  public static transferPolygon2Gray(
    width: number,
    height: number,
    polygon: any[],
    defaultKeyList: string[] = [],
  ) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const keyList: string[] = [...defaultKeyList];

    // 背景绘制为的 0 - 全黑 - rgb (0,0,0)
    DrawUtils.drawRectWithFill(canvas, { x: 0, y: 0, width, height }, { color: `rgb(0, 0, 0)` });
    if (polygon.length > 0) {
      polygon.forEach((p) => {
        let key = '';
        if (p.attribute) {
          key = p.attribute;
        }

        let colorIndex = keyList.findIndex((v) => v === key);
        if (colorIndex === -1) {
          keyList.push(key);
          colorIndex = keyList.length - 1;
        }

        const trainIds = colorIndex + 1;
        DrawUtils.drawPolygonWithFill(canvas, p.pointList, {
          color: `rgb(${trainIds},${trainIds},${trainIds})`,
        });
      });
    }

    const MIME_TYPE = 'image/png';

    // Get the DataUrl from the Canvas
    const url = canvas.toDataURL(MIME_TYPE, 1);

    // remove Base64 stuff from the Image
    const base64Data = url.replace(/^data:image\/png;base64,/, '');

    return [base64Data, keyList];
  }
}
