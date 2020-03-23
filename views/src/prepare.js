import babelCore from '@babel/core'
import path from 'path'
import { rollup } from 'rollup'
import babel from 'rollup-plugin-babel'

const { transformFileSync } = babelCore

const babelOptions = {
  presets: ['@babel/env'],
}

// Transform to json with sourcecode of functions
function replacer(key, value) {
  if (typeof (value) === 'function') {
    return value.toString()
  }
  return value
}

export default async (basedir, config) => {
  const views = {}

  for (const [ viewName, functions ] of Object.entries(config)) {
    const view = {}
    for (const [ functionName, file ] of Object.entries(functions)) {
      const input = path.resolve(basedir, file)
      const bundle = await rollup({
        input,
        plugins: [babel({
            presets: ['@babel/env'],
          }
        )]
      })

      const { output } = await bundle.generate({
        format: 'es'
      })

      for (const item of output) {
        const { type, code, name } = item
        if (type !== 'chunk') {
          throw new Error(`Unsupported rollup output type: ${type}`)
        }

        const r = new RegExp(`^var\\s+${name}\\s*=\\s*\\(function\\s*\\((.*?)\\)`, 'm').exec(code)
        const param = r[1]
        view[functionName] = `function (${param}) {
${(code.replace(`export default ${name};`, `return ${name}(${param});`))}}`
      }
    }
    views[viewName] = view
  }
  return { views }
}
