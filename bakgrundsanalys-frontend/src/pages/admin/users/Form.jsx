import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { Formik, Form as FormikForm } from "formik";
import InputText from "@components/InputText";
import Dropdown from "@components/Dropdown";
import { TextLargeSemiBoldWeight } from "@components/Text";
import Div from "@components/Div";
import { TextUpperCase } from "@components/Text";
import { PrimaryButton, PrimaryButtonOutlined } from "@components/Button";
import { INPUT } from "@utils/constant";
import EmailSchema from "@pages/auth/schema/Email";
import inviteUserService from "@app/services/users/inviteUserService";
import updateUserService from "@app/services/users/updateUserService";
import { authActions } from "@app/reducers/authReducer";

const userValues = ["assignments", "report-analysis", "customers"];

const Form = ({
  activeUser = false,
  inviteUser = false,
  subUser = false,
  roles = [],
  userData = {},
  edit = false,
  customerId = "",
  onCancel = () => {},
  userId = "",
  isMyProfile = false,
}) => {
  const { messages } = useIntl();
  const dispatch = useDispatch();

  const rights = [
    { label: messages.label_read, value: "read" },
    { label: messages.label_write_read, value: "write" },
  ];

  const { NAME, LAST_NAME, EMAIL, PHONE, ROLE } = INPUT.NAME;
  const { TEXT } = INPUT.TYPE;
  const [details, setDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    role: "",
    permissions: {
      "company-information": "",
      orders: "",
      assignments: "",
      "report-analysis": "",
      customers: "",
      credits: "",
      users: "",
    },
  });

  useEffect(() => {
    if (edit) {
      setDetails(userData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const pages = [
    { label: messages.title_customer_info, value: "customers" },
    { label: messages.label_company_info, value: "company-information" },
    { label: messages.title_orders, value: "orders" },
    { label: messages.title_assignments, value: "assignments" },
    {
      label: messages.title_report_analysis,
      value: "report-analysis",
    },
    { label: messages.title_users, value: "users" },
    { label: messages.title_credits, value: "credits" },
  ];

  const ValidationSchema = EmailSchema;

  const handlePermissions = (onChange, setFieldValue) => (e) => {
    const selectedRole = e.value;
    const filterRole = roles.filter((o) => o.value === selectedRole);
    const permissions = filterRole[0].permissions;
    setFieldValue("permissions", permissions);
    onChange(e);
  };

  const handleForm = async (data, values) => {
    const { setErrors } = values;
    if (subUser) {
      data.customerId = customerId || "";
    }
    try {
      if (edit) {
        const response = await updateUserService(
          data,
          subUser,
          userId,
          activeUser
        );
        if (isMyProfile && response) {
          const { data: { data: user = {} } = {} } = response || {};
          dispatch(authActions.storeUserInfo({ ...user }));
          onCancel("adminUser");
        }
      } else {
        await inviteUserService(data, subUser);
      }
      onCancel();
    } catch (e) {
      const {
        response: { data: { errors = {} } = {} },
      } = e;
      if (errors && errors.email) {
        setErrors({ email: messages.email_is_taken });
      } else {
        onCancel();
      }
      throw new Error(e);
    }
  };

  const handleOnchangePermission = (e, values, setValues) => {
    const { name, value } = e.target;
    values.permissions[name] = value;
    if (subUser) {
      values.role = "custom";
    } else {
      values.role = "admin-custom";
    }
    setValues(values);
  };

  return (
    <Div display="flex" flexDirection="column" width={1}>
      <Formik
        enableReinitialize
        initialValues={details}
        validationSchema={ValidationSchema}
        onSubmit={handleForm}
      >
        {(formik) => {
          const {
            values,
            handleSubmit,
            isValid,
            touched,
            handleChange,
            setFieldValue,
            handleBlur,
            setValues,
          } = formik;
          return (
            <FormikForm>
              {activeUser && (
                <>
                  <InputText
                    curved
                    placeholder={messages.label_name}
                    value={values && values.firstname}
                    name={NAME}
                    formikProps={formik}
                    type={TEXT}
                    label={`${messages.label_name} *`}
                    labelAlignment="left"
                    width={1}
                  />
                  <InputText
                    curved
                    placeholder={messages.label_last_name}
                    value={values && values.lastname}
                    name={LAST_NAME}
                    formikProps={formik}
                    type={TEXT}
                    label={`${messages.label_last_name} *`}
                    labelAlignment="left"
                    width={1}
                  />
                </>
              )}
              {(inviteUser || activeUser) && (
                <InputText
                  curved
                  placeholder={messages.label_email}
                  value={values && values.email}
                  name={EMAIL}
                  formikProps={formik}
                  type={TEXT}
                  label={activeUser ? `${messages.label_email} *` : ""}
                  labelAlignment="left"
                  width={1}
                />
              )}
              {activeUser && (
                <InputText
                  curved
                  placeholder={messages.placeholder_phone}
                  value={values && values.phone}
                  name={PHONE}
                  formikProps={formik}
                  label={messages.label_phone}
                  labelAlignment="left"
                  width={1}
                  maxLength={13}
                />
              )}
              <Div justifyContent="center" display="flex" my={3}>
                <TextLargeSemiBoldWeight>
                  {messages.label_role}:
                </TextLargeSemiBoldWeight>
              </Div>
              <Dropdown
                placeholder={messages.placeholder_choose}
                value={values && values.role}
                name={ROLE}
                onChange={handlePermissions(handleChange, setFieldValue)}
                label={`${messages.label_role}:`}
                options={roles}
                display="flex"
                mb={3}
                onBlur={handleBlur}
              />
              <Div
                justifyContent="center"
                display="flex"
                mt={30}
                mb={3}
                fontWeight="var(--semibold-weight)"
                color="var(--grey-dark)"
              >
                {messages.label_rights}
              </Div>
              {pages.map((page) => {
                const { label, value } = page;
                return (
                  <Div
                    key={value}
                    display="flex"
                    flexDirection={["column", "row"]}
                  >
                    {(subUser && userValues.includes(value)) ||
                    (!subUser && value === "company-information") ? (
                      ""
                    ) : (
                      <>
                        <Div width={[1, 1, 1, "30%"]} mb={[2, 0]}>
                          <TextUpperCase>{label}</TextUpperCase>
                        </Div>
                        <Dropdown
                          placeholder={messages.placeholder_choose}
                          value={
                            values &&
                            values.permissions &&
                            values.permissions[value]
                          }
                          name={value}
                          onChange={(e) =>
                            handleOnchangePermission(e, values, setValues)
                          }
                          label={label}
                          options={rights}
                          display="flex"
                          mb={3}
                          onBlur={handleBlur}
                          width={[1, 1, 1, "65%"]}
                        />
                      </>
                    )}
                  </Div>
                );
              })}
              <Div
                mt={[40, 40, 40, 30]}
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
                  height={40}
                  mr={[0, 0, 0, 30]}
                  type="reset"
                  width={[1, 1, 1, "auto"]}
                  minWidth={170}
                  fontWeight={"var(--semibold-weight)"}
                  fontSize={"var(--fs-h5)"}
                  onClick={onCancel}
                  label={messages.label_cancel}
                />
                <PrimaryButton
                  mb={[20, 20, 20, 0]}
                  width={[1, 1, 1, "auto"]}
                  height={40}
                  minWidth={170}
                  onClick={handleSubmit}
                  disabled={!(isValid && Object.keys(touched).length > 0)}
                  label={messages.label_save}
                />
              </Div>
            </FormikForm>
          );
        }}
      </Formik>
    </Div>
  );
};

Form.propTypes = {
  activeUser: PropTypes.bool,
  inviteUser: PropTypes.bool,
  subUser: PropTypes.bool,
  roles: PropTypes.array,
  values: PropTypes.object,
  userData: PropTypes.object,
  edit: PropTypes.bool,
  customerId: PropTypes.string,
  onCancel: PropTypes.func,
  userId: PropTypes.func,
  isMyProfile: PropTypes.bool,
};
export default Form;
