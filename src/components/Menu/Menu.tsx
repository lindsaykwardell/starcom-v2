import React, { ReactNode } from "react";
import classes from "./Menu.module.css";

interface Props {
  children: ReactNode;
}

export default (props: Props) => (
  <div className={classes.menu}>{props.children}</div>
);
