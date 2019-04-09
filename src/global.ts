import { version } from 'antd';

// tslint:disable-next-line
console.log(`[VersionInfo] Ant Design ${version}`);

export const APIPrefix: string = '/api';

/**
 * Global id for components
 */
export const enum GlobalId {
  BasicLayout,
}

/**
 * Id for storage items.
 */
export enum StorageId {}
