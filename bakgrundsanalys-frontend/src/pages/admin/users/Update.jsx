import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import Div from "@components/Div";
import { H3 } from "@components/Heading";
import { TextLargeSemiBoldWeight, TextLarge } from "@components/Text";
import Icon from "@components/Icon";
import { PrimaryButtonIcon } from "@components/Button";
import updateUser from "@app/services/users/updateUserService";
import Form from "./Form";
import resendInvitation from "@app/services/users/resendInvitationService";

const Update = ({
  onCancel = () => {},
  subUser = false,
  userData = {},
  roles = [],
  customerId = "",
  isMyProfile = false,
}) => {
  const { messages } = useIntl();
  const [userDetails, setUserDetails] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [responseData, setResponseData] = useState({});

  useEffect(() => {
    const { status, firstname, lastname, role, email, phone, permissions } =
      userData;
    const rights = {};
    permissions &&
      permissions.length &&
      permissions.map((obj) => {
        const { name = "" } = obj;
        if (name.includes("write")) {
          rights[name.split("write-")[1]] = "write";
        }
        if (name.includes("read")) {
          rights[name.split("read-")[1]] = "read";
        }
      });
    const payload = {
      firstname: firstname,
      lastname: lastname,
      role: role,
      email: email,
      phone: phone,
      permissions: rights,
    };

    const activeUser = status === "active";
    setUserDetails({ data: payload, activeUser: activeUser });
  }, [userData]);

  const handleSubmit = async (data) => {
    if (subUser) {
      data.customerId = customerId || "";
    }
    try {
      await updateUser(data, subUser, userData.id, activeUser);
    } catch (e) {
      throw new Error(e);
    }
    onCancel();
  };

  const handleResendInvite = async () => {
    setIsFetching(true);
    const { id } = userData;
    try {
      const response = await resendInvitation(id);
      const { data = {} } = response;
      setResponseData(data);
      setIsFetching(false);
    } catch (e) {
      setIsFetching(false);
      throw new Error(e);
    }
  };

  const { data = {}, activeUser = false } = userDetails;
  const { email = "" } = data;

  return (
    <Div>
      <Div
        display="flex"
        justifyContent="center"
        flexDirection="column"
        textAlign="center"
        alignItems="center"
      >
        <H3 mt={2}>{messages.label_edit_user}</H3>

        {!activeUser && (
          <>
            {isFetching ? (
              <>
                <h1>{messages.text_loading}...</h1>
              </>
            ) : (
              <>
                {responseData === 200 ? (
                  <TextLargeSemiBoldWeight
                    mt={10}
                    color="var(--blue-dark) !important"
                  >
                    {messages.text_email_resent}
                  </TextLargeSemiBoldWeight>
                ) : responseData === 401 ? (
                  <TextLargeSemiBoldWeight mb={20}>
                    {messages.error}
                  </TextLargeSemiBoldWeight>
                ) : (
                  <>
                    <TextLargeSemiBoldWeight my={20}>
                      <Icon name="sign" color="var(--red)" mr={2} />
                      {messages.user_not_verified}
                    </TextLargeSemiBoldWeight>
                    <TextLarge mb={20}>
                      {messages.message_invite_sent_email}
                    </TextLarge>
                    <TextLargeSemiBoldWeight mb={15}>
                      {email}
                    </TextLargeSemiBoldWeight>
                    <PrimaryButtonIcon
                      width={[1, 1, 1, "auto"]}
                      height={40}
                      minWidth={170}
                      onClick={handleResendInvite}
                      label={messages.label_resend_verification}
                      icon={<Icon name="backarrow" mr={2} variant="semibold" />}
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
      </Div>
      {
        <Form
          activeUser={activeUser}
          onSubmit={handleSubmit}
          subUser={subUser}
          roles={roles}
          userData={data}
          edit
          userId={userData.id}
          customerId={customerId}
          onCancel={onCancel}
          isMyProfile={isMyProfile}
        />
      }
    </Div>
  );
};

Update.propTypes = {
  onCancel: PropTypes.func,
  subUser: PropTypes.bool,
  userData: PropTypes.object,
  roles: PropTypes.array,
  customerId: PropTypes.string,
  isMyProfile: PropTypes.bool,
};
export default Update;
