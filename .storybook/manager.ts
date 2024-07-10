import { addons } from "@storybook/manager-api"
import { create } from "@storybook/theming"

addons.setConfig({
    theme: create({
        base: "dark",
        brandTitle: "Jobsleak - Component Library",
        brandUrl: "https://jobsleak.com",
        brandImage: "",
    })
})