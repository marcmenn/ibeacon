import presetEnv from '@babel/preset-env'
import path from 'path'
import { rollup } from 'rollup'
import babel from 'rollup-plugin-babel'

const compileFunction = async (input) => {
  const bundle = await rollup({
    input,
    plugins: [babel({
        presets: [presetEnv],
      }
    )]
  })

  const { output } = await bundle.generate({ format: 'es' })

  let fn = null
  for (const item of output) {
    const { type, code, name } = item
    if (type !== 'chunk') {
      throw new Error(`Unsupported rollup output type: ${type}`)
    }

    const r = new RegExp(`^var\\s+${name}\\s*=\\s*\\(function\\s*\\((.*?)\\)`, 'm').exec(code)
    const param = r[1]
    if (fn != null) {
      throw new Error('Already found a chunk')
    }
    fn  = `function (${param}) {
${(code.replace(`export default ${name};`, `return ${name}(${param});`))}}`
  }
  if (fn == null) {
    throw new Error('No chunks found')
  }
  return fn
}

export default async (basedir, config) => {
  const jobs = []

  const ddocs = {}
  for (const [ ddocName, ddocConfig ] of Object.entries(config)) {
    ddocs[ddocName] = {}
    for (const [ viewName, functions ] of Object.entries(ddocConfig)) {
      ddocs[ddocName][viewName] = {}
      for (const [ functionName, file ] of Object.entries(functions)) {
        const fileName = path.resolve(basedir, file)
        jobs.push({ddocName, viewName, functionName, fileName})
      }
    }
  }

  const result = await Promise.all(jobs.map(async ({ddocName, viewName, functionName, fileName}) => {
    const source = await compileFunction(fileName)
    return {ddocName, viewName, functionName, fileName, source}
  }))

  const reducer = (accumulator, {ddocName, viewName, functionName, source}) => {
    accumulator[ddocName][viewName][functionName] = source
    return accumulator
  }
  return result.reduce(reducer, ddocs)
}
