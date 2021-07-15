import path from 'path'
import buildins from 'builtin-modules'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: path.resolve(__dirname, 'tjs/index.js'),
  output: {
    entryFileNames: 'index.js',
    preferConst: true,
    sourcemap: true,
    exports: 'named'
  },
  external: [
    ...buildins,
    'joi',
    /^lodash.*/
  ],
  plugins: [
    babel({
      babelHelpers: "bundled"
    }),
    nodeResolve(),
    commonjs({
      include: /node_modules/
    }),
    json()
  ]
}
