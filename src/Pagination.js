import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ numPages, setCurrentPage, pageNumber, flag }) => {
  const pageNumbers = [...Array(numPages + 1).keys()].slice(1);

  return (
    <nav id="page-list">
      <ul id="pages">
        {pageNumbers.map((pgNumber) => {
          return (
            <li key={pgNumber} className={pageNumber === pgNumber ? 'pageSelected' : ''}>
              <Link
                onClick={() => setCurrentPage(pgNumber)}
                to={flag === 'books'  ? `/${flag}/page/${pgNumber}` : `/${flag}/page/${pgNumber}`}
              >
                {pgNumber}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
