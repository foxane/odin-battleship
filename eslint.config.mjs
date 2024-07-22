import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  pluginJs.configs.all,
  {
    files: ['test/**'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    files: ['src/js/**'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    ignores: ['*config.*'],
  },
  {
    rules: {
      curly: 'off',
      'no-magic-numbers': 'off',
      'no-ternary': 'off',
      'id-length': 'off',
    },
  },
];
