import React from "react";
import {
  PrimaryButton,
  PrimaryButtonOutlined,
  PrimaryButtonIcon,
  PrimaryButtonIconOutlined,
  ButtonRaisedIcon,
} from "@components/Button";

export default {
  title: "Components/Button",
};

export const Primary = (args) => <PrimaryButton label="Button" {...args} />;

export const PrimaryDisabled = (args) => (
  <PrimaryButton label="Button" disabled {...args} />
);

export const PrimaryOutlined = (args) => (
  <PrimaryButtonOutlined label="Button" {...args} />
);

export const PrimaryIconRight = (args) => (
  <PrimaryButtonIcon label="Button" iconPos="left" icon="icon-pin" {...args} />
);

export const PrimaryIconLeft = (args) => (
  <PrimaryButtonIcon label="Button" icon="icon-pin" {...args} />
);

export const PrimaryIconOutlined = (args) => (
  <PrimaryButtonIconOutlined label="Button" icon="icon-pin" {...args} />
);

export const PrimaryMobileWithIcon = (args) => (
  <PrimaryButton icon="icon-search" {...args} />
);

export const ButtonRaisedWithLabel = (args) => (
  <ButtonRaisedIcon className="blah" label="Primary" {...args} curved />
);

export const ButtonRaisedWithIcon = (args) => (
  <ButtonRaisedIcon label="Primary" icon="icon-pin" {...args} rounded />
);

export const ButtonRaisedOnlyIcon = (args) => (
  <ButtonRaisedIcon icon="icon-pin" {...args} />
);
