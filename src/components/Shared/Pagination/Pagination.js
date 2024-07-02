import React from 'react'

const Pagination = ({ pageNumbers= [], handlePageChange }) => {
    return (
        <>
        {
            pageNumbers.map((number) => (
                <button key={number} onClick={() => handlePageChange(number)} className="pagination-button">
                    {number}
                </button>
            ))
        }
    </>
    )
}

export default Pagination