export const EStore = {
  LOCAL_PROJECT_LIST: 'honey-client-projectList'
}

export enum EToolName {
  /** 拉框工具 */
  Rect = "rectTool",
  /** 标签工具 */
  Tag = "tagTool",
  /** 标点工具 */
  Point = "pointTool",
  /** 列表标点工具 */
  PointMarker = "pointMarkerTool",
  /** 前景分割工具 */
  Segmentation = "segmentationTool",
  /** 筛选工具 */
  Filter = "filterTool",
  /** 文本工具 */
  Text = "textTool",
  /** 多边形工具 */
  Polygon = "polygonTool",
  /** 线条 */
  Line = "lineTool",
  /** 列表线条工具 */
  LineMarker = "lineMarkerTool",
  /** 空工具，表示当前没有选择的工具，没有实际的业务逻辑 */
  Empty = "emptyTool",
  /** 文件夹标签工具 */
  FolderTag = "folderTagTool",
  /** 拉框跟踪工具 */
  RectTrack = "rectTrackTool",
  /** 人脸106工具 */
  Face = "faceTool",
  /** 客户端属性工具 */
  ClientAttribute = "clientAttributeTool",
  /** OCR关联关系工具 */
  OCRRelation = "OCRRelationTool"
}
 
export const TOOL_NAME: {[key: string]: string} = {
  [EToolName.Rect]: '目标检测',
  [EToolName.Tag]: '目标分类',
  [EToolName.Polygon]: '语义分割',
  [EToolName.Point]: '标点',
  [EToolName.Line]: '划线',
  [EToolName.Text]: '文本',
}

// 文本标注类型
export enum ETextType {
  AnyString, // 任意字符
  Order, // 序号
  EnglishOnly, // 仅英文
  NumberOnly, // 仅数字
  CustomFormat, // 自定义文本格式
}

export const TEXT_TYPE = {
  0: '任意字符',
  1: '序号',
  2: '仅英文',
  3: '仅数字',
  4: '自定义文本格式',
};

/** 线条类型 */
export enum ELineTypes {
  Line,
  Curve,
}

/** 线条颜色 */
export enum ELineColor {
  SingleColor,
  MultiColor,
}