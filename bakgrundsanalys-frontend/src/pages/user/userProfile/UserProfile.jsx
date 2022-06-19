import React from "react";
import Div from "@components/Div";
import Container from "@components/Container";
import UserInfo from "@pages/user/userProfile/private/UserInfo";

export const UserProfile = () => {
  return (
    <Div
      width={1}
      display="flex"
      alignItems="center"
      flexDirection="column"
      alignContent="space-between"
      justifyContent="space-between"
    >
      <Container>
        <UserInfo />
      </Container>
    </Div>
  );
};

export default UserProfile;
