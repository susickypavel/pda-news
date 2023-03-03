import React, { Fragment } from "react";

import { Button } from "@rneui/base";
import { TestComponent2 } from "./test-component-2";

export const TestComponent: React.FC = () => {
  return (
    <Fragment>
      <Button>TestComponent</Button>
      <TestComponent2 />
    </Fragment>
  );
};
