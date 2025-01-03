import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '../../../types';

export const shunt_reactance: IConfigItem = {
  name: 'shunt-reactance',
  title: '并联电抗',
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
      val: '#00ff00'
    }
  },
  common_animations: {
    val: '',
    delay: 'delay-0s',
    speed: 'slow',
    repeat: 'infinite'
  }
};
