import React from "react";
import { useIntl } from "react-intl";
import { H4 } from "@components/Heading";
import { Text } from "@components/Text";
import Div from "@components/Div";
import Icon from "@components/Icon";
import { LinkArrow } from "@components/Link";
import Logo from "./Logo";
import LogoFull from "../assets/logo.png";
import LogoOnly from "../assets/logo-only.png";
import styled from "styled-components";
import Config from "@src/config";

const StyledDiv = styled(Div)`
  i {
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const socialIcons = [
  {
    name: "facebook",
  },
  {
    name: "twitter",
  },
  {
    name: "linkedin",
  },
];

const Footer = () => {
  const { messages } = useIntl();

  return (
    <>
      <Div
        width={1}
        py={[3, 4]}
        px={[3, 5]}
        display="flex"
        flexDirection="row"
        backgroundColor={"var(--turquoise-light)"}
      >
        <Div
          display="flex"
          alignItems="flex-start"
          flexDirection="row"
          flexWrap="wrap"
          mr={[4, "auto"]}
        >
          <Div display={["flex", "none"]} width={1 / 6}>
            <Logo logo={LogoOnly} />
          </Div>
          <Div display={["none", "block"]} width={1 / 6} mr={5}>
            <Logo logo={LogoFull} width={"200px"} />
          </Div>
        </Div>
        <Div
          width={8 / 10}
          display="flex"
          alignItems="flex-start"
          flexDirection="row"
          flexWrap="wrap"
        >
          <Div width={[1, 1, 1 / 2, 1 / 4]} mb={[3, 3, 3, 0]}>
            <H4 mb={2}>{messages.footer_address}</H4>
            <Div>
              <Text mb={1}>{messages.address_line1}</Text>
              <Text display="block" mb={1}>
                {messages.address_line2}
              </Text>
            </Div>
          </Div>
          <Div width={[1, 1, 1 / 2, 1 / 4]} mb={[3, 3, 3, 0]}>
            <H4 mb={2} display="block">
              {messages.contact}
            </H4>
            <Div>
              <Text mb={1} display="block">
                {messages.phone}
              </Text>
              <Text mb={1} display="block">
                {messages.email}
              </Text>
            </Div>
          </Div>
          <Div width={[1, 1, 1 / 2, 1 / 5]} mb={[3, 3, 3, 0]}>
            <LinkArrow
              direction="left"
              href={`${Config.WP_URL}/privacy-policy/`}
              label={messages.privacy_policy}
            >
              <Icon ml={1} name="headerarrowright" />
            </LinkArrow>
          </Div>
          <Div width={[1, 1, 1 / 2, 1 / 5]} mb={[3, 3, 3, 0]}>
            <H4 mb={"20px"} textAlign={["left", "left", "left", "center"]}>
              {messages.social_media}
            </H4>
            <StyledDiv
              display={"flex"}
              justifyContent={["flex-start", "center"]}
            >
              {socialIcons.map((value, index) => (
                <Icon
                  key={index}
                  rounded={true}
                  p={0}
                  name={value.name}
                  mr={3}
                  {...value}
                />
              ))}
            </StyledDiv>
          </Div>
        </Div>
      </Div>
    </>
  );
};

export default Footer;
