const camelCaseToKebabCase = (str) =>
  str.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

export default camelCaseToKebabCase;
