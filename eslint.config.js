import pluginRouter from '@tanstack/eslint-plugin-router'

export default [
  {
    plugins: {
      '@tanstack/router': pluginRouter,
    },
    globals: {
      page: true,
      REACT_APP_ENV: true,
    },
    rules: {
      // 安全禁用 'React' must be in scope when using JSX 警告
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      //   "tailwindcss/no-custom-classname": "off",
      //   "@typescript-eslint/no-unused-expressions": "off",
      //   "@typescript-eslint/ban-types": "off",
      '@typescript-eslint/no-floating-promises': ['error', {
        'ignoreVoid': true,
      }],
      '@tanstack/router/create-route-property-order': 'error',
    },
  },
]
