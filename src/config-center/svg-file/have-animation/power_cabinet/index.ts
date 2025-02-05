import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '../../../types';

export const power_cabinet_svg_file: IConfigItem = {
  name: 'power_cabinet',
  title: '并网柜',
  type: EDoneJsonType.File,
  config: {
    can_zoom: true,
    have_anchor: true,
    actual_rect: true
  },
  display: true,
  props: {
    fill: {
      title: '电流指示颜色',
      type: EConfigItemPropsType.Color,
      val: '#4CAF50'
    },
    stroke: {
      title: '外壳颜色',
      type: EConfigItemPropsType.Color,
      val: '#333333'
    },
    indicator: {
      title: '运行指示灯',
      type: EConfigItemPropsType.Color,
      val: '#00FF00'
    }
  },
  common_animations: {
    val: '',
    delay: 'delay-0s',
    speed: 'slow',
    repeat: 'infinite'
  }
};
