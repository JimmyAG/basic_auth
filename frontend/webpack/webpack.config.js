/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

module.exports = (envVars) => {
  const { env } = envVars;
  const envConfig = require(`./webpack.${env}.js`);
  const config = merge(commonConfig, envConfig);

  return config;
};
