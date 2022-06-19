import React from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import useHistory from "@utils/useHistory";
import Div from "@components/Div";
import { Text } from "@components/Text";
import { LinkArrow } from "@components/Link";
import Icon from "@components/Icon";
import { PrimaryButtonIcon, PrimaryButtonOutlined } from "@components/Button";
import {
  deleteCustomerProfile,
  deleteUserProfile,
} from "@app/services/users/deleteUserProfileService";
import { LOGIN, INDIVIDUAL } from "@utils/constant";
import { authActions } from "@app/reducers/authReducer";

const DeleteProfileConfirmation = (prop) => {
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const location = useHistory();

  const { onCancelClick, onCloseModal, id, customerType, userInfo } = prop;
  const { customer: { id: customerId = "" } = {} } = userInfo;

  const handleSubmit = async () => {
    try {
      customerType === INDIVIDUAL
        ? await deleteCustomerProfile({
            customerId,
          })
        : await deleteUserProfile({
            id,
          });
      onCloseModal();
      location.push(LOGIN);
      return;
    } catch (e) {
      dispatch(
        authActions.storeUserInfo({
          ...userInfo,
          showConfirmDialog: true,
          isError: true,
        })
      );
      onCloseModal();
    }
  };

  return (
    <Div
      display="flex"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
      maxWidth="380px"
      mt={4}
    >
      <Div textAlign="center" display="grid">
        <Text>
          {messages.user_delete_message}
          {messages.user_delete_byline}
        </Text>
        <Text mt={4}>{messages.user_delete_gdpr_message}</Text>
      </Div>
      <Div mt={30}>
        <LinkArrow direction="left" label={messages.label_more_about_gdpr}>
          <Icon ml={1} name="headerarrowright" />
        </LinkArrow>
      </Div>

      <Div
        mt={4}
        px={[0, 4]}
        width={1}
        display="flex"
        flexDirection={["column-reverse", "row"]}
        justifyContent={"space-between"}
      >
        <PrimaryButtonOutlined
          rounded
          semibold
          label={messages.label_cancel}
          onClick={onCancelClick}
          mt={[3, 0]}
          width={[1, "47%"]}
        />

        <PrimaryButtonIcon
          rounded
          semibold
          width={[1, "47%"]}
          onClick={handleSubmit}
          label={messages.label_delete}
        />
      </Div>
    </Div>
  );
};

export default DeleteProfileConfirmation;
