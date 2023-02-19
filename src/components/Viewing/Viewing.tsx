import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IDataState } from "../../slice/dataSlice";
import { ProjectsList } from "../ProjectsList";
import { Table } from "../Table";
import styles from "./viewing.sass";

export function Viewing() {
  const status = useSelector<IDataState, string | null>(
    (state) => state.data.status
  );
  const errorMassage = useSelector<IDataState, string | null>(
    (state) => state.data.error
  );
  // return (
  //   <div className={styles.container}>
  //     <ProjectsList />
  //     <div className={styles.tableWrapper}>
  //       <Table />
  //     </div>
  //   </div>
  // );
  return status === "rejected" ? (
    <h1>Ошибка</h1>
  ) : (
    <div className={styles.container}>
      <ProjectsList />
      <div className={styles.tableWrapper}>
        <Table />
      </div>
    </div>
  );
}
