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
      val: '请输入'
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
    }
  },
  common_animations: {
    val: '',
    delay: 'delay-0s',
    speed: 'slow',
    repeat: 'infinite'
  }
};
