import React from "react";
import PropTypes from "prop-types";
import CheckBoxes from "./Utils/Checkbox";
import Button from "./Utils/Button";
import ButtonOutlined from "./Utils/ButtonOutlined";
import ButtonRaised from "./Utils/ButtonRaised";
import Calendar from "./Utils/Calendar";
import UtilsLink from "./Utils/Link";
import SubTitle from "./Utils/SubTitle";

const ActionTemplate = (type, value) => {
  const { isHidden = false } = value;
  if (!isHidden) {
    return (
      <>
        {(() => {
          switch (type) {
            case "checkbox":
              return (
                <CheckBoxes type={type} value={value} options={value.options} />
              );

            case "button":
              return <Button type={value} />;

            case "button-outlined":
              return <ButtonOutlined type={value} />;

            case "button-raised":
              return <ButtonRaised type={value} />;

            case "calendar":
              return <Calendar value={value} />;

            case "link":
              return <UtilsLink type={value} />;
            case "subTitle":
              return <SubTitle type={value} />;
          }
        })()}
      </>
    );
  }
  return <></>;
};

ActionTemplate.propTypes = {
  type: PropTypes.string,
};

export default ActionTemplate;
