import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import Container from "@components/Container";
import DataTable from "@components/Table/Table";
import { PrimaryButtonIcon } from "@components/Button";
import Icon from "@components/Icon";
import { USERS, WRITE } from "@utils/constant";

const Users = ({
  onInvite,
  onEdit,
  onDelete,
  customerId,
  reloadList,
  onSelectedRow,
}) => {
  const { messages } = useIntl();
  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const { permissions = {} } = userInfo;

  let config = [
    {
      title: messages.title_users,
      emptyMessage: "No users found",
      headerActions: [],
      columns: [
        { field: "name", header: messages.label_name, primary: true },
        { field: "email", header: messages.label_email, sortable: false },
        { field: "role", header: messages.label_role, sortable: false },
        { field: "roleName", header: messages.label_rights, sortable: false },
        { field: "action", header: messages.title_actions },
      ],
      rowActions: [
        {
          id: "edit",
          label: messages.label_edit,
          type: "link",
          icon: "pen",
          iconPos: "left",
          variant: "secondary",
          fontSize: 16,
          iconSize: 15,
          isPrimary: true,
          onClick: onEdit,
          isHidden: permissions && permissions.users !== WRITE,
        },
        {
          id: "delete",
          label: messages.label_delete,
          type: "link",
          icon: "rubber",
          iconPos: "left",
          variant: "secondary",
          fontSize: 16,
          iconSize: 18,
          onClick: onDelete,
          isHidden: permissions && permissions.users !== WRITE,
        },
      ],
      filterType: "dialog",
      filters: [],
      selectionMode: "multiple",
    },
  ];
  return (
    <Container m={"0px !important"}>
      <DataTable
        config={config}
        reloadList={reloadList}
        customerId={customerId}
        screenName={USERS}
        userType={"customer"}
        handleRedirectToDetails={onSelectedRow}
      />
      {!!permissions && permissions.users === WRITE && (
        <PrimaryButtonIcon
          rounded
          semibold
          minWidth={199}
          my={30}
          width={[1, 1, 1, "auto"]}
          height={40}
          icon={<Icon name="send" mr={2} />}
          label={messages.label_invite_sub_user}
          onClick={onInvite}
        />
      )}
    </Container>
  );
};

Users.propTypes = {
  onInvite: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  customerId: PropTypes.string,
  reloadList: PropTypes.bool,
  onSelectedRow: PropTypes.func,
};
export default Users;
