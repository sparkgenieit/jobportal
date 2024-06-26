import { itemsPerPage } from "../helpers/constants"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Pagination({ totalCount, onPageClick, currentPage, pageNumberToShow }) {
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

    return <div className='row mt-3 '>
        <div className="col-3 text-center">
            {total && total.length > 1 && currentPage !== 1 && <button type="button" onClick={() => NextPreviousButton("previous")} className="btn btn-xs rounded-circle"><IoIosArrowBack size={"20px"} /> </button>}
        </div>
        <div className="col-6 d-flex justify-content-center gap-3">
            {total && showingPages.length > 1 && showingPages.map((page, index) => {
                return <div>
                    <button type='button' key={index} onClick={() => { onPageClick(page.number) }} className={`btn btn-xs rounded-circle ${currentPage === page.number ? "btn-dark" : "btn-outline-dark"} `}>{page.number}</button>
                </div>
            })}
        </div>
        <div className="col-3 text-center">
            {total && total.length > 1 && currentPage !== total.length && <button type="button" onClick={() => NextPreviousButton("next")} className="btn btn-xs rounded-circle"><IoIosArrowForward size={"20px"} /></button>}
        </div>
    </div>

}

export default Pagination;