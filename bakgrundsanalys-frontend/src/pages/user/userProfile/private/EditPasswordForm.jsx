import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import Div from "@components/Div";
import InputText from "@components/InputText";
import { PrimaryButtonIcon, PrimaryButtonOutlined } from "@components/Button";
import { INPUT } from "@utils/constant";
import PasswordSchema from "@pages/auth/schema/Password";
import ConfirmPasswordSchema from "@pages/auth/schema/ConfirmPassword";
import editUserInfo from "@app/services/users/editUserInfoService";
import { authActions } from "@app/reducers/authReducer";

const ResetPasswordSchema = PasswordSchema.concat(ConfirmPasswordSchema);

const EditPasswordForm = (prop) => {
  const dispatch = useDispatch();
  const { messages } = useIntl();
  const { CURRENT_PASSWORD, PASSWORD, CONFIRM_PASSWORD } = INPUT.NAME;
  const { onCancelClick, id, editType, onCloseModal, userInfo } = prop;
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(true);
  const handleSubmit = async (values) => {
    try {
      const {
        password,
        confirm_password,
        current_password: old_password,
      } = values;
      const response = await editUserInfo({
        old_password,
        password,
        confirm_password,
        id,
        type: editType,
      });
      const { data: user } = response.data || {};
      dispatch(authActions.storeUserInfo({ ...user, showConfirmDialog: true }));
      onCloseModal();
    } catch (e) {
      dispatch(
        authActions.storeUserInfo({
          ...userInfo,
          showConfirmDialog: true,
          isError: true,
        })
      );
      onCloseModal();
      throw new Error(e);
    }
  };

  const handleTogglePassword = (label) => () => () => {
    if (label === CONFIRM_PASSWORD) {
      setShowConfirmPassword(!showConfirmPassword);
    } else if (label === PASSWORD) {
      setShowPassword(!showPassword);
    } else {
      setShowCurrentPassword(!showCurrentPassword);
    }
  };

  return (
    <Div
      py={0}
      display="flex"
      alignItems="center"
      flexDirection="column"
      maxWidth="450px"
    >
      <Formik
        initialValues={{
          current_password: "",
          password: "",
          confirm_password: "",
        }}
        validationSchema={ResetPasswordSchema}
        onSubmit={handleSubmit}
      >
        {(formikProp) => {
          const { values, handleSubmit, isValid, touched } = formikProp;
          return (
            <Form>
              <InputText
                isPassword
                curved
                placeholder={messages.label_password}
                value={values.current_password}
                name={CURRENT_PASSWORD}
                formikProps={formikProp}
                label={`${messages.label_current_password} *`}
                labelAlignment="left"
                onTogglePassword={handleTogglePassword(CURRENT_PASSWORD)}
                showPassword={showCurrentPassword}
                minWidth={[323, 450]}
              />
              <InputText
                isPassword
                curved
                placeholder={messages.label_password}
                value={values.password}
                name={PASSWORD}
                formikProps={formikProp}
                label={`${messages.label_new_password} *`}
                labelAlignment="left"
                onTogglePassword={handleTogglePassword(PASSWORD)}
                showPassword={showPassword}
                minWidth={[323, 450]}
              />
              <InputText
                isPassword
                curved
                placeholder={messages.label_password}
                value={values.confirm_password}
                name={CONFIRM_PASSWORD}
                formikProps={formikProp}
                label={`${messages.label_repeat_new_password} *`}
                labelAlignment="left"
                onTogglePassword={handleTogglePassword(CONFIRM_PASSWORD)}
                showPassword={showConfirmPassword}
                minWidth={[323, 450]}
              />
              <Div
                mt={4}
                display="flex"
                flexDirection={["column-reverse", "row"]}
                justifyContent="center"
              >
                <PrimaryButtonOutlined
                  rounded
                  semibold
                  label={messages.label_cancel}
                  onClick={onCancelClick}
                  width={[1, "40%"]}
                  mr={[0, 4]}
                />
                <PrimaryButtonIcon
                  rounded
                  semibold
                  width={[1, "38%"]}
                  mb={[3, 0]}
                  onClick={handleSubmit}
                  disabled={!(isValid && Object.keys(touched).length > 0)}
                  label={messages.label_save}
                />
              </Div>
            </Form>
          );
        }}
      </Formik>
    </Div>
  );
};

export default EditPasswordForm;
