import { DeepConfig, StateType } from '../../types';
export declare function hasChildrenStates(value: any): value is {
  states: Record<string, DeepConfig>;
  id?: string;
  type?: StateType;
};
