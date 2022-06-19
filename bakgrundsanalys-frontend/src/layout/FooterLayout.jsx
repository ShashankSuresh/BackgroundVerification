import React from "react";
import PropTypes from "prop-types";
import { LinkArrow } from "@components/Link";
import Span from "@components/Span";
import Icon from "@components/Icon";
import Div from "@components/Div";
import useHistory from "@utils/useHistory";
import logoutService from "@app/services/auth/logoutService";
import { LOGIN } from "@utils/constant";

const FooterLayout = ({ buttonLabel }) => {
  const location = useHistory();
  const handleLogout = async () => {
    try {
      await logoutService(localStorage.getItem("token"));
      localStorage.clear();
      location.push(LOGIN);
      return;
    } catch (e) {
      throw new Error(e);
    }
  };
  return (
    <Div borderTop="1px solid var(--turquoise-light)">
      <LinkArrow
        height={50}
        px={20}
        display={"flex"}
        justifyContent={["center", "center", "center", "start"]}
        alignItems="center"
        onClick={handleLogout}
      >
        <Span info medium upper>
          {buttonLabel}
        </Span>
        <Icon
          variant="semibold"
          name="headerarrowright"
          color={"var(--turquoise)"}
          ml={2}
        />
      </LinkArrow>
    </Div>
  );
};

FooterLayout.propTypes = {
  buttonLabel: PropTypes.string,
  redirectTo: PropTypes.string,
};

export default FooterLayout;
