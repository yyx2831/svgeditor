import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '../../../types';

export const battery_svg_file: IConfigItem = {
  name: 'battery',
  title: '电池',
  type: EDoneJsonType.File,
  config: {
    can_zoom: true,
    have_anchor: true,
    actual_rect: true
  },
  display: true,
  props: {
    fill: {
      title: '电量颜色',
      type: EConfigItemPropsType.Color,
      val: '#4CAF50' // 绿色作为默认电量颜色
    },
    stroke: {
      title: '边框颜色',
      type: EConfigItemPropsType.Color,
      val: '#000'
    }
  },
  common_animations: {
    val: '',
    delay: 'delay-0s',
    speed: 'slow',
    repeat: 'infinite'
  }
};
