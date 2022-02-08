import React from "react";
import { useDispatch } from "react-redux";
import { filterActions } from "../../../store/filterSlice";
import styles from "./Pagination.module.scss";
import ArrowL from "../../../public/Arrow-left.svg";
import ArrowR from "../../../public/Arrow-right.svg";

const Pagination = (props) => {
  let page = props.page;
  let total_pages = props.total_pages
    ? props.total_pages < 500
      ? props.total_pages
      : 500
    : 0;
  let startOffset = page - 1;
  let endOffset = total_pages - page;
  let desktopArrayLength = 5;
  let desktopArray = [];
  let mobileArrayLength = 3;
  let mobileArray = [];

  const makePagesArray = (arrayLength) => {
    let resultArray = [];

    if (total_pages == 1) {
      return [1];
    }

    if (total_pages <= 5) {
      for (let i = 1; i <= total_pages; i++) {
        resultArray.push(i);
      }
      return resultArray;
    }

    if (startOffset <= (arrayLength - 1) / 2) {
      for (let i = 1; i <= arrayLength; i++) {
        resultArray.push(i);
      }
      return resultArray;
    }

    if (endOffset <= (arrayLength - 1) / 2) {
      for (let i = 0; i < arrayLength; i++) {
        resultArray.unshift(total_pages - i);
      }
      return resultArray;
    }

    if (arrayLength == desktopArrayLength) {
      return [page - 2, page - 1, page, page + 1, page + 2];
    }

    return [page - 1, page, page + 1];
  };

  desktopArray = makePagesArray(desktopArrayLength);
  mobileArray = makePagesArray(mobileArrayLength);

  const dispatch = useDispatch();

  const selectPage = (page) => {
    dispatch(filterActions.setSelectedPage(page));
    window.scrollTo(top);
  };

  const onSelectFirstPageHandler = () => selectPage(1);

  const onSelectLastPageHandler = () => selectPage(total_pages);

  const onSelectPreviousPageHandler = () => selectPage(page - 1);

  const onSelectNextPageHandler = () => selectPage(page + 1);

  const onSelectPageHandler = (event) => selectPage(event.target.innerText);

  const PaginationButtons = (props) => {
    let firstPageControl;
    let lastPageControl;
    let selectedArray;

    if (props.type == "desktop") {
      firstPageControl = 3;
      lastPageControl = 2;
      selectedArray = desktopArray;
    } else {
      firstPageControl = 2;
      lastPageControl = 1;
      selectedArray = mobileArray;
    }

    return (
      <ul className={props.className}>
        {page > firstPageControl && (
          <li onClick={onSelectFirstPageHandler}>Primeira</li>
        )}
        {page > 1 && (
          <li onClick={onSelectPreviousPageHandler}>
            <ArrowR />
          </li>
        )}
        {selectedArray.map((item, index) => {
          let selectedPageClasses;
          if (item == page) {
            selectedPageClasses = `${styles.active_page}`;
          }
          return (
            <li
              onClick={onSelectPageHandler}
              className={selectedPageClasses}
              key={index}
            >
              {item}
            </li>
          );
        })}
        {page < total_pages && (
          <li onClick={onSelectNextPageHandler}>
            <ArrowL />
          </li>
        )}
        {endOffset > lastPageControl && (
          <li onClick={onSelectLastPageHandler}>Última</li>
        )}
      </ul>
    );
  };

  return (
    <React.Fragment>
      <PaginationButtons type="desktop" className={styles.container_desktop} />
      <PaginationButtons type="mobile" className={styles.container_mobile} />
    </React.Fragment>
  );
};

export default Pagination;
