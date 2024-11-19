import './pagination.css';

const Pagination = ({currentPage, totalPages, onPageChange}) => {
    const maxPageButtons = 7; // Max page buttons displayed at once
    const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    const pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
            <button
                key={i}
                onClick={() => onPageChange(i)}
                disabled={i === currentPage}
                className={i === currentPage ? 'active' : ''}
            >
                {i}
            </button>
        );
    }

    return (
        <div className="pagination">
            {currentPage > 1 && (
                <button onClick={() => onPageChange(1)}>&laquo; First</button>
            )}

            {currentPage > 1 && (
                <button onClick={() => onPageChange(currentPage - 1)}>‹ Prev</button>
            )}

            {startPage > 1 && <button onClick={() => onPageChange(1)}>1</button>}
            {startPage > 2 && <span>...</span>}

            {pageButtons}

            {endPage < totalPages - 1 && <span>...</span>}
            {endPage < totalPages && (
                <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
            )}

            {currentPage < totalPages && (
                <button onClick={() => onPageChange(currentPage + 1)}>Next ›</button>
            )}

            {currentPage < totalPages && (
                <button onClick={() => onPageChange(totalPages)}>Last &raquo;</button>
            )}
        </div>
    );
};

export default Pagination;
