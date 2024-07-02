import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-styling-webpack",
    ({
      name: "@storybook/addon-styling-webpack",

      options: {
        rules: [{
          test: /\.css$/,
          sideEffects: true,
          use: [
            require.resolve("style-loader"),
            {
              loader: require.resolve("css-loader"),
              options: {

                importLoaders: 1,
              },
            }, {
              loader: require.resolve("postcss-loader"),
              options: {
                implementation: require.resolve("postcss"),
              },
            },
          ],
        },],
      }
    }),
    "@storybook/addon-styling",
    "@storybook/addon-themes",
    "@storybook/addon-mdx-gfm",
  ],
  webpackFinal(config, options) {
    (config.resolve as any).alias = {
      ...(config.resolve as any).alias,
      '@': path.resolve(__dirname, "../src/"),
      '@/icons': path.resolve(__dirname, "../assets/icons/"),
    };
    // This modifies the existing image rule to exclude .svg files
    // since you want to handle those files with @svgr/webpack
    const imageRule = (config.module as any).rules.find((rule) => rule?.['test']?.test('.svg'));
    if (imageRule) {
      imageRule['exclude'] = /\.svg$/;
    }

    // Configure .svg files to be loaded with @svgr/webpack
    (config.module as any).rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
