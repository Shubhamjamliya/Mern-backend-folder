const Pagination = ({ page, totalPages, setPage }) => (
  <div className="flex justify-center items-center mt-8 gap-4">
    <button
      onClick={() => setPage(page - 1)}
      disabled={page === 1}
      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
    >
      Prev
    </button>
    <span className="text-gray-600">Page {page} of {totalPages}</span>
    <button
      onClick={() => setPage(page + 1)}
      disabled={page === totalPages}
      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
);

export default Pagination;
