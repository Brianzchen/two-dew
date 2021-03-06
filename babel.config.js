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

module.exports = config;
