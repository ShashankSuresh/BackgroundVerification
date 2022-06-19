import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import Div from "@components/Div";
import Card from "@components/Card";
import { H2, H3 } from "@components/Heading";
import Span from "@components/Span";
import Link, { LinkArrow } from "@components/Link";
import Icon from "@components/Icon";
import {
  ROUTES,
  ANALYSIS,
  STATUS_EXPIRED,
  STATUS_NOT_PAID,
  STATUS_PAID,
  STATUS_COMPLETED,
  STATUS_IN_PROGRESS,
  STATUS_CANCELLED,
  STATUS_NEW,
  STATUS_ERROR,
  STATUS_FAILED,
} from "@utils/constant";
import {
  Text,
  TextLargeSemiBoldWeight,
  ColouredSemiBoldText,
} from "@components/Text";
import { addHyphenToNumber } from "@utils/utils";

const Part = ({ item, status = "" }) => {
  const { messages } = useIntl();
  const history = useHistory();
  const {
    name: service = "",
    personal_number: number = "",
    service_type: serviceType = "",
    assignmentId = "",
    reportId = "",
    reportStatus = "",
    assignmentStatus = "",
  } = item || {};

  const handleRedirectToAssigment = () => {
    history.push(`${ROUTES.ASSIGNMENT_DETAILS.URL}?id=${assignmentId}`);
  };

  const handleRedirectToReport = () => {
    window.open(`${ROUTES.ORDER_RESULTS.URL}?id=${reportId}`, "_blank");
  };

  const handleStatus = (status) => {
    switch (status) {
      case STATUS_NOT_PAID:
        return messages.status_not_started;
      case STATUS_PAID:
        return messages.paid;
      case STATUS_COMPLETED:
        return messages.completed;
      case STATUS_IN_PROGRESS:
        return messages.status_in_progress;
      case STATUS_CANCELLED:
        return messages.cancelled;
      case STATUS_NEW:
        return messages.new;
      case STATUS_ERROR:
        return (
          <ColouredSemiBoldText color="var(--red)">
            {messages.waiting}
          </ColouredSemiBoldText>
        );
      case STATUS_EXPIRED:
        return messages.expired;
      default:
        return status;
    }
  };

  return (
    <>
      <H2 mb={3} variant="primary" fontWeight={"var(--semibold-weight)"}>
        {messages.title_object}
      </H2>
      <Text mb={4} display="block">
        {addHyphenToNumber(number, 8)}
      </Text>
      <Card
        mr={[0, 0, 0, 4]}
        mb={[4, 4, 4, 0]}
        width={1}
        p={4}
        color={"var(--grey-dark)"}
        maxWidth={"825px"}
      >
        <Div
          mb={3}
          display={["block", "flex"]}
          alignItems="center"
          justifyContent="space-between"
        >
          <H3 mb={[3, 0]}>{service}</H3>
          {status === STATUS_PAID || status === STATUS_COMPLETED ? (
            <Span medium>
              {`${messages.label_expires_in} 29 ${messages.label_days}`}
            </Span>
          ) : (
            ""
          )}
        </Div>
        <Text display="block" medium>
          {`${messages.label_status}:`}
        </Text>
        <TextLargeSemiBoldWeight my={1} display="block">
          {status === STATUS_PAID || status === STATUS_COMPLETED
            ? serviceType === ANALYSIS
              ? handleStatus(reportStatus)
              : handleStatus(assignmentStatus)
            : handleStatus(status)}
        </TextLargeSemiBoldWeight>
        {serviceType === ANALYSIS ? (
          status === STATUS_CANCELLED ? (
            <>
              <Text display="block">{messages.message_order_cancelled}</Text>
            </>
          ) : status === STATUS_NOT_PAID ? (
            <>
              <Text display="block">{messages.message_order_not_paid}</Text>
            </>
          ) : status === STATUS_EXPIRED ? (
            <>
              <Text display="block">{messages.assignment_expired_message}</Text>
            </>
          ) : reportStatus === STATUS_FAILED ? (
            <Div display={["block", "flex"]} mt={2}>
              <LinkArrow
                label={messages.label_restart_analysis}
                direction="right"
                variant="secondary"
                mr={3}
              >
                <Span px={1}>
                  <Icon name="headerarrowright" />
                </Span>
              </LinkArrow>
            </Div>
          ) : reportStatus === STATUS_COMPLETED ? (
            <Div
              display="flex"
              flexDirection={["column", "column", "column", "row"]}
            >
              <LinkArrow
                label={messages.see_results}
                direction="right"
                variant="secondary"
                mt={3}
                mr={3}
                onClick={handleRedirectToReport}
              >
                <Span px={1}>
                  <Icon name="headerarrowright" />
                </Span>
              </LinkArrow>
              <Link
                label={messages.resend_user}
                direction="right"
                variant="secondary"
                mt={[0, 3]}
                mr={3}
                iconPos={"left"}
              >
                <Span px={1}>
                  <Icon name="backarrow" mr={1} />
                </Span>
              </Link>
            </Div>
          ) : (
            ""
          )
        ) : status === STATUS_CANCELLED ? (
          <>
            <Text display="block">{messages.message_order_cancelled}</Text>
          </>
        ) : status === STATUS_NOT_PAID ? (
          <>
            <Text display="block">{messages.assignment_message_not_paid}</Text>
          </>
        ) : status === STATUS_EXPIRED ? (
          <>
            <Text display="block">{messages.assignment_expired_message}</Text>
          </>
        ) : assignmentStatus ? (
          <>
            <Span mt={3} medium light display="block">
              {`${messages.label_assignee}:`}
            </Span>
            {item.assignee ? (
              <Span mt={1} display="block">
                <Icon name="avatar" color="var(--blue-dark)" />
                {item.assignee}
              </Span>
            ) : (
              "-"
            )}
            <Div display={["block", "flex"]} mt={2}>
              <LinkArrow
                label={messages.assignment}
                direction="right"
                variant="secondary"
                mr={3}
                onClick={handleRedirectToAssigment}
              >
                <Span px={1}>
                  <Icon name="headerarrowright" />
                </Span>
              </LinkArrow>
              <Link
                label={messages.resend_user}
                direction="right"
                variant="secondary"
                mr={3}
                iconPos={"left"}
              >
                <Span px={1}>
                  <Icon name="backarrow" />
                </Span>
              </Link>
            </Div>
          </>
        ) : (
          ""
        )}
      </Card>
    </>
  );
};
Part.propTypes = {
  item: PropTypes.object,
  status: PropTypes.string,
};
export default Part;
