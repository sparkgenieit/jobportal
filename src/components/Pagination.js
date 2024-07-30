import { useEffect } from "react";
import { itemsPerPage } from "../helpers/constants"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Pagination({ totalCount, onPageClick, currentPage, pageNumberToShow }) {
    useEffect(() => {

    }, [totalCount])

    let total = []
    new Array(Math.ceil(totalCount / itemsPerPage)).fill(1).forEach((arr, index) => total.push({ number: index + 1 }))

    let showingPages = []
    total.map(page => {
        if (page.number <= currentPage + pageNumberToShow && page.number >= currentPage - pageNumberToShow || page.number === currentPage) {
            showingPages.push(page)
        }

    })

    const NextPreviousButton = (name) => {
        if (name === "next") {
            onPageClick(currentPage + 1)
        }
        if (name === "previous") {
            onPageClick(currentPage - 1)
        }
    }

    return <div className='d-flex justify-content-center align-items-center mt-3 gap-3 '>
        <div className="text-center">
            {total && total.length > 1 && currentPage !== 1 && <button type="button" onClick={() => NextPreviousButton("previous")} className="btn btn-xs rounded"><IoIosArrowBack size={"20px"} /> </button>}
        </div>
        <div className="d-flex rounded  justify-content-center gap-3">
            {total && showingPages.length > 1 && showingPages.map((page, index) => {
                return <div>
                    <button type='button' key={index} onClick={() => { onPageClick(page.number) }} className={`btn btn-xs rounded-circle ${currentPage === page.number ? "btn-dark" : "btn-outline-dark"} `}>{page.number}</button>
                </div>
            })}
        </div>
        <div className=" text-center">
            {total && total.length > 1 && currentPage !== total.length && <button type="button" onClick={() => NextPreviousButton("next")} className="btn btn-xs rounded"><IoIosArrowForward size={"20px"} /></button>}
        </div>
    </div>

}

export default Pagination;