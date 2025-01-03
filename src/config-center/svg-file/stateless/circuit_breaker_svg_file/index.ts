import { EDoneJsonType, IConfigItem } from '@/config-center/types';

export const circuit_breaker_voltage_svg_file: IConfigItem = {
  name: 'circuit-breaker-voltage',
  title: '牵引变压器',
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
          openVal: '#0000ff',
          closeVal: '#ff00ff'
        },
        'fill-opacity': {
          openVal: '0.5',
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
