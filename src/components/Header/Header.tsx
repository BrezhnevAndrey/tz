import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./header.sass";
import Menu from "../../images/menu.svg?svgr";
import ArrowBack from "../../images/arrow_back.svg?svgr";

export function Header() {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <div className={styles.controles}>
        <button className={styles.button} onClick={() => navigate('/home')}>
          <Menu />
        </button>
        <button className={styles.button} onClick={() => navigate(-1)}>
          <ArrowBack />
        </button>
      </div>
      <div className={styles.links}>
        <NavLink to="/" className={styles.link}>
          Просмотр
        </NavLink>
        <NavLink to="/control" className={styles.link}>
          Управление
        </NavLink>
      </div>
    </header>
  );
}
