import React, { ReactNode } from "react";
import styles from "./main.sass";

export function Main(props: { children: ReactNode }) {
  return <main className={styles.main}><div>{props.children}</div></main>;
}
