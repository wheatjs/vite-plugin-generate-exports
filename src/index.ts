import { basename, relative, dirname } from 'path'
import type { Plugin } from 'vite'
import { normalizePath } from 'vite'
import { parse as _parse } from '@babel/parser'
import fg from 'fast-glob'
import { UserOptions } from './types'

function VitePluginGenerateExports(options: UserOptions): Plugin {
  let root: string

  return {
    name: 'vite-plugin-generate-exports',
    apply: 'build',
    enforce: 'pre',
    configResolved(_config) {
      root = _config.root
    },
    async transform(code: string, id: string) {
      const fileRegex = /\.(ts)$/

      // Check if file is a vue file
      if (fileRegex.test(id)) {
        options.patterns?.forEach(({ matchTokens, path }) => {
          const regex = new RegExp(`${matchTokens[0]}[\\s\\S]*?${matchTokens[1]}`, 'im')

          const files = fg.sync(normalizePath(path), {
            ignore: ['node_modules'],
            onlyFiles: true,
            cwd: root,
            absolute: true,
          })

          const generatedExports = files.map((file) => {
            const name = basename(file).split('.')[0]
            const relativePath = relative(dirname(id), file)
            return `export { default as ${name} } from './${normalizePath(relativePath)}'`
          }).join('\n')

          if (regex.test(code))
            code = code.replace(regex, `${matchTokens[0]}\n${generatedExports}\n${matchTokens[1]}`)
        })
      }

      return {
        code,
        map: null,
      }
    },
  }
}

export default VitePluginGenerateExports
