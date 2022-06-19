import React from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import Div from "@components/Div";
import InputText from "@components/InputText";
import { PrimaryButtonIcon, PrimaryButtonOutlined } from "@components/Button";
import { INPUT } from "@utils/constant";
import NumberSchema from "@pages/auth/schema/PersonalNumber";
import editUserInfo from "@app/services/users/editUserInfoService";
import { authActions } from "@app/reducers/authReducer";

const EditPersonalNumber = (prop) => {
  const dispatch = useDispatch();
  const { messages } = useIntl();
  const { PERSONAL_NUMBER } = INPUT.NAME;
  const { onCancelClick, id, editType, onCloseModal, userInfo } = prop;
  const EditPersonalNumberSchema = NumberSchema.pick([PERSONAL_NUMBER]);
  const { personal_number = "" } = userInfo;

  const handleSubmit = async (values) => {
    try {
      const { personal_number: personalNumber } = values;
      const actualPersonalNumber = personalNumber.replace(/-/g, "");
      const response = await editUserInfo({
        personal_number: actualPersonalNumber,
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
    <Formik
      initialValues={{
        personal_number: personal_number,
      }}
      validationSchema={EditPersonalNumberSchema}
      onSubmit={handleSubmit}
    >
      {(formikProp) => {
        const { values, handleSubmit, handleBlur, isValid, touched } =
          formikProp;
        return (
          <Form>
            <Div
              display="flex"
              justifyContent="center"
              flexDirection="column"
              minWidth={["auto", 400]}
            >
              <InputText
                curved
                placeholder={messages.label_number}
                value={values.personal_number}
                name={PERSONAL_NUMBER}
                formikProps={formikProp}
                label={messages.label_personal_number}
                labelAlignment="left"
                maxLength={13}
                onBlur={handleBlur}
              />
              <Div
                px={[0, 3]}
                pt={4}
                display="flex"
                justifyContent="space-between"
                flexDirection={["column-reverse", "row"]}
              >
                <PrimaryButtonOutlined
                  rounded
                  semibold
                  label={messages.label_cancel}
                  onClick={onCancelClick}
                  width={[1, "47%"]}
                />
                <PrimaryButtonIcon
                  rounded
                  semibold
                  onClick={handleSubmit}
                  disabled={!(isValid && Object.keys(touched).length > 0)}
                  label={messages.label_save}
                  width={[1, "47%"]}
                  mb={[3, 0]}
                />
              </Div>
            </Div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditPersonalNumber;
