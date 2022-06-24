module.exports = {
  addons: [
    "@storybook/addon-actions/register",
    "@storybook/addon-knobs/register",
    "@storybook/addon-viewport/register",
    "./storybook-addons/withAllViewPorts/register.js",
  ],
  stories: ["../src/**/*.stories.js"],
};
