import ReactPaginate from 'react-paginate';
import "./styles.css"; // You’ll style your pagination here

const Pagination = ({ itemsPerPage, pageCount, handlePageClick, setItemOffset, itemOffset }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next>"
      onPageChange={handlePageClick}
      pageRangeDisplayed={1}
      pageCount={pageCount}
      previousLabel="<Prev"
      renderOnZeroPageCount={null}
      containerClassName="paginationBtns"
      pageLinkClassName="page-num"
      previousLinkClassName="previousBtn"
      nextLinkClassName="nextBtn"
      activeLinkClassName="active"
      initialPage={Math.floor(itemOffset / itemsPerPage)}
    />
  );
};

export default Pagination;
