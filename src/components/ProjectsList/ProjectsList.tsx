import classNames from "classnames";
import React, { useState } from "react";
import styles from "./projectslist.sass";
import Abbreviation from "../../images/abbreviation.svg?svgr";

const projects: Array<{ name: string }> = [
  { name: "По проекту" },
  { name: "Объекты" },
  { name: "РД" },
  { name: "МТО" },
  { name: "СМР" },
  { name: "График" },
  { name: "МиМ" },
  { name: "Рабоиче" },
];

export const ProjectsList = () => {
  const [isListOpen, setIsListOpen] = useState(false);

  const handleClick = () => {
    isListOpen ? setIsListOpen(false) : setIsListOpen(true);
  };

  const titleWrapperClasses = classNames(styles["titleWrapper"], {
    [styles["titleWrapper--open"]]: isListOpen,
  });

  const listClasses = classNames(styles["list"], {
    [styles["list--open"]]: isListOpen,
  });

  return (
    <div className={styles.listContainer}>
      <div className={titleWrapperClasses} onClick={handleClick}>
        <span className={styles.listTitle}>Название проекта</span>
        <span className={styles.listSubtitle}>Аббревиатура</span>
      </div>
      <ul className={listClasses}>
        {projects.map((project, index) => (
          // применил index как key потомучто в данном случае список статичен и это не имеет значения
          <li className={styles.item} key={index}>  
            <Abbreviation />
            <span>{project.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
