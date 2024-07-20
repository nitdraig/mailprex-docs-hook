const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  standstandalone: true,
});

module.exports = withNextra();
