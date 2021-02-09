import esbuild from 'rollup-plugin-esbuild'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

export default {
  input: './src/index.ts',
  output: {
    dir: './dist',
    format: 'iife',
  },
  plugins: [
    json(),
    commonjs(),
    esbuild({
      include: /\.[jt]sx?$/,
      watch: !!process.env.ROLLUP_WATCH,
      minify: process.env.NODE_ENV === 'production',
      loaders: {
        '.json': 'json',
        '.js': 'jsx'
      }
    }),
  ],
}