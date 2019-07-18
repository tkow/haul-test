import * as path from 'path';
import { makeConfig, withPolyfills } from '@haul-bundler/preset-0.60';
import { smart } from 'webpack-merge';

var detoxFlg = process.env.APP_ENV === 'detox_tests';
var detoxExtension = detoxFlg ? ['.mock.behaviour.js'] : [];

const webpackConfig = ({ config, env, runtime }) => {
  const { platform } = env;
  const addConfig = {
    resolveLoader: {
      modules: ['node_modules', path.resolve(__dirname, 'loaders')]
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [
            path.join(__dirname, 'app/'),
            path.join(__dirname, 'native-base-theme'),
            path.join(__dirname, 'node_modules/native-base'),
            path.join(__dirname, 'vender/ts_modules'),
            path.join(__dirname, 'node_modules/native-base-shoutem-theme'),
            path.join(
              __dirname,
              'node_modules/@react-native-community/async-storage'
            )
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['module:metro-react-native-babel-preset']
            }
          }
        },
        {
          test: /\.tsx?$/,
          include: [
            path.join(__dirname, 'app/'),
            path.join(__dirname, 'vender/ts_modules')
          ],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['module:metro-react-native-babel-preset']
              }
            },
            {
              loader: 'ts-loader'
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        '~': path.join(__dirname, 'app/'),
        'lev-ts-lib': path.join(__dirname, 'vender', 'ts_modules/'),
        'native-base-theme': path.join(__dirname, 'native-base-theme/')
      },
      modules: [path.resolve(__dirname, 'app'), 'node_modules'],
      extensions: [
        `.${platform}.tsx`,
        `.${platform}.ts`,
        `.${platform}.jsx`,
        `.${platform}.js`,
        '.native.tsx',
        '.native.ts',
        '.native.jsx',
        '.native.js',
        ...detoxExtension,
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.yml',
        '.yaml'
      ]
    }
  };
  const _config = smart(config, addConfig);
  console.log(runtime);
  Object.keys(_config).forEach(configKey => {
    config[configKey] = _config[configKey];
  });
};

export default makeConfig({
  bundles: {
    index: {
      entry: withPolyfills('./index.js'),
      transform: webpackConfig
    }
  }
});
