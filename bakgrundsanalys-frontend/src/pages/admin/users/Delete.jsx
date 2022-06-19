import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import Div from "@components/Div";
import Dialog from "@components/Dialog";
import { PrimaryButton, PrimaryButtonOutlined } from "@components/Button";
import { H3 } from "@components/Heading";

const Delete = ({ children = {}, onDelete, onCancel, subUser = false }) => {
  const { messages } = useIntl();
  const dialogHeader = () => (
    <Div textAlign="center" width={1} mt={2} mb={4}>
      <H3>
        {subUser ? messages.title_delete_sub_user : messages.label_delete_user}
      </H3>
    </Div>
  );

  const dialogFooter = () => (
    <Div
      display="flex"
      justifyContent="center"
      flexDirection={["column-reverse", "row"]}
    >
      <Div mr={[0, 4]} mb={[20, 20, 20, 0]}>
        <PrimaryButtonOutlined
          label={messages.label_cancel}
          onClick={onCancel}
          px={"42px"}
          mt={[20, 0]}
          height={40}
          width={"100%!important"}
          minWidth={119}
        />
      </Div>
      <Div>
        <PrimaryButton
          label={
            subUser ? messages.title_delete_sub_user : messages.label_delete
          }
          onClick={onDelete}
          mt={[20, 20, 20, 0]}
          minWidth={198}
          width={"100%!important"}
        />
      </Div>
    </Div>
  );
  return (
    <Dialog
      header={dialogHeader}
      visible="displayBasic"
      draggable={false}
      footer={dialogFooter}
      onHide={onCancel}
      width={[1, 1, 1, 445]}
      m={[3, 3, 3, "auto"]}
    >
      {children}
    </Dialog>
  );
};

Delete.propTypes = {
  children: PropTypes.node,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  subUser: PropTypes.bool,
};
export default Delete;
