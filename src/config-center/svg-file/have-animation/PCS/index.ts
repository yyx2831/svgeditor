import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '../../../types';

export const PCS_svg_file: IConfigItem = {
  name: 'pcs', // 修改组件名称
  title: 'PCS', // 修改标题
  type: EDoneJsonType.File,
  config: {
    can_zoom: true,
    have_anchor: true,
    actual_rect: true
  },
  display: true,
  // 修改属性名称与默认值
  props: {
    fill: {
      title: '电流颜色',
      type: EConfigItemPropsType.Color,
      val: '#4CAF50' // 默认绿色
    },
    stroke: {
      title: '外壳颜色',
      type: EConfigItemPropsType.Color,
      val: '#000'
    }
  },
  // 动画等配置可保持不变
  common_animations: {
    val: '',
    delay: 'delay-0s',
    speed: 'slow',
    repeat: 'infinite'
  }
};
