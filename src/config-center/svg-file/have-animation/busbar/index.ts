import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '../../../types';

export const busbar_svg_file: IConfigItem = {
  name: 'busbar',
  title: '母线',
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
      title: '母线颜色',
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
