import babel from '@rollup/plugin-babel';
import buildins from 'builtin-modules';
import path from 'path';

export default {
  input: path.resolve(import.meta.dirname, 'tjs/index.js'),
  output: {
    entryFileNames: 'index.js',
    preferConst: true,
    sourcemap: true,
    exports: 'named',
  },
  external: [...buildins, 'winston-transport', 'syslog-pro'],
  plugins: [
    babel({
      babelHelpers: 'bundled',
    }),
  ],
};
