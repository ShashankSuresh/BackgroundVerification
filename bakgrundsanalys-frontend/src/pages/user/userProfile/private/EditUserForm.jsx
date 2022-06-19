import React from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import Div from "@components/Div";
import InputText from "@components/InputText";
import { PrimaryButtonIcon, PrimaryButtonOutlined } from "@components/Button";
import { INPUT } from "@utils/constant";
import EmailSchema from "@pages/auth/schema/Email";
import NameSchema from "@pages/auth/schema/Name";
import NumbersSchema from "@pages/auth/schema/Numbers";
import editUserInfo from "@app/services/users/editUserInfoService";
import { authActions } from "@app/reducers/authReducer";
const RegistrationSchema = EmailSchema.concat(NameSchema).concat(NumbersSchema);

const EditUserForm = (prop) => {
  const dispatch = useDispatch();
  const { messages } = useIntl();
  const { EMAIL, NAME, LAST_NAME, PHONE } = INPUT.NAME;
  const { TEXT } = INPUT.TYPE;
  const { onCancelClick, id, editType, onCloseModal, userInfo } = prop;
  const { firstname = "", lastname = "", email = "", phone = "" } = userInfo;
  const EditUserSchema = RegistrationSchema.pick([
    EMAIL,
    NAME,
    LAST_NAME,
    PHONE,
  ]);

  const handleSubmit = async (values) => {
    try {
      const { firstname, lastname, email, phone } = values;
      const response = await editUserInfo({
        firstname,
        lastname,
        email,
        phone,
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

  return (
    <Div py={0} display="flex" alignItems="center" flexDirection="column">
      <Formik
        initialValues={{
          firstname: firstname,
          lastname: lastname,
          email: email,
          phone: phone,
        }}
        validationSchema={EditUserSchema}
        onSubmit={handleSubmit}
      >
        {(formikProp) => {
          const { values, handleSubmit, isValid, touched } = formikProp;
          return (
            <Form>
              <InputText
                curved
                placeholder={messages.label_name}
                value={values.firstname}
                name={NAME}
                type={TEXT}
                formikProps={formikProp}
                label={`${messages.label_name} *`}
                labelAlignment="left"
                minWidth={[323, 450]}
              />
              <InputText
                curved
                placeholder={messages.label_last_name}
                value={values.lastname}
                name={LAST_NAME}
                type={TEXT}
                formikProps={formikProp}
                label={`${messages.label_last_name} *`}
                labelAlignment="left"
                minWidth={[323, 450]}
              />
              <InputText
                curved
                placeholder={messages.label_email}
                value={values.email}
                name={EMAIL}
                formikProps={formikProp}
                label={`${messages.label_email} *`}
                labelAlignment="left"
                minWidth={[323, 450]}
              />
              <InputText
                curved
                placeholder={"+46 ..."}
                value={values.phone}
                name={PHONE}
                formikProps={formikProp}
                label={`${messages.label_phone} *`}
                labelAlignment="left"
                maxLength={13}
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
                  onClick={handleSubmit}
                  width={[1, "38%"]}
                  disabled={!(isValid && Object.keys(touched).length > 0)}
                  label={messages.label_save}
                  mb={[3, 0]}
                />
              </Div>
            </Form>
          );
        }}
      </Formik>
    </Div>
  );
};

export default EditUserForm;
