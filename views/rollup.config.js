import babel from 'rollup-plugin-babel'

export default {
  plugins: [babel({
      presets: ['@babel/env'],
    }
  )]
}

