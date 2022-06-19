import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import UpdateInfo from "@pages/admin/users/Update";
import getAvailableRoles from "@app/services/users/getRolesService";

const EditInfo = ({ onCloseModal = () => {}, userInfo = {} }) => {
  const { permissionsCopy = [] } = userInfo;
  const { messages } = useIntl();
  const [roles, setRoles] = useState([]);

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

  return (
    <UpdateInfo
      onCancel={onCloseModal}
      roles={roles}
      userData={{ ...userInfo, permissions: permissionsCopy }}
      isMyProfile
    />
  );
};

EditInfo.propTypes = {
  onCloseModal: PropTypes.func,
  userInfo: PropTypes.object,
};
export default EditInfo;
