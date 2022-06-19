import React from "react";
import CountTag from "@components/CountTag";

export default {
  title: "Components/CountTag",
};

const count = [1, 10, 22];

export const CountTagExample1 = () => <CountTag count={count[0]} />;

export const CountTagExample2 = () => <CountTag count={count[1]} />;

export const CountTagExample3 = () => <CountTag count={count[2]} />;
