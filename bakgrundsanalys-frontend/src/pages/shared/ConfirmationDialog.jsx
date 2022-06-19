import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "@components/Dialog";
import Div from "@components/Div";
import Span from "@components/Span";
import { H4 } from "@components/Heading";
import { PrimaryButton } from "@components/Button";
import { authActions } from "@app/reducers/authReducer";

const ConfirmationDialog = (prop) => {
  const { messages } = useIntl();
  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(userInfo.showConfirmDialog);
  const { byline, isError } = prop;

  const onCloseModal = () => {
    setShowDialog(!userInfo.showConfirmDialog);
    dispatch(
      authActions.storeUserInfo({
        ...userInfo,
        showConfirmDialog: false,
      })
    );
  };

  const dialogHeader = () => {
    return (
      <Div
        width={1}
        lineHeight={"27px"}
        my={2}
        display="flex"
        alignItems="center"
        flexDirection="column"
        textAlign="center"
      >
        <H4 variant="primary">
          {isError ? messages.title_error : messages.label_done}{" "}
        </H4>
      </Div>
    );
  };
  return (
    <>
      {showDialog && (
        <Dialog
          header={dialogHeader}
          visible="displayBasic"
          draggable={false}
          onHide={onCloseModal}
          width={[1, 500]}
          m={[3, "auto"]}
        >
          <Div display="flex" flexDirection="column" alignItems="center">
            <Div mt={3} mb={4}>
              <Span>{byline}</Span>
            </Div>
            <PrimaryButton
              rounded
              semibold
              width={[1, "47%"]}
              mb={[30, 0]}
              label={messages.label_ok}
              onClick={onCloseModal}
            />
          </Div>
        </Dialog>
      )}
    </>
  );
};

export default ConfirmationDialog;
