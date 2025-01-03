<template>
  <el-form-item
    v-for="(attr_item, key) in props.objInfo"
    :key="key"
    :label="attr_item.title"
    size="small"
  >
    <el-select
      v-if="attr_item.type === EConfigItemPropsType.Select"
      v-model="attr_item.val"
      placeholder="Select"
      size="small"
      :disabled="attr_item?.disabled"
    >
      <el-option
        v-for="item in attr_item.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-input-number
      v-else-if="attr_item.type === EConfigItemPropsType.InputNumber"
      v-model="attr_item.val"
      :disabled="attr_item?.disabled"
    ></el-input-number>
    <el-tree-select
      v-else-if="attr_item.type === EConfigItemPropsType.TreeSelect"
      v-model="attr_item.val"
      :data="attr_item.options"
      placeholder="请选择"
      size="small"
      :disabled="attr_item?.disabled"
    ></el-tree-select>
    <el-input
      v-else-if="attr_item.type === EConfigItemPropsType.Input"
      v-model="attr_item.val"
      :disabled="attr_item?.disabled"
    ></el-input>
    <el-color-picker
      v-else-if="attr_item.type === EConfigItemPropsType.Color"
      v-model="attr_item.val"
      :disabled="attr_item?.disabled"
    ></el-color-picker>
    <el-switch
      v-else-if="attr_item.type === EConfigItemPropsType.Switch"
      v-model="attr_item.val"
      :disabled="attr_item?.disabled"
    ></el-switch>
    <json-edit
      v-else-if="attr_item.type === EConfigItemPropsType.JsonEdit"
      :content-obj="attr_item.val"
      :disabled="attr_item?.disabled"
      @update-attr-item-val="(val) => updateAttrItemVal(attr_item, val)"
    ></json-edit>
  </el-form-item>
</template>
<script setup lang="ts">
  import { EConfigItemPropsType, IConfigItemProps } from '@/config-center/types';
  import { ElTreeSelect } from 'element-plus';
  import {
    ElFormItem,
    ElColorPicker,
    ElInputNumber,
    ElInput,
    ElSelect,
    ElOption,
    ElSwitch
  } from 'element-plus';
  import { PropType, onMounted, watch, toRefs } from 'vue';
  import JsonEdit from '@/components/webtopo-svg-edit/components/right-panel/json-edit.vue';
  const props = defineProps({
    objInfo: {
      type: Object as PropType<IConfigItemProps>,
      default: () => {}
    },
    svgInfo: {
      type: Object as PropType<IConfigItemProps>,
      default: () => {}
    }
  });
  const updateAttrItemVal = (
    attr_item: {
      title: string;
      type: EConfigItemPropsType;
      val: any;
      options?: any;
      disabled?: boolean | undefined;
    },
    val: any
  ) => {
    attr_item.val = val;
  };
  // function findMatchingObject(
  //   previewData: { done_json: any },
  //   svgInfo: { info: { id: any } },
  //   newColor: undefined
  // ) {
  //   const doneJson = previewData.done_json;
  //   if (!doneJson || !Array.isArray(doneJson)) {
  //     throw new Error('Invalid previewData structure');
  //   }

  //   // 找到目标项
  //   const targetItem = doneJson.find((item) => item.id === svgInfo.info.id);

  //   if (!targetItem) {
  //     throw new Error('No matching item found in previewData');
  //   }

  //   // 修改颜色
  //   if (targetItem.props && targetItem.props.fill) {
  //     targetItem.props.fill.val = newColor;
  //   } else {
  //     throw new Error('Target item does not have a fill property');
  //   }

  //   // 将修改后的数据存储回 previewData
  //   const updatedPreviewData = { ...previewData, done_json: [...doneJson] };

  //   return updatedPreviewData;
  // }
  function findMatchingObject(
    previewData: { done_json: any },
    svgInfo: { info: { id: any } },
    newColor: any
  ) {
    function recursiveFind(items: any[]): boolean {
      for (const item of items) {
        console.log('正在检查 item.id:', item.id, '目标 id:', svgInfo.info.id);
        if (item.id === svgInfo.info.id) {
          if (item.props && item.props.fill) {
            item.props.fill.val = newColor;
          } else {
            throw new Error('目标项没有 fill 属性');
          }
          return true;
        } else if (item.children && item.children.length > 0) {
          if (recursiveFind(item.children)) {
            return true;
          }
        }
      }
      return false;
    }

    const doneJson = previewData.done_json;
    if (!doneJson || !Array.isArray(doneJson)) {
      console.error('previewData 结构无效:', previewData);
      throw new Error('previewData 结构无效');
    }

    const found = recursiveFind(doneJson);
    if (!found) {
      console.error('未找到匹配项，svgInfo:', svgInfo, 'doneJson:', doneJson);
      // throw new Error('在 previewData 中未找到匹配项');
    }

    return previewData;
  }

  const oldObjInfo = JSON.parse(JSON.stringify(props.objInfo));
  watch(
    () => props.objInfo,
    (newVal, oldVal) => {
      console.log('newVal:', newVal, props.objInfo, props.svgInfo);
      // newVal：  {
      //     "fill": {
      //         "title": "填充色",
      //         "type": "Color",
      //         "val": "#ff0000"
      //     },
      //     "voltage": {
      //         "title": "电压等级",
      //         "type": "Select",
      //         "val": "500kv",
      //         "options": [
      //             {
      //                 "value": "1000/800kv",
      //                 "label": "1000/800kv"
      //             },
      //             {
      //                 "value": "750/660kv",
      //                 "label": "750/660kv"
      //             },
      //             {
      //                 "value": "500kv",
      //                 "label": "500kv"
      //             },
      //             {
      //                 "value": "330kv",
      //                 "label": "330kv"
      //             },
      //             {
      //                 "value": "220kv",
      //                 "label": "220kv"
      //             },
      //             {
      //                 "value": "110kv",
      //                 "label": "110kv"
      //             },
      //             {
      //                 "value": "66kv",
      //                 "label": "66kv"
      //             },
      //             {
      //                 "value": "35kv",
      //                 "label": "35kv"
      //             },
      //             {
      //                 "value": "20kv",
      //                 "label": "20kv"
      //             },
      //             {
      //                 "value": "15kv",
      //                 "label": "15kv"
      //             },
      //             {
      //                 "value": "13kv",
      //                 "label": "13kv"
      //             },
      //             {
      //                 "value": "10kv",
      //                 "label": "10kv"
      //             },
      //             {
      //                 "value": "6kv",
      //                 "label": "6kv"
      //             },
      //             {
      //                 "value": "0kv",
      //                 "label": "0kv"
      //             },
      //             {
      //                 "value": "0W",
      //                 "label": "0W"
      //             },
      //             {
      //                 "value": "0B",
      //                 "label": "0B"
      //             }
      //         ],
      //         "colorMap": {
      //             "1000/800kv": "#FF0000",
      //             "750/660kv": "#00FF00",
      //             "500kv": "#0000FF",
      //             "330kv": "#FFFF00",
      //             "220kv": "#FF00FF",
      //             "110kv": "#00FFFF",
      //             "66kv": "#800000",
      //             "35kv": "#808000",
      //             "20kv": "#008000",
      //             "15kv": "#800080",
      //             "13kv": "#008080",
      //             "10kv": "#000080",
      //             "6kv": "#C0C0C0",
      //             "0kv": "#808080",
      //             "0W": "#FFFFFF",
      //             "0B": "#000000"
      //         }
      //     }
      // }
      for (const key in newVal) {
        console.log(key, 'key232323', newVal[key].val, oldVal[key].val);
        let previewData = JSON.parse(localStorage.getItem('preview_data') || '{}');
        const color = newVal[key].colorMap && newVal[key].colorMap[newVal[key].val];
        const matchingObject = findMatchingObject(previewData, props.svgInfo, color);
        console.log(
          previewData,
          matchingObject,
          'kasldf234',
          newVal[key].val,
          newVal[key].colorMap,
          color
        );
        localStorage.setItem('preview_data', JSON.stringify(matchingObject));
        if (newVal[key].val !== oldObjInfo[key].val) {
          console.log(
            `组件 "${props.objInfoTitle}" 的 "${newVal[key].title}" 下拉框值从 "${oldObjInfo[key].val}" 变为 "${newVal[key].val}"`
          );
          // 更新旧值
          oldObjInfo[key].val = newVal[key].val;
        }
        // previewData：  {
        //     "layout_center": {
        //         "x": -89,
        //         "y": 38
        //     },
        //     "config": {
        //         "scale": 1,
        //         "position_center": {
        //             "x": -333,
        //             "y": -113
        //         },
        //         "svg_position_center": {
        //             "x": 50,
        //             "y": 50
        //         },
        //         "grid": true,
        //         "ruler": true
        //     },
        //     "done_json": [
        //         {
        //             "id": "device-monitor-panelosTnfGgTyc",
        //             "x": 524,
        //             "y": 643,
        //             "client": {
        //                 "x": 524,
        //                 "y": 643
        //             },
        //             "scale_x": 1,
        //             "scale_y": 1,
        //             "rotate": 0,
        //             "actual_bound": {
        //                 "x": 0,
        //                 "y": 0,
        //                 "width": 0,
        //                 "height": 0
        //             },
        //             "point_coordinate": {
        //                 "tl": {
        //                     "x": 0,
        //                     "y": 0
        //                 },
        //                 "tc": {
        //                     "x": 0,
        //                     "y": 0
        //                 },
        //                 "tr": {
        //                     "x": 0,
        //                     "y": 0
        //                 },
        //                 "l": {
        //                     "x": 0,
        //                     "y": 0
        //                 },
        //                 "r": {
        //                     "x": 0,
        //                     "y": 0
        //                 },
        //                 "bl": {
        //                     "x": 0,
        //                     "y": 0
        //                 },
        //                 "bc": {
        //                     "x": 0,
        //                     "y": 0
        //                 },
        //                 "br": {
        //                     "x": 0,
        //                     "y": 0
        //                 }
        //             },
        //             "name": "device-monitor-panel",
        //             "title": "设备监控面板",
        //             "tag": "device-monitor-panel",
        //             "type": "CustomSvg",
        //             "display": true,
        //             "config": {
        //                 "can_zoom": true,
        //                 "have_anchor": true,
        //                 "actual_rect": true
        //             },
        //             "props": {
        //                 "Ua": {
        //                     "title": "Ua (V)",
        //                     "type": "InputNumber",
        //                     "val": 234.9
        //                 },
        //                 "Ub": {
        //                     "title": "Ub (V)",
        //                     "type": "InputNumber",
        //                     "val": 234.9
        //                 },
        //                 "Uc": {
        //                     "title": "Uc (V)",
        //                     "type": "InputNumber",
        //                     "val": 234.7
        //                 },
        //                 "Ia": {
        //                     "title": "Ia (A)",
        //                     "type": "InputNumber",
        //                     "val": 691.2
        //                 },
        //                 "Ib": {
        //                     "title": "Ib (A)",
        //                     "type": "InputNumber",
        //                     "val": 668.8
        //                 },
        //                 "Ic": {
        //                     "title": "Ic (A)",
        //                     "type": "InputNumber",
        //                     "val": 645.6
        //                 },
        //                 "P": {
        //                     "title": "P (kW)",
        //                     "type": "InputNumber",
        //                     "val": 444.3
        //                 },
        //                 "Q": {
        //                     "title": "Q (kVar)",
        //                     "type": "InputNumber",
        //                     "val": 123
        //                 },
        //                 "S": {
        //                     "title": "S (kVA)",
        //                     "type": "InputNumber",
        //                     "val": 474
        //                 },
        //                 "Fq": {
        //                     "title": "频率 (Hz)",
        //                     "type": "InputNumber",
        //                     "val": 49.94
        //                 },
        //                 "COS": {
        //                     "title": "功率因数",
        //                     "type": "InputNumber",
        //                     "val": 0.94
        //                 },
        //                 "Epr": {
        //                     "title": "电能 (kWh)",
        //                     "type": "InputNumber",
        //                     "val": 15239322
        //                 },
        //                 "fontFamily": {
        //                     "title": "字体",
        //                     "type": "Select",
        //                     "val": "Microsoft YaHei",
        //                     "options": [
        //                         {
        //                             "value": "Microsoft YaHei",
        //                             "label": "微软雅黑"
        //                         },
        //                         {
        //                             "value": "NSimSun",
        //                             "label": "新宋体"
        //                         }
        //                     ]
        //                 },
        //                 "fontSize": {
        //                     "title": "文字大小",
        //                     "type": "InputNumber",
        //                     "val": 14
        //                 },
        //                 "color": {
        //                     "title": "文字颜色",
        //                     "type": "Color",
        //                     "val": "#FFFFFF"
        //                 },
        //                 "backgroundColor": {
        //                     "title": "背景颜色",
        //                     "type": "Color",
        //                     "val": "#000000"
        //                 }
        //             },
        //             "common_animations": {
        //                 "val": "",
        //                 "delay": "delay-0s",
        //                 "speed": "normal",
        //                 "repeat": "infinite"
        //             }
        //         },
        //         {
        //             "id": "device-monitor-panelCXP3D2kpNS",
        //             "x": 678,
        //             "y": 677,
        //             "client": {
        //                 "x": 678,
        //                 "y": 677
        //             },
        //             "scale_x": 1,
        //             "scale_y": 1,
        //             "rotate": 0,
        //             "actual_bound": {
        //                 "x": 0,
        //                 "y": 0,
        //                 "width": 0,
        //                 "height": 0
        //             },
        //             "point_coordinate": {
        //                 "tl": {
        //                     "x": 0,
        //                     "y": 0
        //                 },
        //                 "tc": {
        //                     "x": 0,
        //                     "y": 0
        //                 },
        //                 "tr": {
        //                     "x": 0,
        //                     "y": 0
        //                 },
        //                 "l": {
        //                     "x": 0,
        //                     "y": 0
        //                 },
        //                 "r": {
        //                     "x": 0,
        //                     "y": 0
        //                 },
        //                 "bl": {
        //                     "x": 0,
        //                     "y": 0
        //                 },
        //                 "bc": {
        //                     "x": 0,
        //                     "y": 0
        //                 },
        //                 "br": {
        //                     "x": 0,
        //                     "y": 0
        //                 }
        //             },
        //             "name": "device-monitor-panel",
        //             "title": "设备监控面板",
        //             "tag": "device-monitor-panel",
        //             "type": "CustomSvg",
        //             "display": true,
        //             "config": {
        //                 "can_zoom": true,
        //                 "have_anchor": true,
        //                 "actual_rect": true
        //             },
        //             "props": {
        //                 "Ua": {
        //                     "title": "Ua (V)",
        //                     "type": "InputNumber",
        //                     "val": 234.9
        //                 },
        //                 "Ub": {
        //                     "title": "Ub (V)",
        //                     "type": "InputNumber",
        //                     "val": 234.9
        //                 },
        //                 "Uc": {
        //                     "title": "Uc (V)",
        //                     "type": "InputNumber",
        //                     "val": 234.7
        //                 },
        //                 "Ia": {
        //                     "title": "Ia (A)",
        //                     "type": "InputNumber",
        //                     "val": 691.2
        //                 },
        //                 "Ib": {
        //                     "title": "Ib (A)",
        //                     "type": "InputNumber",
        //                     "val": 668.8
        //                 },
        //                 "Ic": {
        //                     "title": "Ic (A)",
        //                     "type": "InputNumber",
        //                     "val": 645.6
        //                 },
        //                 "P": {
        //                     "title": "P (kW)",
        //                     "type": "InputNumber",
        //                     "val": 444.3
        //                 },
        //                 "Q": {
        //                     "title": "Q (kVar)",
        //                     "type": "InputNumber",
        //                     "val": 123
        //                 },
        //                 "S": {
        //                     "title": "S (kVA)",
        //                     "type": "InputNumber",
        //                     "val": 474
        //                 },
        //                 "Fq": {
        //                     "title": "频率 (Hz)",
        //                     "type": "InputNumber",
        //                     "val": 49.94
        //                 },
        //                 "COS": {
        //                     "title": "功率因数",
        //                     "type": "InputNumber",
        //                     "val": 0.94
        //                 },
        //                 "Epr": {
        //                     "title": "电能 (kWh)",
        //                     "type": "InputNumber",
        //                     "val": 15239322
        //                 },
        //                 "fontFamily": {
        //                     "title": "字体",
        //                     "type": "Select",
        //                     "val": "Microsoft YaHei",
        //                     "options": [
        //                         {
        //                             "value": "Microsoft YaHei",
        //                             "label": "微软雅黑"
        //                         },
        //                         {
        //                             "value": "NSimSun",
        //                             "label": "新宋体"
        //                         }
        //                     ]
        //                 },
        //                 "fontSize": {
        //                     "title": "文字大小",
        //                     "type": "InputNumber",
        //                     "val": 14
        //                 },
        //                 "color": {
        //                     "title": "文字颜色",
        //                     "type": "Color",
        //                     "val": "#FFFFFF"
        //                 },
        //                 "backgroundColor": {
        //                     "title": "背景颜色",
        //                     "type": "Color",
        //                     "val": "#000000"
        //                 }
        //             },
        //             "common_animations": {
        //                 "val": "",
        //                 "delay": "delay-0s",
        //                 "speed": "normal",
        //                 "repeat": "infinite"
        //             }
        //         },
        //         {
        //             "id": "straight-linelEewNziN0a",
        //             "x": 730,
        //             "y": 548,
        //             "client": {
        //                 "x": 739,
        //                 "y": 553
        //             },
        //             "scale_x": 1,
        //             "scale_y": 1,
        //             "rotate": 0,
        //             "actual_bound": {
        //                 "x": 50,
        //                 "y": 50,
        //                 "width": 0,
        //                 "height": 0
        //             },
        //             "point_coordinate": {
        //                 "tl": {
        //                     "x": 730,
        //                     "y": 548
        //                 },
        //                 "tc": {
        //                     "x": 730,
        //                     "y": 548
        //                 },
        //                 "tr": {
        //                     "x": 730,
        //                     "y": 548
        //                 },
        //                 "l": {
        //                     "x": 730,
        //                     "y": 548
        //                 },
        //                 "r": {
        //                     "x": 730,
        //                     "y": 548
        //                 },
        //                 "bl": {
        //                     "x": 730,
        //                     "y": 548
        //                 },
        //                 "bc": {
        //                     "x": 730,
        //                     "y": 548
        //                 },
        //                 "br": {
        //                     "x": 730,
        //                     "y": 548
        //                 }
        //             },
        //             "name": "connection_line",
        //             "title": "连接线",
        //             "type": "ConnectionLine",
        //             "config": {
        //                 "can_zoom": false,
        //                 "have_anchor": false,
        //                 "actual_rect": false
        //             },
        //             "display": true,
        //             "props": {
        //                 "stroke": {
        //                     "title": "线条颜色",
        //                     "type": "Color",
        //                     "val": "#ff0000"
        //                 },
        //                 "stroke-width": {
        //                     "title": "线条宽度",
        //                     "type": "InputNumber",
        //                     "val": 2
        //                 },
        //                 "point_position": {
        //                     "title": "点坐标",
        //                     "type": "JsonEdit",
        //                     "val": [
        //                         {
        //                             "x": 50,
        //                             "y": 50
        //                         }
        //                     ]
        //                 }
        //             },
        //             "animations": {
        //                 "type": {
        //                     "title": "动画类型",
        //                     "type": "Select",
        //                     "val": "None",
        //                     "options": [
        //                         {
        //                             "label": "无",
        //                             "value": "None"
        //                         },
        //                         {
        //                             "label": "电流",
        //                             "value": "Electricity"
        //                         },
        //                         {
        //                             "label": "轨迹",
        //                             "value": "Track"
        //                         },
        //                         {
        //                             "label": "水珠",
        //                             "value": "WaterDrop"
        //                         }
        //                     ]
        //                 },
        //                 "dur": {
        //                     "title": "持续时间",
        //                     "type": "InputNumber",
        //                     "val": 20
        //                 },
        //                 "repeatCount": {
        //                     "title": "循环次数",
        //                     "type": "Input",
        //                     "val": "indefinite",
        //                     "disabled": true
        //                 },
        //                 "color": {
        //                     "title": "颜色",
        //                     "type": "Color",
        //                     "val": "#0a7ae2"
        //                 },
        //                 "reverse": {
        //                     "title": "反转动画",
        //                     "type": "Switch",
        //                     "val": false
        //                 }
        //             },
        //             "bind_anchors": {
        //                 "start": {
        //                     "type": "TopCenter",
        //                     "target_id": "series-capacitors0MRg3rhgkd"
        //                 },
        //                 "end": null
        //             }
        //         },
        //         {
        //             "id": "straight-line88hVRVU9z9",
        //             "x": 1163.0884437561035,
        //             "y": 597,
        //             "client": {
        //                 "x": 1168,
        //                 "y": 595
        //             },
        //             "scale_x": 1,
        //             "scale_y": 1,
        //             "rotate": 0,
        //             "actual_bound": {
        //                 "x": 50,
        //                 "y": 50,
        //                 "width": 0,
        //                 "height": 0
        //             },
        //             "point_coordinate": {
        //                 "tl": {
        //                     "x": 1163.0884437561035,
        //                     "y": 597
        //                 },
        //                 "tc": {
        //                     "x": 1163.0884437561035,
        //                     "y": 597
        //                 },
        //                 "tr": {
        //                     "x": 1163.0884437561035,
        //                     "y": 597
        //                 },
        //                 "l": {
        //                     "x": 1163.0884437561035,
        //                     "y": 597
        //                 },
        //                 "r": {
        //                     "x": 1163.0884437561035,
        //                     "y": 597
        //                 },
        //                 "bl": {
        //                     "x": 1163.0884437561035,
        //                     "y": 597
        //                 },
        //                 "bc": {
        //                     "x": 1163.0884437561035,
        //                     "y": 597
        //                 },
        //                 "br": {
        //                     "x": 1163.0884437561035,
        //                     "y": 597
        //                 }
        //             },
        //             "name": "connection_line",
        //             "title": "连接线",
        //             "type": "ConnectionLine",
        //             "config": {
        //                 "can_zoom": false,
        //                 "have_anchor": false,
        //                 "actual_rect": false
        //             },
        //             "display": true,
        //             "props": {
        //                 "stroke": {
        //                     "title": "线条颜色",
        //                     "type": "Color",
        //                     "val": "#ff0000"
        //                 },
        //                 "stroke-width": {
        //                     "title": "线条宽度",
        //                     "type": "InputNumber",
        //                     "val": 2
        //                 },
        //                 "point_position": {
        //                     "title": "点坐标",
        //                     "type": "JsonEdit",
        //                     "val": [
        //                         {
        //                             "x": 50,
        //                             "y": 50
        //                         },
        //                         {
        //                             "x": 50,
        //                             "y": 50
        //                         }
        //                     ]
        //                 }
        //             },
        //             "animations": {
        //                 "type": {
        //                     "title": "动画类型",
        //                     "type": "Select",
        //                     "val": "None",
        //                     "options": [
        //                         {
        //                             "label": "无",
        //                             "value": "None"
        //                         },
        //                         {
        //                             "label": "电流",
        //                             "value": "Electricity"
        //                         },
        //                         {
        //                             "label": "轨迹",
        //                             "value": "Track"
        //                         },
        //                         {
        //                             "label": "水珠",
        //                             "value": "WaterDrop"
        //                         }
        //                     ]
        //                 },
        //                 "dur": {
        //                     "title": "持续时间",
        //                     "type": "InputNumber",
        //                     "val": 20
        //                 },
        //                 "repeatCount": {
        //                     "title": "循环次数",
        //                     "type": "Input",
        //                     "val": "indefinite",
        //                     "disabled": true
        //                 },
        //                 "color": {
        //                     "title": "颜色",
        //                     "type": "Color",
        //                     "val": "#0a7ae2"
        //                 },
        //                 "reverse": {
        //                     "title": "反转动画",
        //                     "type": "Switch",
        //                     "val": false
        //                 }
        //             },
        //             "bind_anchors": {
        //                 "start": {
        //                     "type": "Left",
        //                     "target_id": "grounding-gateRWU7onVXAU"
        //                 },
        //                 "end": null
        //             }
        //         },
        //         {
        //             "id": "straight-linecKsTEA2Isi",
        //             "x": 1193,
        //             "y": 365.80876541137695,
        //             "client": {
        //                 "x": 1198,
        //                 "y": 362
        //             },
        //             "scale_x": 1,
        //             "scale_y": 1,
        //             "rotate": 0,
        //             "actual_bound": {
        //                 "x": 50,
        //                 "y": 50,
        //                 "width": 0,
        //                 "height": 0
        //             },
        //             "point_coordinate": {
        //                 "tl": {
        //                     "x": 1193,
        //                     "y": 365.80876541137695
        //                 },
        //                 "tc": {
        //                     "x": 1193,
        //                     "y": 365.80876541137695
        //                 },
        //                 "tr": {
        //                     "x": 1193,
        //                     "y": 365.80876541137695
        //                 },
        //                 "l": {
        //                     "x": 1193,
        //                     "y": 365.80876541137695
        //                 },
        //                 "r": {
        //                     "x": 1193,
        //                     "y": 365.80876541137695
        //                 },
        //                 "bl": {
        //                     "x": 1193,
        //                     "y": 365.80876541137695
        //                 },
        //                 "bc": {
        //                     "x": 1193,
        //                     "y": 365.80876541137695
        //                 },
        //                 "br": {
        //                     "x": 1193,
        //                     "y": 365.80876541137695
        //                 }
        //             },
        //             "name": "connection_line",
        //             "title": "连接线",
        //             "type": "ConnectionLine",
        //             "config": {
        //                 "can_zoom": false,
        //                 "have_anchor": false,
        //                 "actual_rect": false
        //             },
        //             "display": true,
        //             "props": {
        //                 "stroke": {
        //                     "title": "线条颜色",
        //                     "type": "Color",
        //                     "val": "#ff0000"
        //                 },
        //                 "stroke-width": {
        //                     "title": "线条宽度",
        //                     "type": "InputNumber",
        //                     "val": 2
        //                 },
        //                 "point_position": {
        //                     "title": "点坐标",
        //                     "type": "JsonEdit",
        //                     "val": [
        //                         {
        //                             "x": 50,
        //                             "y": 50
        //                         },
        //                         {
        //                             "x": 50,
        //                             "y": 50
        //                         }
        //                     ]
        //                 }
        //             },
        //             "animations": {
        //                 "type": {
        //                     "title": "动画类型",
        //                     "type": "Select",
        //                     "val": "None",
        //                     "options": [
        //                         {
        //                             "label": "无",
        //                             "value": "None"
        //                         },
        //                         {
        //                             "label": "电流",
        //                             "value": "Electricity"
        //                         },
        //                         {
        //                             "label": "轨迹",
        //                             "value": "Track"
        //                         },
        //                         {
        //                             "label": "水珠",
        //                             "value": "WaterDrop"
        //                         }
        //                     ]
        //                 },
        //                 "dur": {
        //                     "title": "持续时间",
        //                     "type": "InputNumber",
        //                     "val": 20
        //                 },
        //                 "repeatCount": {
        //                     "title": "循环次数",
        //                     "type": "Input",
        //                     "val": "indefinite",
        //                     "disabled": true
        //                 },
        //                 "color": {
        //                     "title": "颜色",
        //                     "type": "Color",
        //                     "val": "#0a7ae2"
        //                 },
        //                 "reverse": {
        //                     "title": "反转动画",
        //                     "type": "Switch",
        //                     "val": false
        //                 }
        //             },
        //             "bind_anchors": {
        //                 "start": {
        //                     "type": "BottomCenter",
        //                     "target_id": "grounding-gatepZ2m19T7Et"
        //                 },
        //                 "end": null
        //             }
        //         },
        //         {
        //             "id": "straight-linezxH4YkQ9pH",
        //             "x": 1193,
        //             "y": 365.80876541137695,
        //             "client": {
        //                 "x": 1198,
        //                 "y": 362
        //             },
        //             "scale_x": 1,
        //             "scale_y": 1,
        //             "rotate": 0,
        //             "actual_bound": {
        //                 "x": 50,
        //                 "y": 50,
        //                 "width": 0,
        //                 "height": 0
        //             },
        //             "point_coordinate": {
        //                 "tl": {
        //                     "x": 1193,
        //                     "y": 365.80876541137695
        //                 },
        //                 "tc": {
        //                     "x": 1193,
        //                     "y": 365.80876541137695
        //                 },
        //                 "tr": {
        //                     "x": 1193,
        //                     "y": 365.80876541137695
        //                 },
        //                 "l": {
        //                     "x": 1193,
        //                     "y": 365.80876541137695
        //                 },
        //                 "r": {
        //                     "x": 1193,
        //                     "y": 365.80876541137695
        //                 },
        //                 "bl": {
        //                     "x": 1193,
        //                     "y": 365.80876541137695
        //                 },
        //                 "bc": {
        //                     "x": 1193,
        //                     "y": 365.80876541137695
        //                 },
        //                 "br": {
        //                     "x": 1193,
        //                     "y": 365.80876541137695
        //                 }
        //             },
        //             "name": "connection_line",
        //             "title": "连接线",
        //             "type": "ConnectionLine",
        //             "config": {
        //                 "can_zoom": false,
        //                 "have_anchor": false,
        //                 "actual_rect": false
        //             },
        //             "display": true,
        //             "props": {
        //                 "stroke": {
        //                     "title": "线条颜色",
        //                     "type": "Color",
        //                     "val": "#ff0000"
        //                 },
        //                 "stroke-width": {
        //                     "title": "线条宽度",
        //                     "type": "InputNumber",
        //                     "val": 2
        //                 },
        //                 "point_position": {
        //                     "title": "点坐标",
        //                     "type": "JsonEdit",
        //                     "val": [
        //                         {
        //                             "x": 50,
        //                             "y": 50
        //                         },
        //                         {
        //                             "x": 50,
        //                             "y": 50
        //                         }
        //                     ]
        //                 }
        //             },
        //             "animations": {
        //                 "type": {
        //                     "title": "动画类型",
        //                     "type": "Select",
        //                     "val": "None",
        //                     "options": [
        //                         {
        //                             "label": "无",
        //                             "value": "None"
        //                         },
        //                         {
        //                             "label": "电流",
        //                             "value": "Electricity"
        //                         },
        //                         {
        //                             "label": "轨迹",
        //                             "value": "Track"
        //                         },
        //                         {
        //                             "label": "水珠",
        //                             "value": "WaterDrop"
        //                         }
        //                     ]
        //                 },
        //                 "dur": {
        //                     "title": "持续时间",
        //                     "type": "InputNumber",
        //                     "val": 20
        //                 },
        //                 "repeatCount": {
        //                     "title": "循环次数",
        //                     "type": "Input",
        //                     "val": "indefinite",
        //                     "disabled": true
        //                 },
        //                 "color": {
        //                     "title": "颜色",
        //                     "type": "Color",
        //                     "val": "#0a7ae2"
        //                 },
        //                 "reverse": {
        //                     "title": "反转动画",
        //                     "type": "Switch",
        //                     "val": false
        //                 }
        //             },
        //             "bind_anchors": {
        //                 "start": {
        //                     "type": "BottomCenter",
        //                     "target_id": "grounding-gatepZ2m19T7Et"
        //                 },
        //                 "end": null
        //             }
        //         },
        //         {
        //             "id": "testgS8XIfPyBW",
        //             "x": 697,
        //             "y": 204,
        //             "client": {
        //                 "x": 697,
        //                 "y": 204
        //             },
        //             "scale_x": 1,
        //             "scale_y": 1,
        //             "rotate": 0,
        //             "actual_bound": {
        //                 "x": 5,
        //                 "y": 45,
        //                 "width": 65,
        //                 "height": 10
        //             },
        //             "point_coordinate": {
        //                 "tl": {
        //                     "x": 664.5,
        //                     "y": 199
        //                 },
        //                 "tc": {
        //                     "x": 697,
        //                     "y": 199
        //                 },
        //                 "tr": {
        //                     "x": 729.5,
        //                     "y": 199
        //                 },
        //                 "l": {
        //                     "x": 664.5,
        //                     "y": 204
        //                 },
        //                 "r": {
        //                     "x": 729.5,
        //                     "y": 204
        //                 },
        //                 "bl": {
        //                     "x": 664.5,
        //                     "y": 209
        //                 },
        //                 "bc": {
        //                     "x": 697,
        //                     "y": 209
        //                 },
        //                 "br": {
        //                     "x": 729.5,
        //                     "y": 209
        //                 }
        //             },
        //             "name": "test",
        //             "title": "电阻",
        //             "type": "File",
        //             "config": {
        //                 "can_zoom": true,
        //                 "have_anchor": true,
        //                 "actual_rect": true
        //             },
        //             "display": true,
        //             "props": {
        //                 "fill": {
        //                     "title": "填充色",
        //                     "type": "Color",
        //                     "val": "#ff0000"
        //                 }
        //             },
        //             "common_animations": {
        //                 "val": "",
        //                 "delay": "delay-0s",
        //                 "speed": "slow",
        //                 "repeat": "infinite"
        //             }
        //         },
        //         {
        //             "id": "prohibitGCu3KNDLoW",
        //             "x": 672,
        //             "y": 246,
        //             "client": {
        //                 "x": 672,
        //                 "y": 246
        //             },
        //             "scale_x": 1,
        //             "scale_y": 1,
        //             "rotate": 0,
        //             "actual_bound": {
        //                 "x": 10,
        //                 "y": 10,
        //                 "width": 80,
        //                 "height": 80
        //             },
        //             "point_coordinate": {
        //                 "tl": {
        //                     "x": 632,
        //                     "y": 206
        //                 },
        //                 "tc": {
        //                     "x": 672,
        //                     "y": 206
        //                 },
        //                 "tr": {
        //                     "x": 712,
        //                     "y": 206
        //                 },
        //                 "l": {
        //                     "x": 632,
        //                     "y": 246
        //                 },
        //                 "r": {
        //                     "x": 712,
        //                     "y": 246
        //                 },
        //                 "bl": {
        //                     "x": 632,
        //                     "y": 286
        //                 },
        //                 "bc": {
        //                     "x": 672,
        //                     "y": 286
        //                 },
        //                 "br": {
        //                     "x": 712,
        //                     "y": 286
        //                 }
        //             },
        //             "name": "prohibit",
        //             "title": "禁止",
        //             "type": "File",
        //             "config": {
        //                 "can_zoom": true,
        //                 "have_anchor": true,
        //                 "actual_rect": true
        //             },
        //             "display": true,
        //             "props": {
        //                 "fill": {
        //                     "title": "填充色",
        //                     "type": "Color",
        //                     "val": "#ff0000"
        //                 },
        //                 "voltage": {
        //                     "title": "电压等级",
        //                     "type": "Select",
        //                     "val": "330kv",
        //                     "options": [
        //                         {
        //                             "value": "1000/800kv",
        //                             "label": "1000/800kv"
        //                         },
        //                         {
        //                             "value": "750/660kv",
        //                             "label": "750/660kv"
        //                         },
        //                         {
        //                             "value": "500kv",
        //                             "label": "500kv"
        //                         },
        //                         {
        //                             "value": "330kv",
        //                             "label": "330kv"
        //                         },
        //                         {
        //                             "value": "220kv",
        //                             "label": "220kv"
        //                         },
        //                         {
        //                             "value": "110kv",
        //                             "label": "110kv"
        //                         },
        //                         {
        //                             "value": "66kv",
        //                             "label": "66kv"
        //                         },
        //                         {
        //                             "value": "35kv",
        //                             "label": "35kv"
        //                         },
        //                         {
        //                             "value": "20kv",
        //                             "label": "20kv"
        //                         },
        //                         {
        //                             "value": "15kv",
        //                             "label": "15kv"
        //                         },
        //                         {
        //                             "value": "13kv",
        //                             "label": "13kv"
        //                         },
        //                         {
        //                             "value": "10kv",
        //                             "label": "10kv"
        //                         },
        //                         {
        //                             "value": "6kv",
        //                             "label": "6kv"
        //                         },
        //                         {
        //                             "value": "0kv",
        //                             "label": "0kv"
        //                         },
        //                         {
        //                             "value": "0W",
        //                             "label": "0W"
        //                         },
        //                         {
        //                             "value": "0B",
        //                             "label": "0B"
        //                         }
        //                     ],
        //                     "colorMap": {
        //                         "1000/800kv": "#FF0000",
        //                         "750/660kv": "#00FF00",
        //                         "500kv": "#0000FF",
        //                         "330kv": "#FFFF00",
        //                         "220kv": "#FF00FF",
        //                         "110kv": "#00FFFF",
        //                         "66kv": "#800000",
        //                         "35kv": "#808000",
        //                         "20kv": "#008000",
        //                         "15kv": "#800080",
        //                         "13kv": "#008080",
        //                         "10kv": "#000080",
        //                         "6kv": "#C0C0C0",
        //                         "0kv": "#808080",
        //                         "0W": "#FFFFFF",
        //                         "0B": "#000000"
        //                     }
        //                 }
        //             },
        //             "common_animations": {
        //                 "val": "",
        //                 "delay": "delay-0s",
        //                 "speed": "slow",
        //                 "repeat": "infinite"
        //             }
        //         }
        //     ]
        // }
      }
    },
    { deep: true }
  );
  onMounted(() => {
    const previewData = JSON.parse(localStorage.getItem('preview_data') || '{}');
    console.log('objInfo123123:', props.objInfo, previewData);
    //   {
    //     "fill": {
    //         "title": "填充色",
    //         "type": "Color",
    //         "val": "#ff0000"
    //     },
    //     "voltage": {
    //         "title": "电压等级",
    //         "type": "Select",
    //         "val": "1000/800kv",
    //         "options": [
    //             {
    //                 "value": "1000/800kv",
    //                 "label": "1000/800kv"
    //             },
    //             {
    //                 "value": "750/660kv",
    //                 "label": "750/660kv"
    //             },
    //             {
    //                 "value": "500kv",
    //                 "label": "500kv"
    //             },
    //             {
    //                 "value": "330kv",
    //                 "label": "330kv"
    //             },
    //             {
    //                 "value": "220kv",
    //                 "label": "220kv"
    //             },
    //             {
    //                 "value": "110kv",
    //                 "label": "110kv"
    //             },
    //             {
    //                 "value": "66kv",
    //                 "label": "66kv"
    //             },
    //             {
    //                 "value": "35kv",
    //                 "label": "35kv"
    //             },
    //             {
    //                 "value": "20kv",
    //                 "label": "20kv"
    //             },
    //             {
    //                 "value": "15kv",
    //                 "label": "15kv"
    //             },
    //             {
    //                 "value": "13kv",
    //                 "label": "13kv"
    //             },
    //             {
    //                 "value": "10kv",
    //                 "label": "10kv"
    //             },
    //             {
    //                 "value": "6kv",
    //                 "label": "6kv"
    //             },
    //             {
    //                 "value": "0kv",
    //                 "label": "0kv"
    //             },
    //             {
    //                 "value": "0W",
    //                 "label": "0W"
    //             },
    //             {
    //                 "value": "0B",
    //                 "label": "0B"
    //             }
    //         ],
    //         "colorMap": {
    //             "1000/800kv": "#FF0000",
    //             "750/660kv": "#00FF00",
    //             "500kv": "#0000FF",
    //             "330kv": "#FFFF00",
    //             "220kv": "#FF00FF",
    //             "110kv": "#00FFFF",
    //             "66kv": "#800000",
    //             "35kv": "#808000",
    //             "20kv": "#008000",
    //             "15kv": "#800080",
    //             "13kv": "#008080",
    //             "10kv": "#000080",
    //             "6kv": "#C0C0C0",
    //             "0kv": "#808080",
    //             "0W": "#FFFFFF",
    //             "0B": "#000000"
    //         }
    //     }
    // }
  });
</script>
