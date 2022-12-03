module.exports = {
   env: {
      browser: true,
      es6: true,
      node: true,
      'jest/globals': true,
   },
   extends: [
      'airbnb',
      'eslint:recommended',
      'prettier',
      'plugin:jest/all',
      'plugin:@typescript-eslint/recommended',
   ],
   rules: {
      'import/no-extraneous-dependencies': [
         'error',
         {
            devDependencies: [
               '**/setupTest.ts',
               '**/*.test.ts',
               '**/*.test.tsx',
               'src/utils/tests/*',
            ],
         },
      ],
      '@typescript-eslint/no-var-requires': 0,
      'import/no-dynamic-require': 0,
      'global-require': 0,
      'import/prefer-default-export': 0,
      'jsx-a11y/label-has-associated-control': 0,
      'react/prop-types': 0,
      '@typescript-eslint/no-explicit-any': 0,
      'no-nested-ternary': 0,
      'react/jsx-props-no-spreading': 0,
      'react/require-default-props': 0,
      'eslint-disable-next-line': 0,
      'default-param-last': 0,
      'no-shadow': 0,
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'no-use-before-define': 0,
      'jest/require-hook': 0,
      'consistent-return': 0,
      'react/jsx-filename-extension': [
         1,
         { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      ],
   },
   plugins: ['jest', '@typescript-eslint'],
   parser: '@typescript-eslint/parser',
};