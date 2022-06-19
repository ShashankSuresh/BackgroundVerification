import React, { useState } from "react";
import { PrimaryButton, PrimaryButtonIconOutlined } from "@components/Button";
import Dialog from "@components/Dialog";

export default {
  title: "components/Dialog",
};

export const DialogDefault = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleModal = () => {
    setOpenDialog(!openDialog);
  };

  const Footer = () => {
    return (
      <PrimaryButtonIconOutlined
        rounded
        semibold
        label="Cancel"
        onClick={handleModal}
      />
    );
  };

  return (
    <>
      <PrimaryButton label="Show" onClick={handleModal} />
      {openDialog && (
        <Dialog
          header="Header"
          visible="displayBasic"
          draggable={false}
          footer={<Footer />}
          onHide={handleModal}
          width="500px"
          m={[1, "auto"]}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Dialog>
      )}
    </>
  );
};
