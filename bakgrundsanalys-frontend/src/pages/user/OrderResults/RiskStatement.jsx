import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { H2 } from "@components/Heading";
import { TextLarge, TextLargeSemiBoldWeight } from "@components/Text";
import Div from "@components/Div";
import { riskStatementProps, statementScaleProps } from "./config";

const RiskStatement = ({ userDetails }) => {
  const { messages } = useIntl();
  const { grades = "", name = "" } = userDetails || {};
  const { sectionTitle, footer } = riskStatementProps;

  const { grad = [] } = statementScaleProps;

  const gradeDetails = grad.find((obj) => {
    const { grades: grade = "" } = obj;
    return grade === grades;
  });

  const {
    statement = [],
    color = "yellow",
    bgColor = "grey",
  } = gradeDetails || {};

  const constructContent = (arr) =>
    arr.map((value, index) => (
      <TextLargeSemiBoldWeight
        key={index}
        px={[20, 20, 50]}
        py={[20, 20, 20]}
        mr={4}
        mb={[3, 3, 0]}
        backgroundColor={`var(--${bgColor}-dark)`}
        color={`var(--${color}) !important`}
      >
        {value === "grade" ? `${messages[value]} ${grades}` : messages[value]}
      </TextLargeSemiBoldWeight>
    ));

  return (
    <Div>
      <H2 color="var(--blue-dark)" mt={4} mb={3}>
        {messages[sectionTitle]}
      </H2>
      <Div display="flex" mb={3}>
        <TextLarge>
          {grades
            ? `${messages[riskStatementProps[grades][0]]} ${name} ${
                messages[riskStatementProps[grades][1]]
              }`
            : ""}
        </TextLarge>
      </Div>

      <Div display="flex" flexDirection={["column", "column", "row"]}>
        {constructContent(statement)}
      </Div>
      <TextLarge display="block" my={4}>
        {footer}
      </TextLarge>
    </Div>
  );
};

RiskStatement.propTypes = {
  userDetails: PropTypes.object,
};

export default RiskStatement;
