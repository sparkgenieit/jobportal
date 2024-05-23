function Pagination({ totalPages, onPageClick, currentPage, pageNumberToShow }) {

    let showingPages = []
    totalPages.map(page => {
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
        {totalPages && totalPages.length > 1 && currentPage !== 1 && <button type="button" onClick={() => NextPreviousButton("previous")} className="btn btn-xs btn-outline-primary">Previous</button>}
        {totalPages && showingPages.length > 1 && showingPages.map((page, index) => {
            return <div>

                <button type='button' key={index} onClick={() => { onPageClick(page.number) }} className={`btn btn-xs ${currentPage === page.number ? "btn-primary" : "btn-outline-primary"} `}>{page.number}</button>

            </div>
        })

        }
        {totalPages && totalPages.length > 1 && currentPage !== totalPages.length && <button type="button" onClick={() => NextPreviousButton("next")} className="btn btn-xs btn-outline-primary">Next</button>}


    </div>

}

export default Pagination;