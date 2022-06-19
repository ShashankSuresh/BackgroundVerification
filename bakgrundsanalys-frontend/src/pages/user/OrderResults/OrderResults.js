import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import Section from "@components/Section";
import Container from "@components/Container";
import Div from "@components/Div";
import Heading from "./Heading";
import PersonDetails from "./PersonDetails";
import Deviations from "./Deviations";
import RiskStatement from "./RiskStatement";
import Method from "./Method";
import Recommendatations from "./Recommendation";
import StatementScale from "./StatementScale";
import getResults from "@app/services/results/getResults";

const OrderResults = () => {
  const [userDetails, setUserDetails] = useState({});
  const { search = "" } = useLocation();
  const { id: reportId = "" } = queryString.parse(search);

  const getdetails = async () => {
    try {
      const response = await getResults(reportId);
      const { data: { data: userData = {} } = {} } = response;
      setUserDetails(userData);
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    getdetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Section>
      <Container>
        <Div>
          <Heading />
          <PersonDetails userDetails={userDetails} />
          <RiskStatement userDetails={userDetails} />
          <Deviations userDetails={userDetails} />
          <Method />
          <StatementScale />
          <Recommendatations />
        </Div>
      </Container>
    </Section>
  );
};

export default OrderResults;
