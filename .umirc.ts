// ref: https://umijs.org/config/
import { IConfig } from 'umi-types';

const config: IConfig = {
  hash: true,
  treeShaking: true,
  ignoreMomentLocale: true,
  targets: {
    ie: 10,
    android: 4,
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        // hardSource: true,
        title: 'MaoGai',
        dva: {
          hmr: true,
          immer: true,
        },
        dynamicImport: {
          level: 5,
          webpackChunkName: true,
          loadingComponent: './components/PageLoading',
        },
      },
    ],
    // ref: https://github.com/imhele/umi-plugin-nprogress
    'umi-plugin-nprogress',
  ],
};

export default config;
