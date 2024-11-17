import { logout } from "@/helpers/user.helper";
import { Loader } from "@andrevantunes/andrevds";
import { useEffect } from "react";

const SignOut = () => {
  const goToSignInPage = () => location.replace("/");

  useEffect(() => {
    logout();
    setTimeout(goToSignInPage, 0);
  }, []);

  return <Loader />;
};

export default SignOut;
