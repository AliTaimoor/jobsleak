import { addons } from "@storybook/manager-api"
import { create } from "@storybook/theming"

addons.setConfig({
    theme: create({
        base: "dark",
        brandTitle: "Codepilot - Component Library",
        brandUrl: "https://landing.codepilot.dev",
        brandImage: "https://www.codepilot.dev/images/logo-dark.svg",
    })
})