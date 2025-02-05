import { EConfigItemPropsType, EDoneJsonType } from '@/config-center/types';

export interface IConfigItem {
  name: string;
  title: string;
  display: boolean;
  props: any;
  type: EDoneJsonType;
  config: any;
  keyObj?: IConfigItem;
  tag?: string; // 添加 tag 属性
  common_animations?: any; // 添加 common_animations 属性
  valueObj?: IConfigItem; // 添加 valueObj 属性
  // 如果需要，也可以增加其他不存在的属性
  // valueObj?: IConfigItem;
  // ...其他属性...
}

// export const custom_svg_text: IConfigItem = {
export const custom_svg_text: IConfigItem = {
  name: 'custom-svg-text',
  title: '双开',
  tag: 'custom-svg-text',
  type: EDoneJsonType.CustomSvg,
  display: true,
  config: {
    can_zoom: true,
    have_anchor: true,
    actual_rect: true
  },
  props: {
    text: {
      title: '文字内容',
      type: EConfigItemPropsType.Input,
      val: '文字'
    },
    fontFamily: {
      title: '字体',
      type: EConfigItemPropsType.Select,
      val: 'Microsoft YaHei',
      options: [
        {
          value: 'Microsoft YaHei',
          label: '微软雅黑'
        },
        {
          value: 'NSimSun',
          label: '新宋体'
        }
      ]
    },
    fontSize: {
      title: '文字大小',
      type: EConfigItemPropsType.InputNumber,
      val: 15
    },
    fill: {
      title: '文字颜色',
      type: EConfigItemPropsType.Color,
      val: '#FFF200FF'
    },
    uniqueKey: {
      title: '键',
      type: EConfigItemPropsType.Select,
      val: 'Ua',
      options: [
        { value: 'Ua', label: 'Ua (V)' },
        { value: 'Ub', label: 'Ub (V)' },
        { value: 'Uc', label: 'Uc (V)' },
        { value: 'Ia', label: 'Ia (A)' },
        { value: 'Ib', label: 'Ib (A)' },
        { value: 'Ic', label: 'Ic (A)' },
        { value: 'P', label: 'P (kW)' },
        { value: 'Q', label: 'Q (kVar)' },
        { value: 'S', label: 'S (kVA)' },
        { value: 'Fq', label: '频率 (Hz)' },
        { value: 'COS', label: '功率因数' },
        { value: 'Epr', label: '电能 (kWh)' }
      ]
    },
    value: {
      title: '值',
      type: EConfigItemPropsType.Select,
      val: '值',
      options: [
        { value: '200v', label: '200v' },
        { value: '300v', label: '300v' }
      ]
    },
    input: {
      title: '输入框',
      type: EConfigItemPropsType.Input,
      val: '输入框'
    }
  },
  common_animations: {
    val: '',
    delay: 'delay-0s',
    speed: 'slow',
    repeat: 'infinite'
  },
  keyObj: {
    name: 'custom-svg-text',
    title: '文字',
    tag: 'custom-svg-text',
    type: EDoneJsonType.CustomSvg,
    display: true,
    config: {
      can_zoom: true,
      have_anchor: true,
      actual_rect: true
    },
    props: {
      text: {
        title: '文字内容',
        type: EConfigItemPropsType.Input,
        val: '文字'
      },
      fontFamily: {
        title: '字体',
        type: EConfigItemPropsType.Select,
        val: 'Microsoft YaHei',
        options: [
          {
            value: 'Microsoft YaHei',
            label: '微软雅黑'
          },
          {
            value: 'NSimSun',
            label: '新宋体'
          }
        ]
      },
      fontSize: {
        title: '文字大小',
        type: EConfigItemPropsType.InputNumber,
        val: 15
      },
      fill: {
        title: '文字颜色',
        type: EConfigItemPropsType.Color,
        val: '#FFF200FF'
      }
    },
    common_animations: {
      val: '',
      delay: 'delay-0s',
      speed: 'slow',
      repeat: 'infinite'
    }
  },
  valueObj: {
    name: 'custom-svg-text',
    title: '文字',
    tag: 'custom-svg-text',
    type: EDoneJsonType.CustomSvg,
    display: true,
    config: {
      can_zoom: true,
      have_anchor: true,
      actual_rect: true
    },
    props: {
      text: {
        title: '文字内容',
        type: EConfigItemPropsType.Input,
        val: '文字'
      },
      fontFamily: {
        title: '字体',
        type: EConfigItemPropsType.Select,
        val: 'Microsoft YaHei',
        options: [
          {
            value: 'Microsoft YaHei',
            label: '微软雅黑'
          },
          {
            value: 'NSimSun',
            label: '新宋体'
          }
        ]
      },
      fontSize: {
        title: '文字大小',
        type: EConfigItemPropsType.InputNumber,
        val: 15
      },
      fill: {
        title: '文字颜色',
        type: EConfigItemPropsType.Color,
        val: '#FFF200FF'
      }
    },
    common_animations: {
      val: '',
      delay: 'delay-0s',
      speed: 'slow',
      repeat: 'infinite'
    }
  }
};
