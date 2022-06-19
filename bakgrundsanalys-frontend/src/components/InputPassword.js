import React, { memo } from "react";
import styled from "styled-components";
import StyledInputText from "@components/StyledInputText";
import { default as Div } from "@components/Div";
import Icon from "@components/Icon";
import { INPUT } from "@utils/constant";

const WithStyledDiv = styled(Div)`
  i {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const InputPassword = (props) => <CustomInputPassword {...props} />;

const CustomInputPassword = (prop) => {
  const { TEXT, PASSWORD } = INPUT.TYPE;

  return (
    <Div
      position="relative"
      display="flex"
      justifyContent="center"
      width={[1, "auto"]}
    >
      <WithStyledDiv>
        <Icon
          name={prop.showPassword ? "showeye" : "hideeye"}
          onClick={prop.onTogglePassword(prop.name)}
        />
      </WithStyledDiv>
      <StyledInputText {...prop} type={prop.showPassword ? PASSWORD : TEXT} />
    </Div>
  );
};

export default memo(InputPassword);
