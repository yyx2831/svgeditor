import { IConfigComponentGroup } from '../../types';
import { reservoir_svg_file } from './reservoir';
import { battery_svg_file } from './battery';
import { PCS_svg_file } from './PCS';
import { electricity_meter_svg_file } from './electricity_meter';
import { power_cabinet_svg_file } from './power_cabinet';
import { transformer_svg_file } from './transformer';
import { busbar_svg_file } from './busbar';

export const have_animation_group: IConfigComponentGroup = {
  groupType: 'have_animation',
  title: '自带动画',
  list: [
    reservoir_svg_file,
    battery_svg_file,
    PCS_svg_file,
    electricity_meter_svg_file,
    power_cabinet_svg_file,
    transformer_svg_file,
    busbar_svg_file
  ]
};
