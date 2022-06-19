import Axios from "@app/api/axios";
import { ANALYSIS } from "@utils/constant";

const orderDetails = (payload) =>
  Axios.get(`orders/${payload}`).then((response) => {
    const { data: { data: order = {} } = {} } = response;
    const {
      order_items: orderItems = [],
      assignments = [],
      reports = [],
    } = order;
    order.order_items = orderItems.map((item) => {
      const {
        id: itemId = "",
        service_type: type = "",
        personal_number: number = "",
      } = item;
      if (type !== ANALYSIS) {
        const assignment = assignments.find((obj) => {
          const { order_item: { id: orderId = "" } = "" } = obj;
          return orderId === itemId;
        });
        const {
          id: assignmentId = "",
          user = {},
          status = "",
        } = assignment || {};
        const { name = "" } = user || {};
        return {
          ...item,
          assignmentId: assignmentId,
          assignee: name,
          assignmentStatus: status,
        };
      } else {
        const report = reports.find((obj) => {
          const { personal_number: personalNumber = "" } = obj;
          return String(personalNumber) === String(number);
        });
        const { id: reportId = "", report_status: reportStatus = "" } =
          report || {};
        item.reportId = reportId;
        item.reportStatus = reportStatus;
        return { ...item, reportId: reportId };
      }
    });
    return order;
  });

export default orderDetails;
