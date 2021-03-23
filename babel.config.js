const config = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { browsers: ['last 2 versions', 'safari >= 7'] },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
  plugins: [
    [
      'transform-imports',
      {
        lodash: {
          transform: 'lodash/${member}', // eslint-disable-line
          preventFullImport: true,
        },
        'react-router': {
          transform: 'react-router-dom/${member}', // eslint-disable-line
          preventFullImport: true,
        },
      },
    ],
  ],
};

if (process.env.NODE_ENV !== 'test') {
  config.presets[0][1].modules = false;
  config.ignore = [
    '*/**/*.spec.js',
    '*/**/testUtils/*',
  ];
}

module.exports = config;
