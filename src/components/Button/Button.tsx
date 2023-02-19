import React from "react";
import { Branch } from "../Branch";
import styles from "./button.sass";

interface IButton {
  onClick: () => void;
  text?: string;
  img?: string | JSX.Element;
  disabled?: boolean;
}

export const Button = ({ onClick, text, img, disabled }: IButton) => {
  return (
    <button disabled={disabled} className={styles.button} onClick={onClick}>
      {img}
      {text}
    </button>
  );
};
