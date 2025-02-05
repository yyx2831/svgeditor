import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '@/config-center/types';

export const key_value_pair: IConfigItem = {
  name: 'custom-svg-text',
  title: '文字',
  tag: 'text',
  type: EDoneJsonType.CustomSvg,
  display: true,
  config: {
    can_zoom: true,
    have_anchor: true,
    actual_rect: true
  },
  props: {
    text: {
      title: '文字内容',
      type: EConfigItemPropsType.Input,
      val: '请输入文字'
    },
    fontFamily: {
      title: '字体',
      type: EConfigItemPropsType.Select,
      val: 'Microsoft YaHei',
      options: [
        {
          value: 'Microsoft YaHei',
          label: '微软雅黑'
        },
        {
          value: 'NSimSun',
          label: '新宋体'
        }
      ]
    },
    fontSize: {
      title: '文字大小',
      type: EConfigItemPropsType.InputNumber,
      val: 15
    },
    fill: {
      title: '文字颜色',
      type: EConfigItemPropsType.Color,
      val: '#FFF200FF'
    },
    key: {
      title: '键',
      type: EConfigItemPropsType.TreeSelect,
      val: '',
      options: [
        {
          value: 'parent1',
          label: '父节点1',
          children: [
            { value: 'child1-1', label: '子节点1-1' },
            { value: 'child1-2', label: '子节点1-2' }
          ]
        },
        {
          value: 'parent2',
          label: '父节点2',
          children: [
            { value: 'child2-1', label: '子节点2-1' },
            { value: 'child2-2', label: '子节点2-2' }
          ]
        }
      ]
    },
    value: {
      title: '值',
      type: EConfigItemPropsType.Select,
      val: '',
      options: [
        { value: 'value1', label: '值1' },
        { value: 'value2', label: '值2' }
      ]
    }
  },
  common_animations: {
    val: '',
    delay: 'delay-0s',
    speed: 'slow',
    repeat: 'infinite'
  }
};
