export {
  loginByEmail,
  signUpByEmail,
  loginByGoogle,
  loginByFacebook,
} from "@mesalva/react-login/dist/services/LoginService";

export const getURLLogin = (withPath = true) => {
  if (withPath) return `/entrar`;
  return `/entrar?path=${decodeURIComponent(location.pathname)}`;
};
