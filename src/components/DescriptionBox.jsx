function DescriptionBox(props) {
    return <>
        <label className="col-sm-3 col-form-label">Description</label>
        <div className="col-sm-12">
            <textarea type="text" className="px-3 py-2 shadow-sm w-full" value={props.value} onChange={(event) => props.functionName("description", event.target.value, props.arrayName, props.index)} ></textarea>
        </div>
    </>
}

export default DescriptionBox; // Don’t forget to use export default!