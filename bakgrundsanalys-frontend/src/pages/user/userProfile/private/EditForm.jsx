import React from "react";
import EditUserForm from "./EditUserForm";
import EditPasswordForm from "./EditPasswordForm";
import EditPersonalNumber from "./EditPersonalNumber";
import DeleteProfileConfirmation from "./DeleteProfileConfirmation";
import EditInfo from "@pages/admin/myProfile/EditInfo";

export const EditForm = (prop) => {
  const { editType } = prop;
  switch (editType) {
    case "user":
      return <EditUserForm width={["90%", "auto"]} {...prop} />;
    case "password":
      return <EditPasswordForm width={["90%", "auto"]} {...prop} />;
    case "personalNumber":
      return <EditPersonalNumber width={["90%", "auto"]} {...prop} />;
    case "deleteProfile":
      return (
        <DeleteProfileConfirmation
          width={["90%", "60%", "50%", "auto"]}
          {...prop}
        />
      );
    case "adminUser":
      return <EditInfo {...prop} />;
    default:
      return { title: "Info" };
  }
};

export default EditForm;
