import ordersGuestService from "@app/services/orders/ordersGuestService";
import ordersAdminService from "@app/services/orders/ordersAdminService";
import { GUEST_USER, CUSTOMER_USER, ADMIN } from "@utils/constant";
import { getUserType } from "@utils/utils";

export const fetchResults = (payload, props, isFreeAccount) => {
  const UserType = getUserType(isFreeAccount);
  const { type, payment_method } = UserType;
  if (type === GUEST_USER) {
    const { email = "", tax_nr: vatNumber = "" } = props;
    const finalPayload = {
      email: email,
      payment_method,
      order_items: [...payload],
    };
    if (vatNumber) {
      finalPayload.tax_nr = vatNumber;
    }
    return ordersGuestService(finalPayload);
  }

  if (type === CUSTOMER_USER) {
    const finalPayload = {
      payment_method,
      order_items: [...payload],
    };
    return ordersAdminService(finalPayload);
  }

  if (type === ADMIN) {
    const finalPayload = {
      ...props,
      payment_method,
      order_items: [...payload],
    };
    return ordersAdminService(finalPayload);
  }
};
