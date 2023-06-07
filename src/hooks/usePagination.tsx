import { RxDotsHorizontal } from "react-icons/rx";
import { useMemo } from "react";

type Props = {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  siblingCount: number;
};

const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: Props) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, RxDotsHorizontal, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, RxDotsHorizontal, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [
        firstPageIndex,
        RxDotsHorizontal,
        ...middleRange,
        RxDotsHorizontal,
        lastPageIndex,
      ];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange || [];
};

// function Pagination({
//   totalCount,
//   currentPage,
//   pageSize,
//   onPageChange,
//   siblingCount,
// }: Props) {
//   return (
//     <Wrapper>
//       <button className="pageButton prevButton">
//         <GrPrevious color="#dae6f3" size="11px" />
//       </button>
//       <button className="pageButton">1</button>
//       <button className="pageButton">2</button>
//       <button className="pageButton">3</button>
//       <button className="pageButton">4</button>
//       <button className="pageButton">5</button>
//       <button className="pageButton">...</button>
//       <button className="pageButton">12</button>
//       <button className="pageButton">
//         <GrNext color="#dae6f3" size="11px" />
//       </button>
//     </Wrapper>
//   );
// }

// export default Pagination;
