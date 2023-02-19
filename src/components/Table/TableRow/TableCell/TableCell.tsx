import React from "react";
import styles from "./tablecell.sass";
import classNames from "classnames";

export interface ITableCell {
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  type?: string;
  handleKeyDown?: (arg: React.KeyboardEvent<HTMLInputElement>) => void;
  isEditing?: boolean;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TableCell({
  value,
  setValue,
  type = "number",
  handleKeyDown,
  isEditing,
}: ITableCell) {
  const inputClasses = classNames(styles["input"], {
    [styles["inputReadonly"]]: !isEditing,
  });

  return (
    <td>
      <input
        readOnly={!isEditing}
        type={type}
        className={inputClasses}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={handleKeyDown ? (e) => handleKeyDown(e) : () => {}}
      />
    </td>
  );
}
