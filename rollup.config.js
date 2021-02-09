// @ts-check
import hq from 'alias-hq';
import json from '@rollup/plugin-json';
import esbuild from 'rollup-plugin-esbuild';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';

/** @type {import('rollup').RollupOptions[]} */
const config = [
  {
    input: './src/index.ts',
    output: {
      dir: './dist',
      format: 'iife'
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),

      json(),

      nodeResolve(),

      commonjs(),

      // alias plugin for esbuild with `compilerOptions.paths`
      // https://github.com/egoist/rollup-plugin-esbuild/issues/70#issuecomment-742691119
      alias({
        entries: hq.get('rollup', { format: 'array' })
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
