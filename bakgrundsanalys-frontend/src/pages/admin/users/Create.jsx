import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import Div from "@components/Div";
import { H3 } from "@components/Heading";
import { Text } from "@components/Text";
import Form from "./Form";
import inviteUser from "@app/services/users/inviteUserService";

const Create = ({
  onCancel = () => {},
  subUser = false,
  roles = [],
  customerId = "",
}) => {
  const { messages } = useIntl();

  const handleSubmit = async (data) => {
    if (subUser) {
      data.customerId = customerId || "";
    }
    try {
      await inviteUser(data, subUser);
    } catch (e) {
      throw new Error(e);
    }
    onCancel();
  };

  return (
    <>
      <Div
        display="flex"
        justifyContent="center"
        flexDirection="column"
        textAlign="center"
      >
        <H3 mb={4}>{messages.label_add_user}</H3>
        <Text>{messages.message_enter_email}</Text>
      </Div>
      <Form
        inviteUser
        onSubmit={handleSubmit}
        onCancel={onCancel}
        subUser={subUser}
        buttonLabel={messages.label_invite}
        roles={roles}
        customerId={customerId}
      />
    </>
  );
};

Create.propTypes = {
  onCancel: PropTypes.func,
  subUser: PropTypes.bool,
  roles: PropTypes.array,
  customerId: PropTypes.string,
};

export default Create;
