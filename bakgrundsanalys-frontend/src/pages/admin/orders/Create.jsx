import React, { useState } from "react";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { fetchResults } from "../../shared/CreateOrder";
import Dialog from "@components/Dialog";
import { H3, Error } from "@components/Heading";
import Label from "@components/Label";
import Div from "@components/Div";
import Span from "@components/Span";
import Dropdown from "@components/Dropdown";
import AutoComplete from "@components/AutoComplete";
import Checkbox from "@components/Checkbox";
import InputText from "@components/InputText";
import Skeleton from "@components/Skeleton";
import { PrimaryButtonOutlined, PrimaryButton } from "@components/Button";
import { TextLargeSemiBoldWeight, Text } from "@components/Text";
import NumberSchema from "@pages/auth/schema/PersonalNumber";
import ObjectSchema from "@pages/auth/schema/Object";
import ArraySchema from "@pages/auth/schema/Array";
import { INPUT } from "@utils/constant";
import usersService from "@app/services/users/userService";
import personInformationSearchService from "@app/services/search/personInformationSearchService";

const Create = ({
  onCancel = () => {},
  availableServices = [],
  availableCustomers = [],
}) => {
  const { messages } = useIntl();
  const [customers] = useState(availableCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [orderCreated, setOrderCreated] = useState(false);
  const [error, setError] = useState(false);
  const { SERVICES, PERSONAL_NUMBER, CUSTOMER, SUB_USER } = INPUT.NAME;
  const [users, setUserData] = useState([]);
  const [showSelectUser, setShowSelectUser] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const adminUserProps = (values) => ({
    customer_id: values.customer.value,
    user_id: values.subUser,
  });

  const ValidationSchema = ArraySchema.pick([SERVICES]).concat(
    NumberSchema.pick([PERSONAL_NUMBER]).concat(
      ObjectSchema.pick([CUSTOMER, SUB_USER])
    )
  );

  const searchCustomer = (event) => {
    let filterCustomers;
    if (!(event.query.trim().length > 3)) {
      filterCustomers = [...customers];
      setFilteredCustomers([]);
    } else {
      filterCustomers = customers.filter((obj) => {
        return (
          obj.label &&
          obj.label.toLowerCase().startsWith(event.query.toLowerCase())
        );
      });
      setFilteredCustomers(filterCustomers);
    }
  };

  const renderSuccessPopUp = () => {
    return (
      <Div display="flex" flexDirection="column" alignItems="center">
        <Div mt={3} mb={4}>
          <Span>{messages.success_order_created}</Span>
        </Div>
        <PrimaryButton
          rounded
          semibold
          width={[1, "47%"]}
          mb={[30, 0]}
          label={messages.label_done}
          onClick={onCancel}
        />
      </Div>
    );
  };

  const getPayload = (values) => {
    return values.services
      .filter((val) => val.checked === true)
      .map((obj) => {
        let { personal_number: number = "", name = "" } = values;
        number = number.replace("-", "");
        number = Number(number);
        return {
          service_id: obj.id,
          personal_number: number.toString(),
          person_name: name,
        };
      });
  };

  const handleCreateOrder = async (values) => {
    try {
      setError(false);
      setIsFetching(true);
      const _ssnNumber = getPayload(values)[0].personal_number || "";
      await personInformationSearchService([_ssnNumber]).then((res) => {
        if (res.data.length) {
          const { data: responseData = [] } = res;
          fetchResults(
            getPayload({ ...values, name: responseData[0].name }),
            adminUserProps(values)
          ).then(() => {
            setOrderCreated(true);
          });
        } else {
          setIsFetching(false);
          setError(true);
        }
      });
    } catch (e) {
      throw new Error(e);
    }
  };

  const handeOnChange = (e, values, setFieldValue) => {
    const { value } = e.target;
    const services = values.services.map((obj) => {
      const { id = "" } = obj;
      if (id === value) {
        const isChecked = obj.checked ? !obj.checked : true;
        return { ...obj, checked: isChecked };
      }
      return { ...obj };
    });
    setFieldValue("services", services);
  };

  const handleBlurCustomer = (onBlur, values, setFieldValue) => async (e) => {
    onBlur(e);
    const { customer: { value = "" } = {} } = values;
    setShowSelectUser(value);
    if (value) {
      const response = await usersService(`customer_id=${value}`);
      let { data: { data: users = [] } = {} } = response;
      const { id: userId = "" } = users[0] || {};
      setFieldValue(SUB_USER, userId);
      users = users.map((obj) => {
        const { name = "", id = "" } = obj;
        return { label: `${name} - #${id}`, value: id };
      });
      setUserData(users);
    }
  };

  const renderForm = () => (
    <Formik
      initialValues={{
        customer: "",
        subUser: "",
        personal_number: "",
        services: availableServices,
      }}
      validationSchema={ValidationSchema}
      onSubmit={handleCreateOrder}
      onReset={onCancel}
    >
      {(formikProps) => {
        const {
          values,
          setFieldValue,
          handleSubmit,
          handleReset,
          isValid,
          touched,
          handleBlur,
          handleChange,
        } = formikProps;
        return (
          <Form>
            <Div
              display="flex"
              flexDirection="column"
              justifyContent="center"
              textAlign="flex-start"
            >
              {isFetching ? (
                <h1>
                  {[...Array(9)].map((index) => {
                    return (
                      <Skeleton width={[1, 1, 1]} key={index} p={2} mb={4} />
                    );
                  })}
                </h1>
              ) : (
                <>
                  <TextLargeSemiBoldWeight mt={2}>
                    {messages.title_customer}
                  </TextLargeSemiBoldWeight>
                  <AutoComplete
                    value={values.customer}
                    field="label"
                    display="grid"
                    placeholder={`${messages.search_text}...`}
                    curved
                    my={3}
                    delay={2000}
                    name={CUSTOMER}
                    width={"100% !important"}
                    completeMethod={searchCustomer}
                    suggestions={filteredCustomers}
                    onChange={handleChange}
                    type="search"
                    onBlur={handleBlurCustomer(
                      handleBlur,
                      values,
                      setFieldValue
                    )}
                  />
                  <TextLargeSemiBoldWeight mt={2}>
                    {messages.label_user}
                  </TextLargeSemiBoldWeight>
                  <Dropdown
                    placeholder={messages.placeholder_choose}
                    value={values.subUser}
                    name={SUB_USER}
                    onChange={handleChange}
                    options={users}
                    display="flex"
                    my={3}
                    onBlur={handleBlur}
                    disabled={!(showSelectUser && values.customer)}
                  />
                  <TextLargeSemiBoldWeight mt={2}>
                    {messages.title_object_personal_number}
                  </TextLargeSemiBoldWeight>
                  <InputText
                    curved
                    mt={0}
                    placeholder={messages.placeholder_personal_number}
                    value={values.personal_number}
                    name={PERSONAL_NUMBER}
                    formikProps={{
                      ...formikProps,
                      handleChange: (e) => {
                        handleChange(e);
                        setError(false);
                      },
                    }}
                    labelAlignment="left"
                    maxLength={13}
                    onBlur={handleBlur}
                  />
                  {error && (
                    <Div pb={1} pt={3} m={"left"}>
                      <Error>{messages.invalid_personal_numbers}error</Error>
                    </Div>
                  )}
                  <TextLargeSemiBoldWeight mt={2}>
                    {messages.label_services}
                  </TextLargeSemiBoldWeight>
                  {values.services.map((value, index) => (
                    <Div mt={3} key={index}>
                      <Checkbox
                        inputId={index}
                        input
                        name={value.id}
                        onChange={(e) =>
                          handeOnChange(e, values, setFieldValue)
                        }
                        value={value.id}
                        checked={value.checked}
                      />
                      <Label htmlFor={index} ml={10}>
                        <TextLargeSemiBoldWeight mt={2}>
                          {value.name}
                        </TextLargeSemiBoldWeight>
                      </Label>
                    </Div>
                  ))}

                  <Div
                    display="flex"
                    width={1}
                    mt={4}
                    px={[0, 40]}
                    flexDirection={["column", "row-reverse"]}
                    justifyContent="space-between"
                  >
                    <PrimaryButton
                      width={[1, "47%"]}
                      mb={[30, 0]}
                      label={messages.label_create}
                      onClick={handleSubmit}
                      disabled={!(isValid && Object.keys(touched).length > 0)}
                    />
                    <PrimaryButtonOutlined
                      rounded
                      semibold
                      width={[1, "47%"]}
                      label={messages.label_cancel}
                      onClick={handleReset}
                    />
                  </Div>
                </>
              )}
            </Div>
          </Form>
        );
      }}
    </Formik>
  );

  const dialogHeader = () => (
    <Div
      width={1}
      lineHeight={"27px"}
      my={2}
      display="flex"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
    >
      <H3>
        {orderCreated ? messages.label_done : messages.label_create_new_order}
      </H3>
      {!orderCreated && (
        <Text pt={30} pb={3}>
          {messages.label_create_order_description}
        </Text>
      )}
    </Div>
  );

  return (
    <Dialog
      header={dialogHeader}
      visible="displayBasic"
      draggable={false}
      onHide={onCancel}
      width={[1, 500]}
      m={[3, "auto"]}
    >
      {orderCreated ? renderSuccessPopUp() : renderForm()}
    </Dialog>
  );
};

Create.propTypes = {
  onCancel: PropTypes.func,
  onCreate: PropTypes.func,
  availableServices: PropTypes.array,
  availableCustomers: PropTypes.array,
};

export default Create;
