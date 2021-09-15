import NodePath from 'path'
import RollupJson from '@rollup/plugin-json'
import RollupNodeResolve from '@rollup/plugin-node-resolve'
import RollupCommonjs from '@rollup/plugin-commonjs'
import RollupTypescript from 'rollup-plugin-typescript2'
// import RollupCopy from 'rollup-plugin-copy'
import css from 'rollup-plugin-css-only'

import Package from './package.json'

const resolveFile = path => NodePath.resolve(__dirname, path)

const externalPackages = [
  'react',
  'react-dom',
  '@tarojs/components',
  '@tarojs/runtime',
  '@tarojs/taro',
  '@tarojs/react'
]

export default {
  input: resolveFile(Package.source),
  output: [
    {
      file: resolveFile(Package.main),
      format: 'cjs',
      sourcemap: true
    },
    {
      file: resolveFile(Package.module),
      format: 'es',
      sourcemap: true
    },
    {
      file: resolveFile(Package.browser),
      format: 'umd',
      name: 'taro-ui',
      sourcemap: true,
      globals: {
        react: 'React',
        '@tarojs/components': 'components',
        '@tarojs/taro': 'Taro'
      }
    }
  ],
  external: externalPackages,
  plugins: [
    RollupNodeResolve({
      moduleDirectories: ['node_modules']
    }),
    RollupCommonjs({
      include: /\/node_modules\//
    }),
    RollupJson(),
    RollupTypescript({
      tsconfig: resolveFile('tsconfig.rollup.json')
    }),
    css({ output: 'TaroCanvas.css' })
    // RollupCopy({
    //   targets: [
    //     {
    //       src: resolveFile('src/index.css'),
    //       dest: resolveFile('dist')
    //     }
    //   ]
    // }),
  ]
}