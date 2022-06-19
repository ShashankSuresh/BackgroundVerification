import React from "react";
import styled from "styled-components";
import { Divider as PRDivider } from "primereact/divider";
import { space, layout, position } from "styled-system";

const StyledDivider = styled(PRDivider)(space, layout, position);

const Divider = (props) => <StyledDivider {...props} />;

export default Divider;
