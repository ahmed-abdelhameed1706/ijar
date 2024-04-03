/* eslint-disable react/prop-types */
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Pagenation = ({ page, setPage, number }) => {
  return (
    <div className="py-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                setPage(page - 1);
              }}
              disabled={page === 0}
            />
          </PaginationItem>
          <PaginationItem className={page - 1 <= 0 ? "hidden" : ""}>
            <PaginationEllipsis />
          </PaginationItem>
          <>
            {Array.from({ length: number }).map((_, index) => (
              <PaginationItem
                key={index}
                className={
                  (index > page && index - page > 1) ||
                  (index < page && page - index > 1)
                    ? "hidden"
                    : ""
                }
              >
                <PaginationLink
                  onClick={() => {
                    setPage(index);
                  }}
                  isActive={page === index ? true : false}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </>
          <PaginationItem className={page + 2 >= number ? "hidden" : ""}>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              disabled={page === number - 1 || number === 0}
              onClick={() => {
                setPage(page + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Pagenation;
