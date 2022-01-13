import path from 'path'
import buildins from 'builtin-modules'
import babel from '@rollup/plugin-babel'

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
    'winston-transport',
    'syslog-pro'
  ],
  plugins: [
    babel({
      babelHelpers: "bundled"
    })
  ]
}
