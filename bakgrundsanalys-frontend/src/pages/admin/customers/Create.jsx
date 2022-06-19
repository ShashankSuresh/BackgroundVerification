import React from "react";
import { useIntl } from "react-intl";
import { H1 } from "@components/Heading";
import Div from "@components/Div";
import Breadcrumb from "@components/Breadcrumb";
import { ROUTES, ADMIN_CUSTOMERS } from "@utils/constant";
import useHistory from "@utils/useHistory";

import RegisterAccount from "@pages/auth/registerAccount/RegisterAccount";

const CreateCustomer = () => {
  const { messages } = useIntl();
  const location = useHistory();

  const breadCrumbItems = [
    {
      label: messages.label_back_to_customers,
      url: ROUTES.ADMIN_CUSTOMERS.URL,
    },
  ];
  const breadCrumbProps = {
    icon: "icon-headerarrowright",
    url: ROUTES.ADMIN_CUSTOMERS.URL,
  };
  const handleCancelClick = () => {
    location.push(ADMIN_CUSTOMERS);
  };
  return (
    <Div px={2} py={3}>
      <Breadcrumb
        items={breadCrumbItems}
        home={breadCrumbProps}
        p={0}
        pb={[1, 1, 1, 10]}
      />

      <Div
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        width={[1, 1, "50%"]}
      >
        <H1>{messages.title_create_customer}</H1>
        <RegisterAccount isCreateCustomer onCancelCreate={handleCancelClick} />
      </Div>
    </Div>
  );
};

export default CreateCustomer;
