import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import DataTable from "@components/Table/Table";
import { PrimaryButtonIcon } from "@components/Button";
import Icon from "@components/Icon";
import { Text } from "@components/Text";
import Div from "@components/Div";
import Dialog from "@components/Dialog";
import Container from "@components/Container";
import CreateUser from "@pages/admin/users/Create";
import UpdateUser from "@pages/admin/users/Update";
import DeleteUser from "@pages/admin/users/Delete";
import getAvailableRoles from "@app/services/users/getRolesService";
import { deleteUserProfile } from "@app/services/users/deleteUserProfileService";
import { USERS, WRITE } from "@utils/constant";

const SubUsers = () => {
  const { messages } = useIntl();
  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const { customer: { id: customerId = "" } = {}, permissions = {} } =
    userInfo || {};
  const [showDialog, setShowDialogue] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [roles, setRoles] = useState([]);
  const [reloadList, setReloadList] = useState(false);
  const [selectedData, setSelectedData] = useState("");

  const handleAddUser = () => {
    if (showDialog) {
      setReloadList(!reloadList);
    }
    setShowDialogue(!showDialog);
  };

  const handleSelectedRow = (e) => {
    const { data } = e;
    setSelectedData(data);
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDeleteUser = async () => {
    const { id: customerId = "" } = selectedData;
    try {
      await deleteUserProfile({ id: customerId });
      if (showDeleteModal) {
        setReloadList(!reloadList);
      }
      handleDeleteModal();
    } catch (e) {
      throw new Error(e);
    }
  };

  const handleEditUserModal = () => {
    if (showEditUserModal) {
      setReloadList(!reloadList);
    }
    setShowEditUserModal(!showEditUserModal);
  };

  const labelsofRights = {
    superadmin: messages.role_super_admin,
    owner: messages.label_owner,
    user: messages.label_user,
    custom: messages.role_custom,
  };

  useEffect(() => {
    getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRoles = async () => {
    try {
      const res = await getAvailableRoles("customer");
      const availableRoles = res.map((o) => ({
        ...o,
        label: labelsofRights[o.value],
      }));
      setRoles(availableRoles);
    } catch (e) {
      throw new Error(e);
    }
  };

  let config = [
    {
      title: messages.sub_users,
      emptyMessage: "No users found",
      headerActions: [],
      columns: [
        {
          field: "name",
          header: messages.label_name,
          primary: true,
          sortable: false,
        },
        { field: "email", header: messages.label_email, sortable: false },
        { field: "role", header: messages.label_role, sortable: false },
        { field: "action", header: messages.title_actions, sortable: false },
      ],
      rowActions: [
        {
          id: "edit",
          label: messages.label_edit,
          type: "link",
          icon: "pen",
          iconPos: "left",
          variant: "secondary",
          isPrimary: true,
          isHidden: permissions && permissions.users !== WRITE,
          onClick: handleEditUserModal,
        },
        {
          id: "delete",
          label: messages.label_delete,
          type: "link",
          icon: "rubber",
          iconPos: "left",
          variant: "secondary",
          isHidden: permissions && permissions.users !== WRITE,
          onClick: handleDeleteModal,
        },
      ],
      filterType: "dialog",
      filters: [],
      selectionMode: "multiple",
    },
  ];
  return (
    <>
      <Container m={"0px !important"}>
        <DataTable
          config={config}
          screenName={USERS}
          customerId={customerId}
          userType={"customer"}
          reloadList={reloadList}
          handleRedirectToDetails={handleSelectedRow}
        />
        <PrimaryButtonIcon
          minWidth={188}
          my={20}
          width={[1, 1, 1, "auto"]}
          height={40}
          icon={<Icon name="send" mr={2} />}
          label={messages.label_invite_sub_user}
          onClick={handleAddUser}
        />
      </Container>
      {showDialog && (
        <Dialog
          visible="displayBasic"
          draggable={false}
          width={[1, 1, 1, 530]}
          m={[3, 3, 3, "auto"]}
          onHide={handleAddUser}
        >
          <CreateUser
            onCancel={handleAddUser}
            subUser
            roles={roles}
            customerId={customerId}
          />
        </Dialog>
      )}
      {showEditUserModal && (
        <Dialog
          visible="displayBasic"
          draggable={false}
          width={[1, 1, 1, 530]}
          m={[3, 3, 3, "auto"]}
          onHide={handleEditUserModal}
        >
          <UpdateUser
            roles={roles}
            userData={selectedData}
            onCancel={handleEditUserModal}
            subUser
            customerId={customerId}
          />
        </Dialog>
      )}
      {showDeleteModal && (
        <DeleteUser
          onDelete={handleDeleteUser}
          onCancel={handleDeleteModal}
          subUser
        >
          <Div justifyContent="center" textAlign="center" display="flex">
            <Text>
              {messages.label_delete_user_confirmation_first}{" "}
              {selectedData.name}{" "}
              {messages.label_delete_user_confirmation_second}
            </Text>
          </Div>
        </DeleteUser>
      )}
    </>
  );
};
export default SubUsers;
