# 通用工具字段概念详解

## 格式说明

```json
{
  "width": 1024,
  "height": 681,
  "rotate": 0,
  "valid": true,
  "step_1": {
    "dataSourceStep": 0,
    "toolName": "rectTool",
    "result": [
      {
        "x": 200.91597,
        "y": 157.15384,
        "width": 174.88402,
        "height": 227.26863,
        "order": 1,
        "valid": true,
        "id": "omd8QAY7",
        "sourceID": "0",
        "attribute": "attribute_1",
        "textAttribute": "我是文本"
      }
    ]
  }
}
```

<table style="table-layout: auto;"><colgroup><col style="width: 200px;"><col style="width: 100px;"><col style="width: 80px;"><col style="width: 80px;"><col><col style="width: 180px;"></colgroup><thead class="ant-table-thead"><tr><th class="ant-table-cell">名称</th><th class="ant-table-cell">类型</th><th class="ant-table-cell">是否必须</th><th class="ant-table-cell">默认值</th><th class="ant-table-cell">备注</th><th class="ant-table-cell">其他信息</th></tr></thead><tbody class="ant-table-tbody"><tr data-row-key="0-0" class="ant-table-row ant-table-row-level-0"><td class="ant-table-cell">dataSourceStep</td><td class="ant-table-cell"><span>number</span></td><td class="ant-table-cell"><div>必须</div></td><td class="ant-table-cell"><div></div></td><td class="ant-table-cell"><span class="table-desc">表示当前步骤所依赖的步骤。在包含多个标注步骤的任务中，用于指明步骤间前后关系</span></td><td class="ant-table-cell"></td></tr><tr data-row-key="0-1" class="ant-table-row ant-table-row-level-0"><td class="ant-table-cell">sourceID</td><td class="ant-table-cell"><span>string</span></td><td class="ant-table-cell"><div>必须</div></td><td class="ant-table-cell"><div></div></td><td class="ant-table-cell"><span class="table-desc">表示当前结果依赖的框体ID。用于依赖关系下的查询。

当前结果依赖为原图时，需填写 ""  -  空串。

当前结果依赖为其他框体，需填写依赖框体的 ID。</span></td><td class="ant-table-cell"></td></tr><tr data-row-key="0-2" class="ant-table-row ant-table-row-level-0"><td class="ant-table-cell">id</td><td class="ant-table-cell"><span>string</span></td><td class="ant-table-cell"><div>必须</div></td><td class="ant-table-cell"><div></div></td><td class="ant-table-cell"><span class="table-desc">结果对象 ID （例如矩形/多边形） 。全局唯一，多步骤任务中，可用于查找

预标注结果的"id"字段，请使用随机8位字符串，以免出现兼容性问题。</span></td><td class="ant-table-cell"></td></tr><tr data-row-key="0-3" class="ant-table-row ant-table-row-level-0"><td class="ant-table-cell">valid</td><td class="ant-table-cell"><span>boolean</span></td><td class="ant-table-cell"><div>必须</div></td><td class="ant-table-cell"><div></div></td><td class="ant-table-cell"><span class="table-desc">图片 / 结果的有效性（看valid 的位置）</span></td><td class="ant-table-cell"></td></tr><tr data-row-key="0-4" class="ant-table-row ant-table-row-level-0"><td class="ant-table-cell">order</td><td class="ant-table-cell"><span>string</span></td><td class="ant-table-cell"><div>必须</div></td><td class="ant-table-cell"><div></div></td><td class="ant-table-cell"><span class="table-desc">标注结果属性，用于表示当前对象的顺序号（并不一定连续）</span></td><td class="ant-table-cell"></td></tr></tbody></table>