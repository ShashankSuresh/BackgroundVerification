import React, { useState } from "react";
import { useIntl } from "react-intl";
import Container from "@components/Container";
import Section from "@components/Section";
import Div from "@components/Div";
import { H3 } from "@components/Heading";
import Logo from "@components/Logo";
import QrCode from "@assets/privatenumber_qr.png";
import { PrimaryButtonIconOutlined } from "@components/Button";
import { ModalHeader } from "./ModalHeader";
import { ModalFooter } from "./ModalFooter";
import { BankLoginError } from "./BankLoginError";
import styled from "styled-components";
import { default as PRDialog } from "@components/Dialog";

const Dialog = styled(PRDialog)`
  .p-dialog-content {
    padding-bottom: 20px;
  }
`;

const BankLogin = () => {
  const { messages } = useIntl();
  const [openDialog, setOpenDialog] = useState(false);
  const [onError, setOnError] = useState(false);

  const handleModal = () => {
    setOpenDialog(!openDialog);
    // to change to true- once backend is ready for error popup
    setOnError(false);
  };
  return (
    <Section py={40}>
      <Container>
        <Div display="flex" alignItems="center" flexDirection="column">
          {openDialog && (
            <Dialog
              header={<ModalHeader onError={onError} />}
              visible="displayBasic"
              draggable={false}
              footer={<ModalFooter onCancelClick={handleModal} />}
              onHide={handleModal}
              width={1}
              maxWidth={"445px"}
            >
              <Div display="flex" flexDirection="column" alignItems="center">
                {!onError && <Logo logo={QrCode} maxWidth="190px" />}
              </Div>
              {onError && <BankLoginError />}
            </Dialog>
          )}
          <Div>
            <H3 textAlign={"center"}>{messages.label_bank_id_text}</H3>
          </Div>
          <Div mt={4}>
            <PrimaryButtonIconOutlined
              rounded
              semibold
              icon="icon-qrcode"
              label={messages.label_bank_id}
              onClick={handleModal}
            />
          </Div>
        </Div>
      </Container>
    </Section>
  );
};

export default BankLogin;
