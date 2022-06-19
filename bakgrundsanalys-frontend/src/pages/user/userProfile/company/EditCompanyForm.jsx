import React from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import Div from "@components/Div";
import InputText from "@components/InputText";
import { PrimaryButtonIcon, PrimaryButtonOutlined } from "@components/Button";
import Container from "@components/Container";
import { INPUT } from "@utils/constant";
import NameSchema from "@pages/auth/schema/Name";
import NumbersSchema from "@pages/auth/schema/Numbers";
import editCustomerInfoService from "@app/services/users/editCustomerInfoService";
import { authActions } from "@app/reducers/authReducer";

const CompanyInfoSchema = NameSchema.concat(NumbersSchema);

export const EditCompanyForm = (prop) => {
  const dispatch = useDispatch();
  const { messages } = useIntl();
  const { COMPANY_ADDRESS, PHONE } = INPUT.NAME;
  const { TEXT } = INPUT.TYPE;
  const { onHideModal, id, userInfo } = prop;
  const {
    customer: { address = "", phone = "" },
  } = userInfo;

  const handleCompanyInfoSubmit = async (values) => {
    try {
      const { company_address, phone } = values;
      const response = await editCustomerInfoService({
        address: company_address,
        phone,
        id,
      });
      const { data: customer } = response || {};
      dispatch(
        authActions.storeUserInfo({
          ...userInfo,
          customer: customer.data,
          showConfirmDialog: true,
        })
      );
      onHideModal();
    } catch (e) {
      onHideModal();
      throw new Error(e);
    }
  };

  const EditCompanyInfoSchema = CompanyInfoSchema.pick([
    COMPANY_ADDRESS,
    PHONE,
  ]);

  return (
    <Container>
      <Formik
        initialValues={{ company_address: address, phone: phone }}
        validationSchema={EditCompanyInfoSchema}
        onSubmit={handleCompanyInfoSubmit}
      >
        {(prop) => {
          const { values, handleSubmit, isValid, touched } = prop;
          return (
            <Div display="flex" justifyContent="center" alignItems="center">
              <Form>
                <Div
                  display="flex"
                  flexDirection="column"
                  mb={4}
                  width={["auto", "auto", "auto", "400px"]}
                  minWidth={320}
                >
                  <InputText
                    curved
                    placeholder={`${messages.label_address}...`}
                    value={values.company_address}
                    name={COMPANY_ADDRESS}
                    type={TEXT}
                    formikProps={prop}
                    label={`${messages.label_company} ${messages.label_address}`}
                    labelAlignment="left"
                  />
                  <InputText
                    curved
                    placeholder={"+46 123 456 78 90"}
                    value={values.phone}
                    name={PHONE}
                    formikProps={prop}
                    label={`${messages.label_company} ${messages.label_phone}`}
                    labelAlignment="left"
                    maxLength={13}
                  />
                </Div>
                <Div
                  display="flex"
                  width={1}
                  flexDirection={["column", "column", "column", "row-reverse"]}
                  justifyContent="center"
                >
                  <PrimaryButtonIcon
                    rounded
                    semibold
                    onClick={handleSubmit}
                    disabled={!(isValid && Object.keys(touched).length > 0)}
                    label={messages.label_save}
                    width={[1, 1, 1, 150]}
                    mb={[4, 4, 4, 0]}
                  />
                  <PrimaryButtonOutlined
                    rounded
                    semibold
                    label={messages.label_cancel}
                    onClick={onHideModal}
                    width={[1, 1, 1, 150]}
                    mr={[0, 0, 0, 4]}
                  />
                </Div>
              </Form>
            </Div>
          );
        }}
      </Formik>
    </Container>
  );
};
