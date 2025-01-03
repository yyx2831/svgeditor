import { EDoneJsonType, IConfigItem } from '@/config-center/types';

export const circuit_breaker_svg_file: IConfigItem = {
  name: 'circuit-breaker',
  title: '断路器',
  type: EDoneJsonType.File,
  config: {
    can_zoom: true,
    have_anchor: true,
    actual_rect: true
  },
  display: true,
  props: {},
  state: {
    OnOff: {
      title: '开关',
      default: false,
      props: {
        fill: {
          openVal: '#00ff00',
          closeVal: '#ff0000'
        },
        'fill-opacity': {
          openVal: '0',
          closeVal: '1'
        }
      }
    }
  },
  common_animations: {
    val: '',
    delay: 'delay-0s',
    speed: 'slow',
    repeat: 'infinite'
  }
};
