import next from 'eslint-config-next/core-web-vitals'

const eslintConfig = [
  ...next,
  {
    rules: {
      '@next/next/no-img-element': 'off',
      'no-unused-vars': 'warn'
    }
  },
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**']
  }
]

export default eslintConfig
