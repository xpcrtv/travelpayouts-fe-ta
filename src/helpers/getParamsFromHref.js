const getParamsFromHref = (href) => {
  const url = new URL(href, location.origin);
  const params = [...url.searchParams];
  return params;
};

export default getParamsFromHref;
