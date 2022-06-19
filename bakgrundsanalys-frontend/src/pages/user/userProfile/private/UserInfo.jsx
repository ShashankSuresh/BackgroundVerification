import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { default as Div } from "@components/Div";
import { H1, H2 } from "@components/Heading";
import Icon from "@components/Icon";
import Dialog from "@components/Dialog";
import ListItem from "@components/ListItem";
import Link from "@components/Link";
import { PrimaryButtonIcon } from "@components/Button";
import ModalHeader from "./ModalHeader";
import EditForm from "./EditForm";
import { addHyphenToNumber } from "@utils/utils";
import { TextLarge, TextLargeSemiBoldWeight } from "@components/Text";
import ConfirmationDialog from "@pages/shared/ConfirmationDialog";

const EditDialog = (prop) => {
  const { editType, handleModal, onCloseModal } = prop;
  return (
    <Dialog
      header={<ModalHeader editType={editType} />}
      visible="displayBasic"
      draggable={false}
      onHide={handleModal(editType)}
      editType={editType}
      m={[3, 3, 3, "auto"]}
    >
      <EditForm
        {...prop}
        onCancelClick={handleModal()}
        onCloseModal={onCloseModal}
      />
    </Dialog>
  );
};

export const UserInfo = ({ isAdmin = false }) => {
  const userInfo = useSelector((state) => state.authReducer.userInfo);

  const [openDialog, setOpenDialog] = useState(false);
  const [editType, setEditType] = useState("user");
  const { messages } = useIntl();

  const {
    name,
    email,
    phone: phoneNumber,
    personal_number,
    id,
    customer = {},
    showConfirmDialog,
    isError = false,
  } = userInfo;
  const { type: customerType = "" } = customer;

  const personalNumber = personal_number
    ? addHyphenToNumber(personal_number.toString(), 8)
    : "-";

  const handleCloseModal = () => {
    setOpenDialog(!openDialog);
  };
  const handleModal = (editTypeArg) => () => {
    setEditType(editTypeArg);
    setOpenDialog(!openDialog);
  };

  return (
    <>
      {openDialog && (
        <EditDialog
          editType={editType}
          handleModal={handleModal}
          onCloseModal={handleCloseModal}
          id={id}
          customerType={customerType}
          userInfo={userInfo}
        />
      )}
      {showConfirmDialog && (
        <ConfirmationDialog
          isError={isError}
          byline={
            isError ? messages.invalid_data : messages.text_update_sucessful
          }
        />
      )}
      <>
        <Div>
          {!!isAdmin && <H1 mb={3}>{messages.title_my_profile}</H1>}
          <H2 mb={3}>{messages.title_user_info}</H2>
          <Div>
            <ul>
              <ListItem pb={3}>
                <TextLargeSemiBoldWeight semibold py={3}>
                  {messages.label_name}:
                </TextLargeSemiBoldWeight>
                <TextLarge mt={2} mx={1} fontWeight={300}>
                  {name}
                </TextLarge>
              </ListItem>
              <ListItem pb={3}>
                <TextLargeSemiBoldWeight semibold py={3}>
                  {messages.label_email}:
                </TextLargeSemiBoldWeight>
                <TextLarge mt={2} mx={1} fontWeight={300}>
                  {email}
                </TextLarge>
              </ListItem>
              <ListItem pb={3}>
                <TextLargeSemiBoldWeight semibold py={3}>
                  {messages.label_phone}:
                </TextLargeSemiBoldWeight>
                <TextLarge mt={2} mx={1} fontWeight={300}>
                  {phoneNumber || "-"}
                </TextLarge>
              </ListItem>
            </ul>
          </Div>
          <Div
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            mt={3}
          >
            <Link
              label={messages.label_edit_user_info}
              direction="right"
              onClick={handleModal(isAdmin ? "adminUser" : "user")}
              iconPos="left"
            >
              <Icon name="pen" mr={2} />
            </Link>
            <Link
              mt={2}
              label={messages.label_change_password}
              direction="right"
              onClick={handleModal("password")}
              iconPos="left"
            >
              <Icon name="pen" mr={2} />
            </Link>
          </Div>
          <Div
            mt={4}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            {!isAdmin && (
              <>
                <H2>{messages.label_personal_number}</H2>
                <TextLargeSemiBoldWeight semibold mt={1} mb={2} py={3}>
                  {messages.label_personal_number}:
                  <TextLarge mt={2} mx={1}>
                    {personalNumber}
                  </TextLarge>
                </TextLargeSemiBoldWeight>
                <Link
                  py={1}
                  label={messages.label_edit}
                  direction="right"
                  onClick={handleModal("personalNumber")}
                  iconPos="left"
                >
                  <Icon name="pen" mr={2} />
                </Link>
              </>
            )}
            <Div mt={4}>
              <PrimaryButtonIcon
                rounded
                semibold
                px={25}
                icon={<Icon mr={1} name="rubber" />}
                onClick={handleModal("deleteProfile")}
                label={messages.label_delete_profile}
              />
            </Div>
          </Div>
        </Div>
      </>
    </>
  );
};

UserInfo.propTypes = {
  isAdmin: PropTypes.bool,
};

export default UserInfo;
