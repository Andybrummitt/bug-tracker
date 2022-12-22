import React from "react";
import { v4 as uuid } from "uuid";
import styles from "./tablePaginationNav.module.scss";

const TablePaginationNav = ({
  pageNumberArray,
  currentPage,
  setCurrentPage,
}) => {
  const setNextPage = (currentPage) => {
    const lastPage = pageNumberArray[pageNumberArray.length - 1];
    if (currentPage !== lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const setPrevPage = (currentPage) => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.navContainer}>
    <nav aria-label="Page navigation">
      <ul className={`pagination ${styles.ul}`}>
        <li className="page-item" onClick={() => setPrevPage(currentPage)}>
          <a aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span>Prev</span>
          </a>
        </li>
        {pageNumberArray.map((pageNumber) => (
          <li
            key={uuid()}
            className={
              pageNumber === currentPage ? "active-page" : ""
            }
          >
            <p onClick={() => setCurrentPage(pageNumber)}>
              {pageNumber}
            </p>
          </li>
        ))}
        <li onClick={() => setNextPage(currentPage)}>
          <a aria-label="Next">
            <span>Next</span>
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default TablePaginationNav;
