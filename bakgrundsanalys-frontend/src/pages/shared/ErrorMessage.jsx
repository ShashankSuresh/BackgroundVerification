import React from "react";
import PropTypes from "prop-types";
import { Error } from "@components/Heading";

const ErrorMessage = (props) => <Error mt={4}>{props.errorMessage}</Error>;

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
};

export default ErrorMessage;
