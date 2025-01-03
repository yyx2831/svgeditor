import { IConfigComponentGroup } from '../../types';
import { circuit_breaker_svg_file } from './circuit-breaker';
import { grounding_gate_svg_file } from './grounding-gate';
import { series_capacitors_svg_file } from './series-capacitors';
import { isolation_switch } from './isolation-switch';
import { parallel_capacitor } from './parallel-capacitor';
import { protect } from './protect';
import { working_conditions } from './working-conditions';
import { state } from './state';
import { signage } from './signage';
import { terminal_equipment } from './terminal_equipment';
import { double_roll } from './double-roll';
import { three_volumes } from './three-volumes';
import { load } from './load';
import { parallel_capacitor2 } from './parallel-capacitor2';

// 将新的组件添加到 stateful_group 的 list 中
export const stateful_group: IConfigComponentGroup = {
  groupType: 'stateful',
  title: '第一组别',
  list: [
    circuit_breaker_svg_file,
    grounding_gate_svg_file,
    series_capacitors_svg_file,
    isolation_switch,
    parallel_capacitor,
    protect,
    working_conditions,
    state,
    signage,
    terminal_equipment,
    double_roll,
    three_volumes,
    load,
    parallel_capacitor2
  ]
};
