// @ts-check
import json from '@rollup/plugin-json';
import builtins from 'builtin-modules';
import esbuild from 'rollup-plugin-esbuild';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
const pkg = require('./package.json');

/** @type {import('rollup').RollupOptions[]} */
const config = [
  {
    input: './src/index.ts',
    output: {
      dir: './dist',
      format: 'commonjs'
    },
    external: [
      ...builtins,
      ...Object.keys(pkg.dependencies),
      ...Object.keys(pkg.devDependencies)
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        preventAssignment: true
      }),

      json(),

      nodeResolve(),

      commonjs(),

      // alias plugin for esbuild with `compilerOptions.paths`
      // https://github.com/egoist/rollup-plugin-esbuild/issues/70#issuecomment-742691119
      alias({
        entries: [
          {
            find: '@',
            replacement: __dirname + '/src'
          }
        ]
      }),
      esbuild({
        include: /\.[jt]sx?$/,
        minify: process.env.NODE_ENV === 'production',
        tsconfig: './tsconfig.json',
        loaders: {
          '.json': 'json',
          '.js': 'jsx'
        }
      })
    ]
  }
];

export default config;
