const getOptions = (defaults, params) => {
  const gettedOptions = Object.fromEntries(params);
  const options = Object.assign(defaults, gettedOptions);
  return options;
};

export default getOptions;
