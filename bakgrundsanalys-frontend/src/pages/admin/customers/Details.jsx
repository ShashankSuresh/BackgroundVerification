import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Div from "@components/Div";
import Span from "@components/Span";
import Icon from "@components/Icon";
import Dialog from "@components/Dialog";
import Breadcrumb from "@components/Breadcrumb";
import { H2, H5 } from "@components/Heading";
import { default as Tabs } from "@components/Tabs";
import { LinkArrow } from "@components/Link";
import CompanyInfo from "./tabs/CompanyInfo";
import Users from "./tabs/Users";
import Orders from "./tabs/Orders";
import Credits from "./tabs/Credits";
import { ROUTES, READ, WRITE } from "@utils/constant";
import { PrimaryButton, PrimaryButtonOutlined } from "@components/Button";
import CreateUser from "@pages/admin/users/Create";
import UpdateUser from "@pages/admin/users/Update";
import DeleteUser from "@pages/admin/users/Delete";
import { splitString, formatDateAndTime } from "@utils/utils";
import customerDetails from "@app/services/customers/customerDetailsService";
import getAvailableRoles from "@app/services/users/getRolesService";
import {
  deleteCustomerProfile,
  deleteUserProfile,
} from "@app/services/users/deleteUserProfileService";

const StyledTabs = styled(Tabs)`
  .p-tabview-nav {
    justify-content: start;
  }
  .p-tabview-nav li {
    min-width: 10%;
  }
`;

const Details = () => {
  const { messages } = useIntl();
  const history = useHistory();

  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const { permissions = {} } = userInfo;

  const query = new URLSearchParams(location.search);
  const id = splitString(query.get("id") || "") || "0";
  const status = splitString(query.get("status") || "") || "Active";
  const [roles, setRoles] = useState([]);
  const [reloadList, setReloadList] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  const [customerData, setCustomerData] = useState({});
  const [openDialog, setOpenDialogue] = useState(false);
  const [showDialog, setShowDialogue] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const breadCrumbItems = [
    {
      label: messages.label_back_to_customers,
      url: ROUTES.ADMIN_CUSTOMERS.URL,
    },
  ];
  const breadCrumbProps = {
    icon: "icon-headerarrowright",
    url: ROUTES.ADMIN_CUSTOMERS.URL,
  };

  const loadDetailedData = async () => {
    setIsFetching(true);

    const customerDetailsResponse = await customerDetails(id[0]);
    const { data } = customerDetailsResponse.data;
    setCustomerData({
      ...data,
      createdAt: data.created_at ? formatDateAndTime(data.created_at) : "",
    });
    setIsFetching(false);
  };

  useEffect(() => {
    getRoles();
    loadDetailedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddUser = () => {
    if (showDialog) {
      setReloadList(!reloadList);
    }
    setShowDialogue(!showDialog);
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

  const handleCloseDialog = () => {
    setOpenDialogue(!openDialog);
  };

  const handleDeleteDialog = async () => {
    try {
      const { id: customerId } = customerData;
      await deleteCustomerProfile({
        customerId,
      });
      history.push(ROUTES.ADMIN_CUSTOMERS.URL);
    } catch (e) {
      throw new Error(e);
    }
  };

  const handleSelectedRow = (e) => {
    const { data } = e;
    setSelectedData(data);
  };

  const tabContent = [
    {
      title: messages.label_details,
      content: (
        <>
          {!!Object.keys(customerData).length && (
            <CompanyInfo
              customerData={customerData}
              onCustomerDelete={handleCloseDialog}
              id={id[0]}
              status={status[0]}
            />
          )}
        </>
      ),
    },
    {
      title: messages.title_users,
      content: (
        <Users
          onInvite={handleAddUser}
          onEdit={handleEditUserModal}
          onDelete={handleDeleteModal}
          customerId={id[0] || ""}
          onSelectedRow={handleSelectedRow}
          reloadList={reloadList}
        />
      ),
    },
    {
      title: messages.title_orders,
      content: <Orders customerId={id} />,
    },
  ];
  const creditsTabContent = [
    {
      title: messages.title_credits,
      content: (
        <Credits
          customerId={id}
          permissions={permissions}
          customerData={customerData}
        />
      ),
    },
  ];
  const modifiedTabContent =
    permissions &&
    (permissions.credits === WRITE || permissions.credits === READ)
      ? [...tabContent, ...creditsTabContent]
      : [...tabContent];
  const dialogHeader = () => (
    <Div textAlign="center" width={1}>
      <Span upper semibold fontSize="var(--fs-h4) !important">
        {messages.label_delete_customer}
      </Span>
    </Div>
  );

  const labelsofRights = {
    superadmin: messages.role_super_admin,
    owner: messages.label_owner,
    user: messages.label_user,
    custom: messages.role_custom,
  };

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
  return (
    <>
      {isFetching ? (
        <h1>{messages.text_loading}...</h1>
      ) : (
        <Div px={2} py={3}>
          <Breadcrumb
            items={breadCrumbItems}
            home={breadCrumbProps}
            p={0}
            pb={[1, 1, 1, 10]}
          />
          <H2
            variant="secondary"
            lineHeight={"48px"}
            fontWeight="var(--semibold-weight)"
          >
            {customerData.name || "Customer"}
          </H2>
          <H5
            fontWeight="var(--light-weight) !important"
            mt={[10, 10, 10, 15]}
            mb={30}
          >
            {`${messages.label_customer_created} ${customerData.createdAt}`}
          </H5>
          <StyledTabs content={modifiedTabContent} />
          {openDialog && (
            <Dialog
              header={dialogHeader}
              visible="displayBasic"
              draggable={false}
              onHide={handleCloseDialog}
              width={["90%", "90%", "90%", 445]}
            >
              <>
                <Div
                  alignItems="center"
                  lineHeight="130%"
                  display="flex"
                  flexDirection="column"
                  mt={30}
                >
                  <Span medium light>
                    {messages.customer_delete_message}
                  </Span>
                  <Span medium light>
                    {messages.customer_delete_description}
                  </Span>
                  <Div mt={20}>
                    <LinkArrow mr={2} info semibold>
                      {messages.label_more_about_gdpr}
                      <Icon
                        name="headerarrowright"
                        color={"var(--turquoise)"}
                      />
                    </LinkArrow>
                  </Div>
                </Div>
                <Div
                  mt={27}
                  display="flex"
                  justifyContent="center"
                  flexDirection={[
                    "column-reverse",
                    "column-reverse",
                    "column-reverse",
                    "row",
                  ]}
                >
                  <PrimaryButtonOutlined
                    rounded
                    semibold
                    label={messages.label_cancel}
                    onClick={handleCloseDialog}
                    mr={[0, 0, 0, 30]}
                    width={[1, 1, 1, "45%"]}
                  />
                  <PrimaryButton
                    rounded
                    semibold
                    label={messages.label_delete}
                    onClick={handleDeleteDialog}
                    mb={[4, 4, 4, 0]}
                    width={[1, 1, 1, "45%"]}
                  />
                </Div>
              </>
            </Dialog>
          )}
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
                customerId={id[0] || ""}
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
                customerId={id[0] || ""}
              />
            </Dialog>
          )}
          {showDeleteModal && (
            <DeleteUser
              onDelete={handleDeleteUser}
              onCancel={handleDeleteModal}
              subUser
            >
              <Div
                variant="primary"
                justifyContent="center"
                display="flex"
                fontWeight="var(--medium-weight)"
              >
                Are you sure you want to delete this sub-user?
              </Div>
            </DeleteUser>
          )}
        </Div>
      )}
    </>
  );
};
export default Details;
