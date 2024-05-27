import { itemsPerPage } from "../helpers/constants"

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

    return <div className='d-flex mt-3  justify-content-center gap-3'>
        {total && total.length > 1 && currentPage !== 1 && <button type="button" onClick={() => NextPreviousButton("previous")} className="btn btn-xs btn-outline-primary">Previous</button>}
        {total && showingPages.length > 1 && showingPages.map((page, index) => {
            return <div>

                <button type='button' key={index} onClick={() => { onPageClick(page.number) }} className={`btn btn-xs ${currentPage === page.number ? "btn-primary" : "btn-outline-primary"} `}>{page.number}</button>

            </div>
        })

        }
        {total && total.length > 1 && currentPage !== total.length && <button type="button" onClick={() => NextPreviousButton("next")} className="btn btn-xs btn-outline-primary">Next</button>}


    </div>

}

export default Pagination;