import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import GenerateExports from 'vite-plugin-vue-gql'
import WindiCSS from 'vite-plugin-windicss'
import ts from 'rollup-plugin-typescript2'

const config = defineConfig({
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'VueTeleportPlus',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  esbuild: false,
  plugins: [
    GenerateExports({
      patterns: [
        {
          matchTokens: ['// Start_Exports', '// End_Exports'],
          path: 'src/components/**/*.vue',
        },
      ],
    }),
    Vue(),
    {
      apply: 'build',
      ...ts({
        tsconfig: './tsconfig.json',
        check: false,
        useTsconfigDeclarationDir: true,
      }),
    },
  ],
})

export default config
