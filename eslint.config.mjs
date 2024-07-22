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
];
