import { useState } from "react"
import { validateIsNotEmpty } from "../../helpers/functions/textFunctions"

const AdsForm = ({ initialValues, onFormValid }) => {
    const [adForm, setAdForm] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})

    const handleForm = (e) => {
        const name = e.target.name
        const value = e.target.value
        setAdForm({ ...adForm, [name]: value })
        setFormErrors({ ...formErrors, [name]: value.trim() ? null : "This field is required" })
    }

    const SubmitBtn = async (event) => {
        event.preventDefault()
        let isValid = true;

        let obj = {};

        Object.keys(adForm).forEach(key => {
            const value = adForm[key]
            if (!validateIsNotEmpty(value)) {
                isValid = false
                obj[key] = "This field is required"
            }
        })

        setFormErrors(obj)

        if (isValid) {
            onFormValid(adForm)
        }
    }

    return (
        <form onSubmit={SubmitBtn} className="d-flex mt-3 flex-column justify-content-md-center w-100">
            <div className="row">
                <div className="col-md-7">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Ad Title <span className="text-danger">*</span></label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" value={adForm?.title} name="title" onChange={handleForm} required />
                            {formErrors?.title && <div className=' small text-danger'>{formErrors?.title}</div>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-7">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Description<span className="text-danger">*</span></label>
                        <div className="col-sm-9">
                            <textarea className="form-control" value={adForm?.description} name="description" onChange={handleForm} required />
                            {formErrors?.description && <div className='small text-danger'>{formErrors?.description}</div>}
                        </div>

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-7">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Ad Type<span className="text-danger">*</span></label>
                        <div className="col-sm-9">
                            <select className="form-select" name="ad_type" value={adForm?.ad_type} onChange={handleForm}>
                                <option value="short">Short (min 600 pixels width)</option>
                                <option value="long">Long (min 600 pixels height)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-7">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                            Ad Webiste URL <span className="text-danger">*</span>
                            <br />
                            <small style={{ fontSize: "10px" }}>(URL of the website when the user click on the ad)</small>
                        </label>
                        <div className="col-sm-9">
                            <input type="url" className="form-control" value={adForm?.redirect_url} name="redirect_url" onChange={handleForm} required />
                            {formErrors?.redirect_url && <div className='small text-danger'>{formErrors?.redirect_url} </div>}
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className="col-md-7">
                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label">
                            Ad Image URL<span className="text-danger">*</span>
                            <br />
                            <small style={{ fontSize: "10px" }}>(URL of the image to be displayed on the ad)</small>
                        </label>
                        <div className="col-sm-9">
                            <input type="url" className="form-control" value={adForm?.ad_image_url} name="ad_image_url" onChange={handleForm} required />
                            {formErrors?.ad_image_url && <div className='small text-danger'>{formErrors?.ad_image_url} </div>}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='row'>
            <div className="col-md-7">
                <div className="form-group row">
                    <label className="col-sm-3  col-form-label pt-4">Page To Show<span className="text-danger">*</span></label>
                    <div className="col-sm-9 d-flex justify-content-between align-items-center">
                        <span><input type="checkbox" className="form-check-input mx-2" name='about' checked={pagetoshow.about} onChange={handleCheckboxChange} />About</span>

                        <span><input type="checkbox" className="form-check-input mx-2" name='home' checked={pagetoshow.home} onChange={handleCheckboxChange} />Home</span>

                        <span><input type="checkbox" className="form-check-input mx-2" name="jobs" checked={pagetoshow.jobs} onChange={handleCheckboxChange} />Jobs</span>
                    </div>
                </div>
            </div>
        </div>


        {error && <div className="text-danger">{error}</div>}

        <div className="col-md-7">
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Price<span className="text-danger">*</span></label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" value={price} onChange={(event) => FormHandle('price', event)} />
                    {errors.priceError && <div className='text-danger'>{pricemsg}</div>}
                </div>
            </div>
        </div>

        <div className="col-md-7">
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Number of Clicks<span className="text-danger">*</span></label>
                <div className="col-sm-9">
                    <input type="number" className="form-control" value={numberofclicks} onChange={(event) => FormHandle('numberofclicks', event)} />
                    {errors.numberError && <div className='text-danger'>Please enter number of clicks</div>}
                </div>
            </div>
        </div> */}

            <div className='form-group'>
                <div className='col-11 p-3 d-flex justify-content-end'>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </div>
            </div>
        </form>)
}

export default AdsForm;