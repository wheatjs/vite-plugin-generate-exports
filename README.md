# vite-plugin-generate-exports

> ⚠️ This plugin is experimental and is subject to change. It is not currently recommended that you use this plugin.

## Install
```bash
# Install Plugin
npm i -D vite-plugin-generate-exports

# Required if you want type generation
npm i -D rollup-plugin-typescript2
```

```ts
// vite.config.ts

import GenerateExports from 'vite-plugin-generate-exports'
import { defineConfig } from 'vite'

export default defineConfig({
  lib: {
    // Build Config
  },
  plugins: [
    GenerateExports({
      patterns: [
        {
          matchTokens: ['// Start_Exports', '// End_Exports'],
          path: 'src/components/**/*.vue'
        }
      ]
    })
  ],
})
```

### Generating Types
If you want type generation you currently have to switch to using `rollup-plugin-typescript2`. 

```ts
// vite.config.ts

import GenerateExports from 'vite-plugin-generate-exports'
import ts from 'rollup-plugin-typescript2'
import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: false,
  build: {
    // Build Config
  }
  build: {

  }
  plugins: [
    GenerateExports({
      patterns: [
        {
          matchTokens: ['// Start_Exports', '// End_Exports'],
          path: 'src/components/**/*.vue'
        }
      ]
    }),
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
```

`tsconfig.json`
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "module": "ESNext",
    "target": "es2016",
    "lib": ["DOM", "ESNext"],
    "strict": true,
    "esModuleInterop": true,
    "incremental": true,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "declaration": true,
    "declarationDir": "./dist",
    "outDir": "./dist",
    "paths": {
      "~/*": ["src/*"]
    }
  },
  "include": ["src"],
  "exclude": [
    "node_modules",
    "**/**/*.test.ts",
    "**/**/*.md",
    "**/dist",
    "packages/.test",
    "packages/_docs"
  ]
}
```

## Usage

At build time your files will be injected as exports between the two match tokens you set in the config.
```ts
// main.ts

export const install = () => {
  // This is my install function
}

// Start_Exports

// End_Exports

```


## License

[MIT License](https://github.com/jacobclevenger/vite-plugin-generate-exports/blob/main/LICENSE) © 2021-PRESENT [Jacob Clevenger](https://github.com/jacobclevenger)
