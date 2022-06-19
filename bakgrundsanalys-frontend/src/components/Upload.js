import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FileUpload as PRFileUpload } from "primereact/fileupload";
import { FILE_SIZE_LIMIT, ACCEPT_FILE_TYPES } from "@utils/constant";
import Div from "@components/Div";
import Span from "@components/Span";
import fileUploadService from "@app/services/files/fileUploadService";

const FileUpload = styled(PRFileUpload)`
  margin: 15px 0px;
  .p-fileupload-buttonbar {
    background: none;
    border: none;
    padding: 0;
    border-radius: none;
  }
  .p-button {
    background-color: transparent;
    border: 2px solid var(--blue-dark);
    color: var(--blue-dark);
    border-radius: 50px;
    min-width: 150px;
    padding: 6px 22px;
    line-height: 150%;
    font-weight: var(--semibold-weight);
    box-shadow: none !important;
    &:hover {
      background: var(--blue-medium) !important;
      border-color: var(--blue-medium) !important;
      color: var(--white) !important;
    }
    .p-button-icon-left {
      margin-right: 0;
    }
  }
  .p-message-wrapper {
    padding: 0px;
  }
  .p-message-error {
    background: none;
    border: none;
    color: var(--red-dark);
    i {
      &:before {
        display: none;
      }
    }
  }
  .p-message-icon {
    display: none;
  }
  .p-fileupload-content {
    background: none;
    border: none;
    padding: 0;
    display: none;
  }
  .p-fileupload-row {
    display: none !important;
  }
`;

const Upload = ({
  onChange,
  assignmentId = "",
  label = "",
  errorMessage = "",
  category = "",
}) => {
  const uploadRef = useRef(null);
  const [showError, setError] = useState("");

  const onError = () => {
    setError(errorMessage);
  };

  const uploadHandler = async (event) => {
    const { files } = event;
    const { type = "" } = files[0];
    let form = new FormData();
    form.append("assignment_id", assignmentId);
    form.append("media", files[0]);
    form.append("type", type);
    form.append("category", category);
    try {
      const response = await fileUploadService(form);
      const { data = {} } = response;
      setError("");
      uploadRef.current.clear();
      onChange(data);
    } catch (e) {
      throw new Error(e);
    }
  };

  const chooseOptions = { label: label, icon: "icon-pin" };

  return (
    <>
      <FileUpload
        name="file"
        auto
        ref={uploadRef}
        chooseOptions={chooseOptions}
        onError={onError}
        maxFileSize={FILE_SIZE_LIMIT}
        accept={ACCEPT_FILE_TYPES}
        customUpload
        uploadHandler={uploadHandler}
      />
      {showError && (
        <Div>
          <Span error py={2}>
            {showError}
          </Span>
        </Div>
      )}
    </>
  );
};

Upload.propTypes = {
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  route: PropTypes.string,
  assignmentId: PropTypes.string,
  category: PropTypes.string,
};
export default Upload;
