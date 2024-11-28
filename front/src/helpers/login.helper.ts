export const getURLLogin = (withPath = true) => {
  if (withPath) return `/entrar`;
  return `/entrar?path=${decodeURIComponent(location.pathname)}`;
};
