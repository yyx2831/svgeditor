import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '../../../types';

export const parallel_capacitor2: IConfigItem = {
  name: 'parallel-capacitor2',
  title: '并联电容',
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
