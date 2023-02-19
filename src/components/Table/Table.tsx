import React, { useState } from "react";
import { Button } from "../Button";
import styles from "./table.sass";
import Sheet from "../../images/sheet.svg?svgr";
import { TableRow } from "./TableRow";
import { useDispatch, useSelector } from "react-redux";
import {
  IDataState,
  IDataElement,
  emptyElement,
  createRow,
} from "../../slice/dataSlice";

export function Table() {
  const dispatch = useDispatch();

  const [isNewRow, setIsNewRow] = useState(false);

  const appData = useSelector<IDataState, Array<IDataElement>>(
    (state) => state.data.data
  );
  const status = useSelector<IDataState, string | null>(
    (state) => state.data.status
  );

  const recursive = (el: any, lvl: number) => {
    if (!el.child || el.child.length === 0) {
      return;
    }
    lvl += 1;
    return el.child.map((child: any, index: any) => {
      return [
        <TableRow
          key={child.id}
          el={child}
          isEditingProp={isNewRow ? true : false}
          setIsEditingProp={setIsNewRow}
          lvl={lvl}
        />,
        recursive(child, lvl),
      ];
    });
  };

  return (
    <table className={styles.table}>
      <caption className={styles.caption}>
        {!(status === "pending") ? "Строительно-монтажные работы" : "Pending"}
      </caption>
      <thead>
        <tr>
          <th>Уровень</th>
          <th>Наименование работ</th>
          <th>Основная з/п</th>
          <th>Оборудование</th>
          <th>Накладные расходы</th>
          <th>Сметная прибыль</th>
        </tr>
      </thead>
      <tbody>
        {appData?.map((el) => {
          return [
            <TableRow
              key={el.id}
              el={el}
              isEditingProp={isNewRow ? true : false}
              setIsEditingProp={setIsNewRow}
            />,
            recursive(el, 0),
          ];
        })}
        <tr>
          <td>
            <Button
              img={<Sheet />}
              onClick={() => {
                setIsNewRow(true);
                dispatch(createRow(emptyElement));
              }}
              disabled={status === "pending"}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
