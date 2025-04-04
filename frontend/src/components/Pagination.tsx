import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPage : number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;

}

const Pagination = ({currentPage, totalPage, pageSize, onPageChange, onPageSizeChange}:PaginationProps) => {
    return ( 
        <div className="flex item-center justify-center mt-4">
            <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>Previous</button>

            {[...Array(totalPage)].map((_, index) => (
                <button key={index + 1} onClick={() => onPageChange(index + 1)}>
                    {index + 1}
                </button>
            ))}  

            <button disabled={currentPage === totalPage} onClick={() => onPageChange(currentPage + 1)}>Next</button>
            <br />
            <label>
                Results per page:
                <select value={pageSize} onChange={(p) => { onPageSizeChange(Number(p.target.value)); onPageChange(1) }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </label>

        </div>
       
        

    );
}

export default Pagination;