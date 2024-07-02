import type { Preview } from "@storybook/react";
import '../src/app/globals.css';
import { withThemeByClassName, withThemeByDataAttribute } from '@storybook/addon-styling';
import { themes } from '@storybook/theming';
const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
  parameters: {
    darkMode: {
      dark: themes.dark,
      light: themes.light,
    },
    docs: {
      theme: themes.dark,
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
