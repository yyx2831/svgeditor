import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '../../../types';

export const electricity_meter_svg_file: IConfigItem = {
  name: 'electricity_meter',
  title: '电表',
  type: EDoneJsonType.File,
  config: {
    can_zoom: true,
    have_anchor: true,
    actual_rect: true
  },
  display: true,
  props: {
    fill: {
      title: '数字颜色',
      type: EConfigItemPropsType.Color,
      val: '#00FF00' // 默认荧光绿
    },
    stroke: {
      title: '外壳颜色',
      type: EConfigItemPropsType.Color,
      val: '#333333'
    }
  },
  common_animations: {
    val: '',
    delay: 'delay-0s',
    speed: 'slow',
    repeat: 'infinite'
  }
};
