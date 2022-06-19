import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Formik, Form } from "formik";
import Section from "@components/Section";
import Container from "@components/Container";
import Div from "@components/Div";
import Card from "@components/Card";
import Logo from "@components/Logo";
import QrCode from "@assets/privatenumber_qr.png";
import BankId from "@assets/bank_id.png";
import InputText from "@components/InputText";
import { InvertedIcon } from "@components/Icon";
import {
  PrimaryButtonIcon,
  PrimaryButtonIconOutlined,
} from "@components/Button";
import { TextUpperCase } from "@components/Text";
import Link from "@components/Link";
import styled from "styled-components";
import { INPUT } from "@utils/constant";
import NewOrExistingAccount from "@pages/auth/shared/NewOrExistingAccount";
import { H1 } from "@components/Heading";
import Dialog from "@components/Dialog";
import { ModalHeader } from "./ModalHeader";
import { ModalFooter } from "./ModalFooter";
import { BankRegisterError } from "./BankRegisterError";
import useHistory from "@utils/useHistory";
import { REGISTER_ACCOUNT } from "@utils/constant";
import NumberSchema from "@pages/auth/schema/PersonalNumber";

export const BankRegister = () => {
  const { messages } = useIntl();
  const location = useHistory();
  const [openDialog, setOpenDialog] = useState(false);
  const [onError, setOnError] = useState(false);
  const { PERSONAL_NUMBER } = INPUT.NAME;
  const PersonalNumberSchema = NumberSchema.pick([PERSONAL_NUMBER]);

  const handleModal = () => {
    setOpenDialog(!openDialog);
    // to change to true- once backend is ready for error popup
    setOnError(false);
  };

  const redirectToRegister = () => {
    location.push(REGISTER_ACCOUNT);
  };

  const IconLink = styled(Div)`
    i {
      transform: rotate(180deg);
      margin-right: 5px;
    }
  `;

  return (
    <>
      <Section py={85} textAlign="center">
        <Container>
          <H1 display={"block"}>{messages.title_bankid_registration}</H1>
          <Div
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={44}
          >
            <Card
              width={["100%", "100%", "100%", "540px"]}
              py={4}
              px={[3, 3, 3, 95]}
            >
              <Formik
                initialValues={{ personal_number: "" }}
                validationSchema={PersonalNumberSchema}
              >
                {(prop) => {
                  const { values, handleSubmit, isValid, touched, handleBlur } =
                    prop;
                  return (
                    <Form>
                      <Div mb={3} pb={1}>
                        <Div
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          mb={3}
                        >
                          <Logo logo={BankId} maxWidth="55px" />
                        </Div>
                        <InputText
                          curved
                          placeholder={messages.label_number}
                          value={values.personal_number}
                          name={PERSONAL_NUMBER}
                          formikProps={prop}
                          maxLength={11}
                          label={
                            <TextUpperCase>
                              {messages.label_personal_number}
                            </TextUpperCase>
                          }
                          width="100%"
                          onBlur={handleBlur}
                        />
                      </Div>
                      <Div mt={3} mb={5} display="flex" justifyContent="center">
                        <PrimaryButtonIcon
                          rounded
                          semibold
                          py={1}
                          px={20}
                          icon={
                            <InvertedIcon
                              p={1}
                              mr={1}
                              rounded={true}
                              name="tickmark"
                            />
                          }
                          onClick={handleSubmit}
                          disabled={
                            !(isValid && Object.keys(touched).length > 0)
                          }
                          label={messages.label_apply}
                        />
                      </Div>
                      <Div>
                        <Div>
                          <TextUpperCase display="block" mb={3} pb={2}>
                            {messages.lable_use_qrcode}
                          </TextUpperCase>
                        </Div>
                        <PrimaryButtonIconOutlined
                          rounded
                          semibold
                          px={3}
                          icon="icon-qrcode"
                          label={messages.lable_open_qr_code}
                          onClick={handleModal}
                        />
                      </Div>
                    </Form>
                  );
                }}
              </Formik>
            </Card>
          </Div>
          <Div
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={4}
            pt={2}
          >
            <IconLink>
              <Link
                display={["flex"]}
                flexDirection={"row-reverse"}
                label={messages.lable_back_registration}
                onClick={redirectToRegister}
                direction="left"
                variant="secondary"
              >
                <i className="icon-headerarrowright"></i>
              </Link>
            </IconLink>
          </Div>
        </Container>
      </Section>
      <NewOrExistingAccount isNew={false} />
      {openDialog && (
        <Dialog
          header={<ModalHeader onError={onError} />}
          visible="displayBasic"
          draggable={false}
          footer={<ModalFooter onCancelClick={handleModal} />}
          onHide={handleModal}
          width={["auto", "auto", "auto", "450px"]}
          m={[3, 3, 3, "auto"]}
        >
          <Div display="flex" flexDirection="column" alignItems="center" mb={3}>
            {!onError && <Logo logo={QrCode} maxWidth="190px" />}
          </Div>
          {onError && <BankRegisterError />}
        </Dialog>
      )}
    </>
  );
};

export default BankRegister;
