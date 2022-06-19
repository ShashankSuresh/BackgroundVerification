import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components";
import { BreadCrumb as PRBreadCrumb } from "primereact/breadcrumb";
import { compose, space, layout, flexbox, position } from "styled-system";

const StyledBreadcrumb = styled(PRBreadCrumb)`
  ${compose(space, flexbox, layout, position)};
  border: none;
  .p-breadcrumb-chevron {
    display: none;
  }
  .p-menuitem-link {
    &:focus {
      box-shadow: none !important;
    }
  }
  .p-menuitem-text {
    color: var(--blue-dark) !important;
    font-weight: var(--semibold-weight);
    font-size: var(--fs-text);
    line-height: var(--lh-large);
  }
  .p-menuitem-icon {
    margin-right: 6px;
    transform: rotate(180deg);
    color: var(--turquoise) !important;
  }
  .p-menuitem-link {
    &:focus {
      box-shadow: none !important;
    }
    box-shadow: none !important;
  }
`;

const Breadcrumb = (props) => {
  const { items, home } = props;

  return <StyledBreadcrumb model={items} home={home} {...props} />;
};

Breadcrumb.propTypes = {
  items: Proptypes.array,
  home: Proptypes.object,
};

export default Breadcrumb;
