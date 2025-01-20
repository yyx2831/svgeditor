import { IConfigComponentGroup } from '../../types';
import { alternator_svg_file } from './alternator';
import { traction_transformer_svg_file } from './traction-transformer';
import { circuit_breaker_voltage_svg_file } from './circuit_breaker_svg_file';
import { resistance_svg_file } from './resistance';
import { prohibit } from './prohibit';
import { three_winding_transformer_svg_file } from './three-winding-transformer';
import { shunt_reactance } from './shunt-reactance';
import { transformer } from './transformer';

export const stateless_group: IConfigComponentGroup = {
  groupType: 'stateless',
  title: '第二组别',
  list: [
    alternator_svg_file,
    traction_transformer_svg_file,
    circuit_breaker_voltage_svg_file,
    resistance_svg_file,
    prohibit,
    three_winding_transformer_svg_file,
    shunt_reactance,
    transformer
  ]
};
