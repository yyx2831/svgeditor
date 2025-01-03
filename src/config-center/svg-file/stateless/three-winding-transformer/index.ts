import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '../../../types';

export const three_winding_transformer_svg_file: IConfigItem = {
  name: 'three-winding-transformer',
  title: '三卷变压器',
  type: EDoneJsonType.File,
  config: {
    can_zoom: true,
    have_anchor: true,
    actual_rect: true
  },
  display: true,
  props: {
    fill: {
      title: '填充色',
      type: EConfigItemPropsType.Color,
      val: '#ff0000'
    }
  },
  common_animations: {
    val: '',
    delay: 'delay-0s',
    speed: 'slow',
    repeat: 'infinite'
  }
};
