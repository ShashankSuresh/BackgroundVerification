import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import Breadcrumb from "@components/Breadcrumb";
import Div from "@components/Div";
import Divider from "@components/Divider";
import Card from "@components/Card";
import Chips from "@components/Chips";
import Dialog from "@components/Dialog";
import {
  Text,
  TextMediumWeight,
  TextLargeSemiBoldWeight,
} from "@components/Text";
import { H1, H2, H3, H4, H5 } from "@components/Heading";
import Span from "@components/Span";
import Link from "@components/Link";
import {
  PrimaryButtonIcon,
  PrimaryButtonOutlined,
  PrimaryButton,
  PrimaryButtonIconOutlined,
} from "@components/Button";
import Upload from "@components/Upload";
import Icon from "@components/Icon";
import AutoComplete from "@components/AutoComplete";
import {
  ROUTES,
  WRITE,
  SORT_KEY_ASSIGNMENT,
  REPORT,
  STATUS_COMPLETED,
} from "@utils/constant";
import InputTextArea from "@components/InputTextArea";
import assignmentDetails from "@app/services/assignments/getAssignmentDetails";
import fileDeleteService from "@app/services/files/fileDeleteService";
import { addHyphenToNumber, formatDate } from "@utils/utils";
import usersService from "@app/services/users/userService";
import updateAssignment from "@app/services/assignments/updateAssignment";
import resendAssignment from "@app/services/assignments/resendAssignmentService";

const Details = () => {
  const history = useHistory();

  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const { permissions = {} } = userInfo;

  const { messages } = useIntl();
  const { search = "" } = useLocation();
  const { id: assgnmentId = "" } = queryString.parse(search);
  const [assignment, setAssignment] = useState({});
  const [addComment, setComment] = useState("");
  const [customers, setCustomers] = useState([]);
  const [order, setOrder] = useState({});
  const [showAssignees, setShowAssignees] = useState(false);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const [filteredAssignees, setFilteredAssignees] = useState([]);
  const [newComments, setNewComments] = useState("");
  const [resendResponse, setResendResponse] = useState({});

  const items = [
    {
      label: messages.label_back_to_assignments,
      url: ROUTES.ADMIN_ASSIGNMENTS_LIST.URL,
    },
  ];

  const getAssignmentDetails = async () => {
    try {
      const response = await assignmentDetails(assgnmentId);
      const {
        data: { assignment: assignmentData = {}, order: orderData = {} } = {},
      } = response;
      const { user = {}, document = [] } = assignmentData;
      const { name = "" } = user || {};
      const documents = document.filter((obj) => obj.category !== REPORT);
      const reports = document.filter((obj) => obj.category === REPORT);
      assignmentData.document = documents || [];
      assignmentData.report = reports || [];
      setSelectedAssignee(name || "");
      setAssignment(assignmentData);
      setOrder(orderData);
    } catch (e) {
      throw new Error(e);
    }
  };

  const handleDocuments = (event) => {
    const { document = [] } = assignment;
    document.push(event);
    setAssignment({ ...assignment, document: document });
  };

  const handleReportChange = (event) => {
    let { report = [] } = assignment;
    report = [event];
    setAssignment({ ...assignment, report: report });
  };

  const handleRemoveDocument = (id) => async () => {
    try {
      await fileDeleteService(id);
      let { document = [] } = assignment;
      document = document.filter((obj) => obj.id !== id);
      setAssignment({ ...assignment, document: document });
    } catch (e) {
      throw new Error(e);
    }
  };

  const handleComments = () => {
    setShowCommentPopup(!showCommentPopup);
    const { comments = [] } = assignment;
    comments.push({ comment: addComment });
    setNewComments(addComment);
    setAssignment({ ...assignment, comments: comments });
    setComment("");
  };

  const handleRemoveReport = (id) => async () => {
    try {
      await fileDeleteService(id);
      setAssignment({ ...assignment, report: [] });
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    getAssignmentDetails();
    try {
      const loadCustomerData = async () => {
        const response = await usersService("type=admin");
        let { data: { data: users = [] } = {} } = response;
        users = users.map((obj) => {
          const { name = "", id = "", firstname = "", lastname = "" } = obj;
          return {
            label: name,
            value: id,
            firstname: firstname,
            lastname: lastname,
          };
        });
        setCustomers(users);
      };
      loadCustomerData();
    } catch (e) {
      throw new Error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchAssignee = (event) => {
    let filteredAssignees;
    if (!event.query.trim().length) {
      filteredAssignees = [...customers];
    } else {
      filteredAssignees = customers.filter((obj) => {
        return obj.label.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }
    setFilteredAssignees(filteredAssignees);
  };

  const handleAssignees = () => {
    setShowAssignees(!showAssignees);
  };

  const handleUpdateAssignee = () => {
    assignment.user = selectedAssignee;
    setAssignment(assignment);
    handleAssignees();
  };

  const handleSaveChanges = (save) => async () => {
    assignment.comments = newComments;
    assignment.status = "completed";
    if (save) {
      assignment.status = "in-progress";
    }
    try {
      const response = await updateAssignment(assignment);
      const {
        data: { data: resData = {} },
      } = response;
      const { document = [] } = resData;
      const documents = document.filter((obj) => obj.category !== REPORT);
      const reports = document.filter((obj) => obj.category === REPORT);
      resData.document = documents || [];
      resData.report = reports || [];
      setAssignment(resData);
      setNewComments("");
      setSelectedAssignee("");
    } catch (e) {
      throw new Error(e);
    }
  };

  const handleResend = async () => {
    const { id } = assignment;
    try {
      const response = await resendAssignment(id);
      const { status } = response;
      setResendResponse(status);
    } catch (e) {
      throw new Error(e);
    }
  };

  const dialogHeader = (popupName) => (
    <Div
      width={1}
      lineHeight={"27px"}
      my={2}
      display="flex"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
    >
      <H3 mb={3}>
        {popupName === "comments"
          ? messages.label_add_comment
          : messages.label_set_assignee}
      </H3>
      {popupName !== "comments" && (
        <Text>{messages.message_choose_assignee_text}</Text>
      )}
    </Div>
  );

  const redirectToOrderDetail = () => {
    const { order_id: orderId = "" } = assignment;
    history.push(`${ROUTES.ADMIN_ORDER_DETAILS.URL}?id=${orderId}`);
  };

  const handleAddComment = () => {
    setShowCommentPopup(!showCommentPopup);
  };

  const handleOnChangeComment = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const dialogFooter = (handleClose, handleClick) => (
    <Div
      display="flex"
      width={1}
      px={[0, 4]}
      flexDirection={["column", "row-reverse"]}
      justifyContent="center"
    >
      <PrimaryButton
        rounded
        semibold
        px={5}
        mx={24}
        label={messages.label_ok}
        onClick={handleClick}
        mb={["24px !important", 0]}
      />
      <PrimaryButtonOutlined
        rounded
        semibold
        px={48}
        label={messages.label_cancel}
        onClick={handleClose}
        mb={["24px !important", 0]}
        width={[1, "50%"]}
      />
    </Div>
  );

  const home = {
    icon: "icon-headerarrowright",
    url: ROUTES.ADMIN_ASSIGNMENTS_LIST.URL,
  };
  const { service = {}, document = [], user = {}, comments = [] } = assignment;
  return (
    <Div>
      <Breadcrumb items={items} home={home} />
      <Div pl={[0, 0, 0, 3]}>
        <Div display="flex" justifyContent="space-between" mb={4}>
          <H1>
            {`${messages.assignment} #${
              (assignment && assignment.assignment_number) || ""
            }`}
          </H1>
          <Span medium color="var(--yellow) !important" upper>
            {messages[assignment.status]}
          </Span>
        </Div>
        <H2>{messages.label_order}</H2>
        <Span textDecoration="underline" semibold info lineHeight="25px">
          <Link
            label={`${messages.label_order} #${(order && order.number) || ""}`}
            onClick={redirectToOrderDetail}
            mt={3}
            mr={3}
          ></Link>
        </Span>
        <H2 mt={20} mb={3}>
          {messages.label_assignee}
        </H2>
        {user && (user.firstname || user.lastname) ? (
          <>
            <Div display="flex" alignItems="center">
              <Icon
                name="avatar"
                mr={2}
                color="var(--blue-dark)"
                fontSize="var(--fs-h4)"
              />
              <H4>{`${user.firstname} ${user.lastname}`}</H4>
            </Div>
            <Link
              label={messages.label_change}
              onClick={handleAssignees}
              mt={3}
              mr={3}
              disabled={permissions && permissions.assignments !== WRITE}
            />
          </>
        ) : (
          <PrimaryButtonIcon
            rounded
            semibold
            height={40}
            px={20}
            icon={<Icon name="avatar" mr={2} />}
            onClick={handleAssignees}
            label={`${messages.label_set_assignee}...`}
            disabled={permissions && permissions.assignments !== WRITE}
          />
        )}
        <H2 my={3}>{messages.title_object}</H2>
        <Div display="grid" mb={4}>
          <Text mt={1}>{addHyphenToNumber(assignment.personal_number, 8)}</Text>
        </Div>
        <Card p={4} width={[1, 1, 1, 825]}>
          <H3 mb={10}>{service && service.name}</H3>
          <Span medium light>
            {`${messages.label_status}:`}
          </Span>
          <TextMediumWeight mb={10} display="flex">
            {assignment.status}
          </TextMediumWeight>
          <Div mb={2}>
            <Span medium light lineHeight="24px">
              {`${messages.label_files}:`}
            </Span>
          </Div>
          {assignment &&
            assignment.document &&
            assignment.document.map((file, key) => {
              const { url = "", file_name: name = "", id = "" } = file;
              return (
                <Div display="flex" mb={2} alignItems="center" key={key}>
                  <Link href={url} download>
                    <Icon
                      name="download"
                      color="var(--turquoise)"
                      mr={1}
                      fontWeight="var(--medium-weight)"
                      fontSize="var(--fs-h4)"
                    />
                  </Link>
                  <Chips
                    value={[name]}
                    onRemove={handleRemoveDocument}
                    id={id}
                  />
                </Div>
              );
            })}
          {!!permissions && permissions.assignments === WRITE && (
            <Div mt={25} mb={24}>
              <Upload
                onChange={handleDocuments}
                errorMessage={messages.error_try_later}
                label={messages.label_attach_file}
                assignmentId={assignment.id}
                category={SORT_KEY_ASSIGNMENT}
              />
            </Div>
          )}
          {document.length ? (
            <Div>
              <Icon
                rounded
                name="tickmark"
                mr={2}
                p={0}
                bg="var(--turquoise)"
                border="solid var(--turquoise)"
              />
              <TextLargeSemiBoldWeight>
                {messages.messages_documents_loaded}
              </TextLargeSemiBoldWeight>
            </Div>
          ) : (
            ""
          )}
        </Card>
        <H2 mt={50} lineHeight="25px">
          {messages.label_comments}
        </H2>
        <H5 mt={3} mb={20} lineHeight="25px">
          <TextLargeSemiBoldWeight color="var(--grey) !important">
            {messages.label_internal_storge}
          </TextLargeSemiBoldWeight>
        </H5>
        {comments
          ? comments.map((cmt, key) => {
              const {
                comment = "",
                created_at = "",
                role = "",
                user: { name = "" } = {},
              } = cmt;
              return (
                <Div width={[1, 1, 8 / 10]} key={key}>
                  <Div display="flex" justifyContent="space-between" mb={22}>
                    <Div display="flex" alignItems="center">
                      <Icon
                        name="avatar"
                        mr={2}
                        color="var(--blue-dark)"
                        fontSize="var(--fs-h4)"
                      />
                      <H4 mr={3}>{name}</H4>
                      <Span color="var(--grey) !important" lineHeight="20px">
                        <H5>{role}</H5>
                      </Span>
                    </Div>
                    <Span color="var(--grey) !important" light>
                      {created_at ? formatDate(created_at) : ""}
                    </Span>
                  </Div>
                  <Div mb={4}>
                    <Span light medium lineHeight="21px">
                      {comment}
                    </Span>
                  </Div>
                  <Divider />
                </Div>
              );
            })
          : ""}

        <PrimaryButtonOutlined
          rounded
          semibold
          height={40}
          onClick={handleAddComment}
          label={messages.label_add_comment}
          mt={14}
          minWidth={184}
          disabled={permissions && permissions.assignments !== WRITE}
        />
        <H2 mt={40} mb={2}>
          {messages.label_results}
        </H2>
        {assignment.report && assignment.report.length
          ? assignment.report.map((report, key) => {
              const { url = "", file_name: name = "", id = "" } = report;
              return (
                <Div display="flex" mb={2} alignItems="center" key={key}>
                  <Link href={url} download>
                    <Icon
                      name="download"
                      color="var(--turquoise)"
                      mr={1}
                      fontWeight="var(--medium-weight)"
                      fontSize="var(--fs-h4)"
                    />
                  </Link>
                  <Chips value={[name]} onRemove={handleRemoveReport} id={id} />
                </Div>
              );
            })
          : !!permissions &&
            permissions.assignments === WRITE && (
              <Upload
                onChange={handleReportChange}
                errorMessage={messages.error_try_later}
                label={messages.label_add_report}
                category={REPORT}
                assignmentId={assignment.id}
              />
            )}
        <Div mt={40} mb={20} display={["block", "block", "block", "flex"]}>
          <PrimaryButtonIcon
            onClick={handleSaveChanges(true)}
            rounded
            semibold
            height={40}
            width={[1, 1, 1, "auto"]}
            minWidth={186}
            mr={[0, 0, 0, 30]}
            mb={[3, 3, 3, 0]}
            icon={
              <Icon
                name={
                  assignment.status === STATUS_COMPLETED
                    ? "backarrow"
                    : "tickmark"
                }
                mr={2}
              />
            }
            label={
              assignment.status === STATUS_COMPLETED
                ? messages.label_re_open_assignment
                : messages.label_save_changes
            }
            disabled={permissions && permissions.assignments !== WRITE}
          />
          {assignment.status !== STATUS_COMPLETED ? (
            <PrimaryButtonIcon
              onClick={handleSaveChanges(false)}
              disabled={
                !(
                  assignment.user &&
                  assignment.user.firstname &&
                  assignment.report &&
                  assignment.report.length
                ) ||
                (permissions && permissions.assignments !== WRITE)
              }
              rounded
              semibold
              height={40}
              minWidth={193}
              width={[1, 1, 1, "auto"]}
              icon={<Icon name="send" mr={2} />}
              label={messages.label_save_send}
            />
          ) : (
            <PrimaryButtonIconOutlined
              px={3}
              label={messages.label_resend_to_client}
              icon={<Icon name="backarrow" mr={2} />}
              onClick={handleResend}
              width={[1, 1, 1, "auto"]}
            />
          )}
        </Div>
        {resendResponse === 200 && (
          <TextLargeSemiBoldWeight color="var(--blue-dark) !important">
            {messages.text_email_resent}
          </TextLargeSemiBoldWeight>
        )}
      </Div>
      {showAssignees && (
        <Dialog
          header={dialogHeader}
          visible="displayBasic"
          draggable={false}
          footer={dialogFooter(handleAssignees, handleUpdateAssignee)}
          onHide={handleAssignees}
          width={[1, 1, 1, 500]}
          m={[3, 3, 3, "auto"]}
        >
          <AutoComplete
            value={selectedAssignee}
            field="label"
            display="grid"
            placeholder={`${messages.search_text}...`}
            curved
            py={3}
            type="search"
            width={"100% !important"}
            completeMethod={searchAssignee}
            suggestions={filteredAssignees}
            onChange={(e) => setSelectedAssignee(e.value)}
          />
        </Dialog>
      )}
      {showCommentPopup && (
        <Dialog
          header={dialogHeader("comments")}
          visible="displayBasic"
          draggable={false}
          footer={dialogFooter(handleAddComment, handleComments)}
          onHide={handleAddComment}
          width={[1, 1, 1, 500]}
          m={[3, 3, 3, "auto"]}
        >
          <InputTextArea
            curved
            placeholder="Comment..."
            name="addComment"
            value={addComment}
            onChange={handleOnChangeComment}
            width={1}
            rows={7}
            cols={30}
            maxlength="500"
            autoResize="false"
          />
        </Dialog>
      )}
    </Div>
  );
};
export default Details;
