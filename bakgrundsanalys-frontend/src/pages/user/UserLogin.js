import React from "react";
import Divider from "@components/Divider";
import Login from "@pages/auth/login/Login";
import BankLogin from "@pages/auth/login/bank/BankLogin";
import NewOrExistingAccount from "@pages/auth/shared/NewOrExistingAccount";

const UserLogin = () => (
  <>
    <Login />
    <Divider width={[8 / 10, 8 / 10, 8 / 10, 1 / 2]} m={"0 auto !important"} />
    <BankLogin />
    <NewOrExistingAccount />
  </>
);

export default UserLogin;
