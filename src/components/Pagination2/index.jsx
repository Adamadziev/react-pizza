import React from "react";

import styles from "./Pagination2.module.scss";

// Мы принимаем:
// Общее кол-во пицц
// Кол-во пицц, что мы хотим вывести на странице
function Pagination2({ pageCount, changePage, currentPage }) {
  const [selected, setSelected] = React.useState(1);

  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  const handleClick = (num) => {
    setSelected(num);
    changePage(num);
  };

  const nextPage = () => {
    if (currentPage < pages.length) {
      setSelected((prev) => prev + 1);
      changePage(selected + 1);
    }
  };

  const prevPage = () => {
    if (currentPage <= pages.length && currentPage !== 1) {
      setSelected((prev) => prev - 1);
      changePage(selected - 1);
    }
  };

  return (
    <ul className={styles.root}>
      <li onClick={prevPage}>{"<"}</li>
      {pages.map((num) => {
        return (
          <li
            key={num}
            onClick={() => handleClick(num)}
            className={selected === num ? styles.selected : ""}
          >
            {num}
          </li>
        );
      })}
      <li onClick={nextPage}>{">"}</li>
    </ul>
  );
}

export default Pagination2;
