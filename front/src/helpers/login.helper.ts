export const getURLLogin = (route?: string) => {
  const path = '/login'
  if(route) return `${path}?path=${route}`;
  if(typeof(location) != 'undefined') return `${path}?path=${decodeURIComponent(location.pathname)}`;
  return path;
};
