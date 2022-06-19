import React from "react";
import Upload from "@components/Upload";

export default {
  title: "components/Upload",
};

export const UploadFile = () => (
  <Upload
    label="Upload"
    onChange={() => {}}
    errorMessage="Try after some time"
    route={"./upload"}
  />
);
