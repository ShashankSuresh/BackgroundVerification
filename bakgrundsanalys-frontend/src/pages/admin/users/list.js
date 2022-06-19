import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import Container from "@components/Container";
import DataTable from "@components/Table/Table";
import Dialog from "@components/Dialog";
import { Text } from "@components/Text";
import ScrollToTop from "@utils/ScrollToTop";
import CreateUser from "./Create";
import UpdateUser from "./Update";
import DeleteUser from "./Delete";
import { USERS, ADMIN, WRITE } from "@utils/constant";
import deleteUserProfile from "@app/services/users/deleteUserProfileService";
import getAvailableRoles from "@app/services/users/getRolesService";

const List = () => {
  const { messages } = useIntl();
  const [showDialog, setShowDialogue] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedData, setSelectedData] = useState("");
  const [reloadList, setReloadList] = useState(false);

  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const { permissions = {} } = userInfo;

  const handleAddUser = () => {
    if (showDialog) {
      setReloadList(!reloadList);
    }
    setShowDialogue(!showDialog);
  };

  const handleDeleteModal = () => {
    if (showDeleteModal) {
      setReloadList(!reloadList);
    }
    setShowDeleteModal(!showDeleteModal);
  };

  const handleSelectedRow = (e) => {
    const { data } = e;
    setSelectedData(data);
  };

  const handleDeleteUser = async () => {
    const { id = "" } = selectedData;
    try {
      await deleteUserProfile({ id: id });
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
    "admin-superadmin": messages.role_super_admin,
    admin: messages.role_admin,
    "security-analyst": messages.role_security_Analyst,
    "cv-verification": messages.role_cv_verification,
    "admin-custom": messages.role_custom,
  };

  const getRoles = async () => {
    try {
      const res = await getAvailableRoles("admin");
      const availableRoles = res.map((o) => ({
        ...o,
        label: labelsofRights[o.value],
      }));
      setRoles(availableRoles);
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let config = [
    {
      title: messages.title_users,
      headerActions: [
        {
          id: "new-order",
          type: "button",
          label: messages.label_new_user,
          width: [1, "auto"],
          icon: "plus",
          variant: "header",
          height: 0,
          px: 4,
          py: 20,
          onClick: handleAddUser,
          isHidden: permissions && permissions.users !== WRITE,
        },
        {
          id: "download",
          type: "button-raised",
          label: messages.label_scv,
          icon: "headerarrowright",
          variant: "header",
          height: 0,
          px: 3,
          py: 20,
        },
      ],
      filterType: "dialog",
      filters: [
        {
          title: messages.label_role,
          id: "role",
          type: "checkbox",
          options: [
            {
              label: messages.role_super_admin,
              value: "super-admin",
              checked: false,
            },
            {
              label: messages.role_admin,
              value: "admin",
              checked: false,
            },
            {
              label: messages.role_security_Analyst,
              value: "security-analyst",
              checked: false,
            },
            {
              label: messages.role_cv_verification,
              value: "cv-verification",
              checked: false,
            },
            {
              label: messages.role_custom,
              value: "custom",
              checked: false,
            },
          ],
        },
      ],
      columns: [
        { field: "user", header: messages.label_user, primary: true },
        { field: "email", header: messages.label_email, sortable: false },
        { field: "role", header: messages.label_role, sortable: false },
        { field: "phone", header: messages.label_phone, sortable: false },
        { field: "action", header: messages.title_actions },
      ],
      rowActions: [
        {
          id: "more",
          label: messages.label_edit,
          type: "link",
          variant: "secondary",
          icon: "pen",
          iconPos: "left",
          isPrimary: true,
          onClick: handleEditUserModal,
          isHidden: permissions && permissions.users !== WRITE,
        },
        {
          id: "more",
          label: messages.label_delete,
          type: "link",
          icon: "rubber",
          iconPos: "left",
          variant: "secondary",
          onClick: handleDeleteModal,
          isHidden: permissions && permissions.users !== WRITE,
        },
      ],
      pagination: true,
      sortable: true,
      selectionMode: "multiple",
    },
  ];

  return (
    <ScrollToTop>
      <Container m={"0px !important"}>
        <DataTable
          config={config}
          screenName={USERS}
          userType={ADMIN}
          handleRedirectToDetails={handleSelectedRow}
          reloadList={reloadList}
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
          <CreateUser onCancel={handleAddUser} roles={roles} />
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
            onCancel={handleEditUserModal}
            roles={roles}
            userData={selectedData}
          />
        </Dialog>
      )}
      {showDeleteModal && (
        <DeleteUser onDelete={handleDeleteUser} onCancel={handleDeleteModal}>
          <Text justifyContent="center" display="flex">
            {messages.label_delete_user_confirmation_first}
            {messages.label_delete_user_confirmation_second}
          </Text>
        </DeleteUser>
      )}
    </ScrollToTop>
  );
};

export default List;
