import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '../../../types';

export const terminal_equipment: IConfigItem = {
  name: 'terminal_equipment',
  title: '消弧线圈1',
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
