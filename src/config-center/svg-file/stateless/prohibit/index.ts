import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '@/config-center/types';

export const prohibit: IConfigItem = {
  name: 'prohibit',
  title: '禁止',
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
    },
    // text: {
    //   title: '文本内容',
    //   type: EConfigItemPropsType.Input,
    //   val: '禁止'
    // },
    voltage: {
      title: '电压等级',
      type: EConfigItemPropsType.Select,
      val: '1000/800kv',
      options: [
        { value: '1000/800kv', label: '1000/800kv' },
        { value: '750/660kv', label: '750/660kv' },
        { value: '500kv', label: '500kv' },
        { value: '330kv', label: '330kv' },
        { value: '220kv', label: '220kv' },
        { value: '110kv', label: '110kv' },
        { value: '66kv', label: '66kv' },
        { value: '35kv', label: '35kv' },
        { value: '20kv', label: '20kv' },
        { value: '15kv', label: '15kv' },
        { value: '13kv', label: '13kv' },
        { value: '10kv', label: '10kv' },
        { value: '6kv', label: '6kv' },
        { value: '0kv', label: '0kv' },
        { value: '0W', label: '0W' },
        { value: '0B', label: '0B' }
      ],
      colorMap: {
        '1000/800kv': '#FF0000',
        '750/660kv': '#00FF00',
        '500kv': '#0000FF',
        // 添加其他电压等级的颜色映射
        '330kv': '#FFFF00',
        '220kv': '#FF00FF',
        '110kv': '#00FFFF',
        '66kv': '#800000',
        '35kv': '#808000',
        '20kv': '#008000',
        '15kv': '#800080',
        '13kv': '#008080',
        '10kv': '#000080',
        '6kv': '#C0C0C0',
        '0kv': '#808080',
        '0W': '#FFFFFF',
        '0B': '#000000'
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
