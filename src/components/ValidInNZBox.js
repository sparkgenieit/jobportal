function ValidInNZBox(props) {
 return <>
<label className="col-sm-12 col-form-label"><small>Valid in NZ?</small></label>

<select type="dropdown" className=" form-select form-control"   value={props.validInNZ} onChange={(event) => props.functionName("validInNZ", event.target.value, props.arrayName, props.index)} >
                            <option  value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
{/*
<input type="text" className="form-control" value={props.validInNZ} onChange={(event) => props.functionName("validInNZ", event.target.value, props.arrayName, props.index)} />
 */}
</>
  
}

export default ValidInNZBox; // Don’t forget to use export default!