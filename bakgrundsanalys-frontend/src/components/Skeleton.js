import React from "react";
import { Skeleton as PRSkeleton } from "primereact/skeleton";
import styled from "styled-components";
import {
  compose,
  space,
  layout,
  flexbox,
  position,
  typography,
} from "styled-system";

const StyledSkeleton = styled(PRSkeleton)`
  ${compose(layout, compose, space, flexbox, typography, position)};
`;

const Skeleton = (props) => {
  return <StyledSkeleton {...props} />;
};

export default Skeleton;
