import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Proptypes from "prop-types";

function ScrollToTop({ history, children }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}

ScrollToTop.propTypes = {
  history: Proptypes.node,
  children: Proptypes.node,
};

export default withRouter(ScrollToTop);
