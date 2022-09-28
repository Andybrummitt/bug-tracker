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
    <nav aria-label="Page navigation example">
      <ul className={`pagination ${styles.ul}`}>
        <li className="page-item" onClick={() => setPrevPage(currentPage)}>
          <a className="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        {pageNumberArray.map((pageNumber) => (
          <li
            key={uuid()}
            className={
              pageNumber === currentPage ? "page-item active" : "page-item"
            }
          >
            <p className="page-link" onClick={() => setCurrentPage(pageNumber)}>
              {pageNumber}
            </p>
          </li>
        ))}
        <li className="page-item" onClick={() => setNextPage(currentPage)}>
          <a className="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default TablePaginationNav;
