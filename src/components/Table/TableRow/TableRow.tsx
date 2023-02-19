import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../Button";
import styles from "./tablerow.sass";
import Sheet from "../../../images/sheet.svg?svgr";
import Basket from "../../../images/basket.svg?svgr";
import { ITableCell, TableCell } from "./TableCell";
import {
  createRow,
  deleteRow,
  emptyElement,
  IDataElement,
  IDataState,
  updateRow,
} from "../../../slice/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { Branch } from "../../Branch";

interface ITableRow {
  el: IDataElement;
  isEditingProp?: boolean;
  setIsEditingProp?: (arg: boolean) => void;
  lvl?: number;
}

export function TableRow({
  el,
  isEditingProp,
  setIsEditingProp,
  lvl,
}: ITableRow) {
  const dispatch = useDispatch();
  const btnsRef = useRef<any>(null);

  const [isEditing, setIsEditing] = useState(isEditingProp || false);
  const [rowName, setRowName] = useState(el.rowName);
  const [salary, setSalary] = useState(el.salary);
  const [equipmentCosts, setEquipmentCosts] = useState(el.equipmentCosts);
  const [overheads, setOverheads] = useState(el.overheads);
  const [estimatedProfit, setEstimatedProfit] = useState(el.estimatedProfit);

  const status = useSelector<IDataState, string | null>(
    (state) => state.data.status
  );

  const newElement: IDataElement = {
    equipmentCosts: Number(equipmentCosts),
    estimatedProfit: Number(estimatedProfit),
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    overheads: Number(overheads),
    parentId: null,
    rowName: rowName,
    salary: Number(salary),
    supportCosts: 0,
  };

  const elements: Array<ITableCell> = [
    { value: rowName, setValue: setRowName, type: "text" },
    { value: salary, setValue: setSalary },
    { value: equipmentCosts, setValue: setEquipmentCosts },
    { value: overheads, setValue: setOverheads },
    { value: estimatedProfit, setValue: setEstimatedProfit },
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && rowName.trim()) {
      el.id
        ? dispatch(updateRow({ id: el.id, element: newElement }))
        : dispatch(createRow(newElement));
      setIsEditing(false);
    }
  };

  const handleDoubleClick = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    !btnsRef?.current.contains(e.target) && !isEditing && setIsEditing(true);
  };

  const handleCreateBtnClick = () => {
    setIsEditingProp && setIsEditingProp(true);
    const copyElement = { ...emptyElement };
    if (el.id) copyElement.parentId = el.id;
    dispatch(createRow(copyElement));
  };

  let counter = 0;
  const quantifyChildren = (
    data: IDataElement,
    index: number,
    mainData: IDataElement
  ) => {
    if (
      !data.child ||
      data.child.length === 0 ||
      (mainData.child && data === mainData.child[mainData.child.length - 1])
    )
      return;
    data.child.map((el, index) => {
      counter += 1;
      if (el.child && el.child?.length > 0)
        quantifyChildren(el, index, mainData);
    });
  };
  quantifyChildren(el, 0, el);

  useEffect(() => {
    if (!rowName.trim()) setIsEditing(true);
  }, [rowName]);

  return (
    <tr onDoubleClick={(e) => handleDoubleClick(e)}>
      <td>
        <span
          className={styles.btnContainer}
          style={{ marginLeft: `${lvl ? lvl * 20 : 0}px` }}
        >
          {lvl && <Branch type="horizontal" counter={lvl} />}
          {counter ? <Branch type="vertical" counter={counter} /> : null}
          <span className={styles.btnWrapper} ref={btnsRef}>
            <Button
              img={<Sheet />}
              onClick={handleCreateBtnClick}
              disabled={status === "pending"}
            />

            {!isEditing && (
              <span className={styles.invisibleWrapper}>
                <Button
                  img={<Basket />}
                  onClick={() => dispatch(deleteRow(el.id))}
                  disabled={status === "pending"}
                />
              </span>
            )}
          </span>
        </span>
      </td>
      {elements.map((element, index) => (
        <TableCell
          key={index}
          value={element.value}
          setValue={element.setValue}
          type={element.type}
          handleKeyDown={handleKeyDown}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      ))}
    </tr>
  );
}
