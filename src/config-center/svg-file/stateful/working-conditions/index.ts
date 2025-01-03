import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '../../../types';

export const working_conditions: IConfigItem = {
  name: 'working-conditions',
  title: '工况2',
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
