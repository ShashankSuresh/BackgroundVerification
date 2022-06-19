import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { H2 } from "@components/Heading";
import Div from "@components/Div";
import { TextLargeSemiBoldWeight, TextLarge } from "@components/Text";
import { personDetailsProps } from "./config";
import { ADDRESS, MARITIAL_STATUS, INPUT } from "@utils/constant";
import { addHyphenToNumber } from "@utils/utils";

const PersonDetails = ({ userDetails = {} }) => {
  const { sectionTitle, content } = personDetailsProps;
  const { messages } = useIntl();

  const constructContent = (arr) =>
    arr.map((value, index) => {
      const { title = "", key = "" } = value;
      const { personal_number = "" } = userDetails;
      return (
        <Div key={index} display="flex">
          <Div width={[1, 1 / 3]} pb={3}>
            <TextLargeSemiBoldWeight>{`${messages[title]}:`}</TextLargeSemiBoldWeight>
          </Div>
          <Div width={[1, 1 / 2]}>
            <TextLarge>
              {key === ADDRESS
                ? userDetails.street_address
                  ? `${userDetails.street_address}, ${userDetails.city}, ${userDetails.zip_code}`
                  : ""
                : key === MARITIAL_STATUS
                ? messages[userDetails[key] || ""]
                : key === INPUT.NAME.PERSONAL_NUMBER
                ? addHyphenToNumber(personal_number.toString(), 8) || ""
                : userDetails[key] || ""}
            </TextLarge>
          </Div>
        </Div>
      );
    });

  return (
    <Div mt={5}>
      <H2 color="var(--blue-dark)" mb={4}>
        {messages[sectionTitle]}
      </H2>
      <Div mb={4}>{constructContent(content)}</Div>
    </Div>
  );
};

PersonDetails.propTypes = {
  userDetails: PropTypes.object,
};

export default PersonDetails;
