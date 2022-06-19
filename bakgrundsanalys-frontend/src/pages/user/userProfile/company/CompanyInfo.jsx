import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import Div from "@components/Div";
import { H4 } from "@components/Heading";
import Dialog from "@components/Dialog";
import ListItem from "@components/ListItem";
import Link from "@components/Link";
import { H2 } from "@components/Heading";
import { ModalHeader } from "./ModalHeader";
import { EditCompanyForm } from "./EditCompanyForm";
import Icon from "@components/Icon";
import ConfirmationDialog from "@pages/shared/ConfirmationDialog";
import { TextLarge, TextLargeSemiBoldWeight } from "@components/Text";
import { READ } from "@utils/constant";

export const CompanyInfo = () => {
  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const [openDialog, setOpenDialog] = useState(false);
  const { messages } = useIntl();
  const { customer = {}, showConfirmDialog, permissions = {} } = userInfo;

  const {
    id: companyId,
    company_name: name,
    registration_nr: companyNumber,
    tax_nr: vat,
    address: companyAddress = "-",
    phone: phoneNumber = "-",
  } = customer;

  const handleModal = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <>
      {openDialog && (
        <Dialog
          header={<ModalHeader />}
          visible="displayBasic"
          draggable={false}
          onHide={handleModal}
          width={[1, 1, 1, "auto"]}
          m={[3, 3, 3, "auto"]}
        >
          <EditCompanyForm
            id={companyId}
            userInfo={userInfo}
            onHideModal={handleModal}
          />
        </Dialog>
      )}
      {showConfirmDialog && (
        <ConfirmationDialog byline={messages.text_update_sucessful} />
      )}
      <>
        <Div width={1}>
          <H2 mb={3}>{messages.label_company_info}</H2>
          <Div>
            <ul>
              <ListItem pb={3} lineHeight="25px">
                <TextLargeSemiBoldWeight semibold py={3}>
                  {messages.label_name}:
                </TextLargeSemiBoldWeight>
                <TextLarge mt={2} mx={1} fontWeight={300}>
                  {name}
                </TextLarge>
              </ListItem>
              <ListItem pb={3} lineHeight="25px">
                <TextLargeSemiBoldWeight semibold py={3}>
                  {messages.label_company_number}:
                </TextLargeSemiBoldWeight>
                <TextLarge mt={2} mx={1} fontWeight={300}>
                  {companyNumber}
                </TextLarge>
              </ListItem>
              <ListItem pb={3} lineHeight="25px">
                <TextLargeSemiBoldWeight semibold py={3}>
                  {messages.label_company_vat}:
                </TextLargeSemiBoldWeight>
                <TextLarge mt={2} mx={1} fontWeight={300}>
                  {vat}
                </TextLarge>
              </ListItem>
              <ListItem pb={3} lineHeight="25px">
                <TextLargeSemiBoldWeight semibold py={3}>
                  {messages.label_company} {messages.label_address}:
                </TextLargeSemiBoldWeight>
                <TextLarge mt={2} mx={1} fontWeight={300}>
                  {companyAddress}
                </TextLarge>
              </ListItem>
              <ListItem pb={3} lineHeight="25px">
                <TextLargeSemiBoldWeight semibold py={3}>
                  {messages.label_company_phone}:
                </TextLargeSemiBoldWeight>
                <TextLarge mt={2} mx={1} fontWeight={300}>
                  {phoneNumber}
                </TextLarge>
              </ListItem>
            </ul>
          </Div>
          {!!permissions && permissions["company-information"] !== READ && (
            <Div pt={3} display="flex">
              <Link
                label={messages.label_edit_company_info}
                direction="right"
                onClick={handleModal}
                iconPos="left"
              >
                <Icon name="pen" mr={2} />
              </Link>
            </Div>
          )}
          <Div
            display="flex"
            alignItems="center"
            mt={4}
            p={3}
            mx={2}
            borderColor={"var(--turquoise)"}
            borderWidth="1px"
            borderStyle="dashed"
          >
            <Icon name="sign" rounded={true} />
            <H4 pl={2} textAlign="left">
              {messages.byline_note}
              <Icon name="info" rounded={true} p={0} borderWidth={2} />
              {messages.byline_note_rules}
            </H4>
          </Div>
        </Div>
      </>
    </>
  );
};

export default CompanyInfo;
