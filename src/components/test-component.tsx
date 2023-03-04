import { Button } from "@rneui/base";
import React, { Fragment } from "react";

import { TestComponent2 } from "./test-component-2";

export const TestComponent: React.FC = () => {
  return (
    <Fragment>
      <Button title="Hello, World!" />
      <TestComponent2 />
    </Fragment>
  );
};
