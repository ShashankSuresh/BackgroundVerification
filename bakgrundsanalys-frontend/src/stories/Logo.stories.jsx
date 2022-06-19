import React from "react";
import Logo from "@components/Logo";
import LogoFull from "@assets/logo.png";
import LogoOnly from "@assets/logo-only.png";

export default {
  title: "components/Logo",
};

export const LogoTransparent = () => <Logo logo={LogoFull} />;

export const LogoTransparentOnly = () => <Logo logo={LogoOnly} />;
