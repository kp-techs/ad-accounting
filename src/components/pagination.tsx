import styled from "styled-components";
import { GrPrevious, GrNext } from "react-icons/gr";
import { RxDotsHorizontal } from "react-icons/rx";
import { usePagination } from "../hooks/usePagination";
import { FC } from "react";

type Props = {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
};

const Pagination: FC<Props> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}) => {
  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <Wrapper>
      <button
        className="pageButton"
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        <GrPrevious color="#dae6f3" size="11px" />
      </button>
      {paginationRange.map((pageNumber) =>
        typeof pageNumber === "number" ? (
          <button
            className={`pageButton ${
              pageNumber === currentPage ? "active" : ""
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ) : (
          <div>
            <RxDotsHorizontal color="#dae6f3" size="15px" />
          </div>
        )
      )}
      <button
        className="pageButton"
        onClick={onNext}
        disabled={currentPage === lastPage}
      >
        <GrNext color="#dae6f3" size="11px" />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline-flex;
  gap: 5px;
  background: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.13);
  border-radius: 3px;
  padding: 5px;

  .pageButton {
    width: 25px;
    height: 25px;
    border-radius: 3px;
    border: 0px;
    background-color: transparent;
    //text
    font-family: "Inter";
    font-size: 16px;
    text-align: center;
    color: #637381;

    &:disabled {
      background-color: #bec1c449;
      cursor: not-allowed;
      &:hover {
        background-color: #bec1c449;
      }
    }

    &:hover {
      background-color: #dae6f3;
    }

    &:active {
      background-color: #83a3bb;
      color: #ffffff;
    }
    &.active {
      background-color: #085690;
      color: #ffffff;
    }

    img {
      width: 4px;
      height: 9px;
    }
  }
`;

export default Pagination;
