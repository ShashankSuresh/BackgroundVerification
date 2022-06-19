import React from "react";
import PropTypes from "prop-types";
import Card from "@components/Card";
import Skeleton from "@components/Skeleton";

export default {
  title: "components/Loaders",
};

export const DefaultLoader = () => <Skeleton width={[1 / 6]} mb={3}></Skeleton>;

export const CardLoader = ({ count }) => {
  count = 3;
  return (
    <Card p={4} width={[1, 1, 1 / 2]}>
      <Skeleton width={[1 / 6]} mb={4}></Skeleton>
      {[...Array(count)].map((value, index) => (
        <Skeleton key={index} width={[1]} mb={3}></Skeleton>
      ))}
    </Card>
  );
};

CardLoader.propTypes = {
  count: PropTypes.array,
};
