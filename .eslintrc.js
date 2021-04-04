module.exports = {
  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
  ],
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  parser: 'babel-eslint',
  plugins: [
    'react',
    'jest',
    'flowtype',
    'react-hooks',
  ],
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
  },
  rules: {
    camelcase: 0,
    'max-len': ['error', 100, 2, {
      ignoreUrls: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignorePattern: '^.*React\\$AbstractComponent.*',
    }],
    'no-underscore-dangle': 0,
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'import/order': [
      'error',
      {
        'newlines-between': 'always-and-inside-groups',
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
        pathGroups: [
          {
            pattern: '@{pkgs,core}/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal'],
      },
    ],
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
    'quote-props': ['error', 'as-needed', { keywords: false, unnecessary: true, numbers: true }],
    'flowtype/delimiter-dangle': [
      2,
      'always-multiline',
    ],
    'flowtype/no-weak-types': [2, {
      any: false,
      Object: true,
      Function: true,
    }],
    'flowtype/object-type-curly-spacing': [2, 'always'],
    'flowtype/semi': [2, 'always'],
    'flowtype/type-id-match': ['error', '^_?([A-Z][A-Za-z0-9]*)$'],
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-curly-brace-presence': ['error', {
      props: 'never',
      children: 'ignore',
    }],
    'react/jsx-curly-spacing': [2, {
      when: 'never',
      children: true,
    }],
    'react/jsx-indent': [2, 2, {
      checkAttributes: true,
      indentLogicalExpressions: true,
    }],
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'react/jsx-newline': ['error', { prevent: true }],
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'react-hooks/rules-of-hooks': 'error',
    'import/no-extraneous-dependencies': 0, // Turn off to allow mono-repo to import without defining common deps in respective package.json
  },
};
