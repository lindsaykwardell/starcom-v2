import React, { ReactNode } from "react";
import { Col, Button } from "reactstrap";

export default ({
  color,
  className,
  onClick,
  children
}: {
  color: string;
  className: string;
  onClick: () => void;
  children: ReactNode;
}) => {
  return (
    <Col>
      <Button color={color} className={className} onClick={onClick}>
        {children}
      </Button>
    </Col>
  );
};
