import camelCaseToKebabCase from "./camelCaseToKebabCase";

const setTheme = (options) => {
  const root = document.documentElement;
  const { lang, ...colors } = options;
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(
      `--widgethash-${camelCaseToKebabCase(key)}`,
      `#${value}`
    );
  });
};

export default setTheme;
