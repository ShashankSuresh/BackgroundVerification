import React from "react";
import PropTypes from "prop-types";
import Div from "@components/Div";
import Card from "@components/Card";
import Skeleton from "@components/Skeleton";

const SearchResultsLoader = () => {
  return (
    <Card mr={[0, 4]} mb={[4, 3]} width={[1, 1, 1 / 2]} p={3} height="180px">
      {[...Array(4)].map((value, index) => (
        <Skeleton key={index} width={[1]} mb={3} />
      ))}
    </Card>
  );
};

export const SinglePINLoader = (props) => {
  return (
    <>
      <Skeleton width={[1 / 6]} mb={4} p={3} />
      <Skeleton width={[1 / 2]} my={4} p={4} />
      <Skeleton width={[1, 1, 1 / 5]} p={3} my={4} />
      <Skeleton width={[1, 1, 1 / 5]} p={3} mt={5} mb={3} />
      <Skeleton width={[1, 1, 1 / 5]} p={2} mb={4} />
      {props.count.map((value, index) => (
        <Div key={index} display={["block", "block", "flex"]}>
          <SearchResultsLoader />
          <SearchResultsLoader />
        </Div>
      ))}
    </>
  );
};

export const MultiPINLoader = (props) => {
  return (
    <>
      <Skeleton width={[1 / 2]} my={4} />
      <Div display="flex" mb={4}>
        <Skeleton width={[1 / 2]} p={5} mr={4} />
        <Skeleton width={[1 / 2]} p={5} />
      </Div>
      <Skeleton width={[1 / 2, 1 / 2, 1 / 5]} p={3} />
      <Skeleton width={[1 / 2, 1 / 2, 1 / 4]} my={4} />
      <Skeleton width={[1, 1, 1 / 5]} p={2} mb={4} />
      {props.count.map((value, index) => (
        <Div key={index} display={["block", "block", "flex"]}>
          <SearchResultsLoader />
          <SearchResultsLoader />
        </Div>
      ))}
    </>
  );
};

SinglePINLoader.propTypes = {
  count: PropTypes.number,
};

MultiPINLoader.propTypes = {
  count: PropTypes.number,
};
