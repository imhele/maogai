import { Route } from '@/components/SiderMenu';
import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { RouterTypes } from 'umi';
import { GlobalModelState } from './global';

export { GlobalModelState };

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ConnectState) => T) => T },
) => void;

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T extends { [key: string]: any } = {}>
  extends Partial<RouterTypes<Route>> {
  dispatch?: Dispatch;
}

export default ConnectState;
