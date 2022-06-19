import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import Div from "@components/Div";
import { InvertedIcon } from "@components/Icon";
import {
  PrimaryButtonIcon,
  PrimaryButtonIconOutlined,
} from "@components/Button";
import InputText from "@components/InputText";
import { INPUT, WRITE, INDIVIDUAL, DELETED } from "@utils/constant";
import NameSchema from "@pages/auth/schema/Name";
import NumbersSchema from "@pages/auth/schema/Numbers";
import EmailSchema from "@pages/auth/schema/Email";
import { H2 } from "@components/Heading";
import editCustomerInfoService from "@app/services/users/editCustomerInfoService";
import ConfirmationDialog from "@pages/shared/ConfirmationDialog";
import { authActions } from "@app/reducers/authReducer";
import { addHyphenToNumber } from "@utils/utils";

const CompanyInfo = ({
  onCustomerDelete = () => {},
  customerData = {},
  id = "0",
  status = "Active",
}) => {
  const { messages } = useIntl();
  const {
    PHONE,
    COMPANY_NAME,
    COMPANY_NUMBER,
    COMPANY_VAT,
    COMPANY_ADDRESS,
    NAME,
    LAST_NAME,
    EMAIL,
  } = INPUT.NAME;
  const { TEXT } = INPUT.TYPE;

  const isIndividualCustomer = customerData.type === INDIVIDUAL;

  const IndividualInfoSchema = NameSchema.pick([NAME, LAST_NAME]).concat(
    EmailSchema
  );
  const CompanyInfoSchema = isIndividualCustomer
    ? IndividualInfoSchema
    : IndividualInfoSchema.concat(
        NameSchema.pick([COMPANY_NAME]).concat(
          NumbersSchema.pick([COMPANY_VAT, COMPANY_NUMBER])
        )
      );

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({});
  const [isError, setIsError] = useState(false);
  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const isDeletedCustomer = status === DELETED;

  const dispatch = useDispatch();

  const { permissions = {} } = userInfo;

  const {
    company_name,
    address,
    tax_nr,
    registration_nr,
    phone,
    firstname,
    lastname,
    email,
  } = customerData || {};

  useEffect(() => {
    setCompanyDetails({
      company_name,
      company_address: address,
      tax_nr,
      registration_nr: addHyphenToNumber(registration_nr, "6"),
      phone: phone,
      firstname,
      lastname,
      email,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (values) => {
    const { registration_nr, tax_nr, company_address } = values;
    const registrationNumber =
      registration_nr && registration_nr.replace(/-/g, "");
    const vatNumber = tax_nr && tax_nr.replace(/-/g, "");
    const newCompanyInfo = { ...companyDetails, ...values };
    try {
      await editCustomerInfoService({
        ...newCompanyInfo,
        registration_nr: registrationNumber,
        tax_nr: vatNumber,
        address: company_address,
        id,
      });

      dispatch(
        authActions.storeUserInfo({
          ...userInfo,
          showConfirmDialog: true,
        })
      );
      setShowConfirmDialog(true);
    } catch (e) {
      setIsError(true);
      dispatch(
        authActions.storeUserInfo({
          ...userInfo,
          showConfirmDialog: true,
          isError: true,
        })
      );
      setShowConfirmDialog(true);
    }
  };

  return (
    <>
      {showConfirmDialog && (
        <ConfirmationDialog
          isError={isError}
          byline={
            isError ? messages.invalid_data : messages.text_update_sucessful
          }
        />
      )}
      <Formik
        enableReinitialize
        initialValues={companyDetails}
        validationSchema={CompanyInfoSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          const { values, handleSubmit, isValid, touched } = formik;
          return (
            <Form>
              <Div
                display="flex"
                flexDirection="column"
                width={[1, 1, 1, 540]}
                pb={1}
              >
                {!isIndividualCustomer && (
                  <>
                    <H2 mt={30}>{messages.label_company_info}</H2>
                    <InputText
                      curved
                      placeholder={messages.label_company_name}
                      value={values.company_name}
                      name={COMPANY_NAME}
                      formikProps={formik}
                      type={TEXT}
                      label={`${messages.label_company_name} *`}
                      labelAlignment="left"
                      disabled={isDeletedCustomer}
                    />
                    <InputText
                      curved
                      placeholder={messages.label_company_number}
                      value={values.registration_nr}
                      name={COMPANY_NUMBER}
                      formikProps={formik}
                      label={`${messages.label_company_number} *`}
                      labelAlignment="left"
                      maxLength={11}
                      disabled={isDeletedCustomer}
                    />
                    <InputText
                      curved
                      placeholder={messages.label_company_vat}
                      value={values.tax_nr}
                      name={COMPANY_VAT}
                      formikProps={formik}
                      label={`${messages.label_company_vat} *`}
                      labelAlignment="left"
                      maxLength={14}
                      disabled={isDeletedCustomer}
                    />
                    <InputText
                      curved
                      placeholder={messages.label_company_address}
                      value={values.company_address}
                      name={COMPANY_ADDRESS}
                      type={TEXT}
                      formikProps={formik}
                      label={messages.label_company_address}
                      labelAlignment="left"
                      disabled={isDeletedCustomer}
                    />
                    <InputText
                      curved
                      placeholder={messages.placeholder_phone}
                      value={values.phone}
                      name={PHONE}
                      formikProps={formik}
                      label={messages.label_company_phone}
                      labelAlignment="left"
                      maxLength={13}
                      disabled={isDeletedCustomer}
                    />
                  </>
                )}
                <H2 mt={30}>{messages.title_contact_details}</H2>
                <InputText
                  curved
                  placeholder={messages.label_name}
                  value={values.firstname}
                  name={NAME}
                  formikProps={formik}
                  type={TEXT}
                  label={`${messages.label_name} *`}
                  labelAlignment="left"
                  width={1}
                  disabled={isDeletedCustomer}
                />
                <InputText
                  curved
                  placeholder={messages.label_last_name}
                  value={values.lastname}
                  name={LAST_NAME}
                  formikProps={formik}
                  type={TEXT}
                  label={`${messages.label_last_name} *`}
                  labelAlignment="left"
                  width={1}
                  disabled={isDeletedCustomer}
                />
                <InputText
                  curved
                  placeholder={messages.label_email}
                  value={values.email}
                  name={EMAIL}
                  formikProps={formik}
                  type={TEXT}
                  label={`${messages.label_email} *`}
                  labelAlignment="left"
                  width={1}
                  disabled={isDeletedCustomer}
                />

                <Div
                  mt={[40, 50]}
                  display="flex"
                  flexDirection={["column", "column", "column", "row"]}
                >
                  {!isDeletedCustomer && (
                    <>
                      <PrimaryButtonIcon
                        rounded
                        semibold
                        mr={[0, 0, 0, 30]}
                        mb={[24, 24, 24, 0]}
                        width={[1, 1, 1, "auto"]}
                        height={40}
                        minWidth={186}
                        icon={
                          <InvertedIcon
                            rounded={true}
                            name="tickmark"
                            p={"2px"}
                            mr={1}
                          />
                        }
                        onClick={handleSubmit}
                        disabled={
                          !(isValid && Object.keys(touched).length > 0) ||
                          (permissions && permissions.customers !== WRITE)
                        }
                        label={messages.label_save_changes}
                      />
                      <PrimaryButtonIconOutlined
                        rounded
                        semibold
                        py={2}
                        disabled={
                          permissions && permissions.customers !== WRITE
                        }
                        px={4}
                        height={40}
                        type="button"
                        width={[1, 1, 1, "auto"]}
                        minWidth={206}
                        fontWeight={"var(--semibold-weight)"}
                        fontSize={"var(--fs-h5)"}
                        onClick={onCustomerDelete}
                        label={messages.label_delete_customer}
                      />
                    </>
                  )}
                </Div>
              </Div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
CompanyInfo.propTypes = {
  onCustomerDelete: PropTypes.func,
  customerData: PropTypes.node,
  id: PropTypes.string,
  status: PropTypes.string,
};
export default CompanyInfo;
