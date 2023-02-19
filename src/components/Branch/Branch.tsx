import classNames from "classnames";
import React from "react";
import styles from "./branch.sass";

interface IBranch {
  counter: number;
  type: "vertical" | "horizontal";
}

export function Branch({ type, counter }: IBranch) {
  const classes = classNames({
    [styles["verticalBranch"]]: type === "vertical",
    [styles["horizontallBranch"]]: type === "horizontal",
  });

  return type === "vertical" ? (
    <span
      style={{
        height: `${counter * 79 - (counter * 10) / (counter - 0.2)}px`,
      }}
      className={classes}
    ></span>
  ) : (
    <span className={classes}></span>
  );
}
