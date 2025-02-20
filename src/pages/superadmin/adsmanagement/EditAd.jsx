import { useState } from "react";
import http from "../../../helpers/http";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import { tryCatch } from "../../../helpers/functions";
import { validateIsNotEmpty } from "../../../helpers/functions/textFunctions";

function EditAd({ ad, onSuccess }) {
    const initialValues = {
        title: ad?.title,
        description: ad?.description,
        ad_image_url: ad?.ad_image_url,
        ad_type: ad?.ad_type,
        redirect_url: ad?.redirect_url
    }

    const [adForm, setAdForm] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [formStatus, setFormStatus] = useState("idle")
    const message = useShowMessage()

    const handleForm = (e) => {
        const name = e.target.name
        const value = e.target.value
        setAdForm({ ...adForm, [name]: value })
        setFormErrors({ ...formErrors, [name]: value.trim() ? null : "This field is required" })
    }

    const SubmitBtn = async (event) => {
        event.preventDefault()
        setFormStatus("submitting")
        let isValid = true;

        let obj = {};

        Object.keys(adForm).forEach(key => {
            const value = adForm[key]
            if (!validateIsNotEmpty(value)) {
                alert("in error" + value + key)
                isValid = false
                obj[key] = "This field is required"
            }
        })

        setFormErrors(obj)

        if (isValid) {
            const { error } = await tryCatch(() => http.put(`/ads/update/${ad._id}`, adForm))

            setFormStatus("idle")

            if (error) {
                message({
                    status: "error",
                    error
                })
                return
            }
            onSuccess()
            message({
                status: "Success",
                message: "Ad Edited Successfully",
                path: "/superadmin/admin-ads"
            })
        }
    }
    return (
        <>
            <div class="container-fluid pt-4 ">
                <div className="bg-white">
                    <h3 className="fs-4 text-center fw-bold">Edit an Ad</h3>
                    <form onSubmit={SubmitBtn} className="d-flex mt-3 flex-column justify-content-md-center w-100">
                        <div class="row">
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label">Ad Title <span className="text-danger">*</span></label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" value={adForm?.title} name="title" onChange={handleForm} required />
                                    {formErrors?.title && <div className=' small text-danger'>{formErrors?.title}</div>}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label">Description<span className="text-danger">*</span></label>
                                <div class="col-sm-9">
                                    <textarea class="form-control" value={adForm?.description} name="description" onChange={handleForm} required />
                                    {formErrors?.description && <div className='small text-danger'>{formErrors?.description}</div>}
                                </div>

                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label">Ad Type<span className="text-danger">*</span></label>
                                <div class="col-sm-9">
                                    <select className="form-select" name="ad_type" value={adForm?.ad_type} onChange={handleForm}>
                                        <option value="short">Short (min 600 pixels width)</option>
                                        <option value="long">Long (min 600 pixels height)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label">Ad Webiste URL<span className="text-danger">*</span></label>
                                <div class="col-sm-9">
                                    <input type="url" class="form-control" value={adForm?.redirect_url} name="redirect_url" onChange={handleForm} required />
                                    {formErrors?.redirect_url && <div className='small text-danger'>{formErrors?.redirect_url} </div>}
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div class="form-group row">
                                <label class="col-sm-3  col-form-label">Ad Image URL<span className="text-danger">*</span></label>
                                <div class="col-sm-9">
                                    <input type="url" class="form-control" value={adForm?.ad_image_url} name="ad_image_url" onChange={handleForm} required />
                                    {formErrors?.ad_image_url && <div className='small text-danger'>{formErrors?.ad_image_url} </div>}
                                </div>
                            </div>
                        </div>
                        {/* <div className='row'>
                            <div class="col-md-7">
                                <div class="form-group row">
                                    <label class="col-sm-3  col-form-label pt-4">Page To Show<span className="text-danger">*</span></label>
                                    <div class="col-sm-9 d-flex justify-content-between align-items-center">
                                        <span><input type="checkbox" class="form-check-input mx-2" name='about' checked={pagetoshow.about} onChange={handleCheckboxChange} />About</span>

                                        <span><input type="checkbox" class="form-check-input mx-2" name='home' checked={pagetoshow.home} onChange={handleCheckboxChange} />Home</span>

                                        <span><input type="checkbox" class="form-check-input mx-2" name="jobs" checked={pagetoshow.jobs} onChange={handleCheckboxChange} />Jobs</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {error && <div className="text-danger">{error}</div>}

                        <div class="col-md-7">
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label">Price<span className="text-danger">*</span></label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" value={price} onChange={(event) => FormHandle('price', event)} />
                                    {errors.priceError && <div className='text-danger'>{pricemsg}</div>}
                                </div>
                            </div>
                        </div>

                        <div class="col-md-7">
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label">Number of Clicks<span className="text-danger">*</span></label>
                                <div class="col-sm-9">
                                    <input type="number" class="form-control" value={numberofclicks} onChange={(event) => FormHandle('numberofclicks', event)} />
                                    {errors.numberError && <div className='text-danger'>Please enter number of clicks</div>}
                                </div>
                            </div>
                        </div> */}


                        <div class="row">
                            <div class="form-group row">
                                <div className="col-sm-12 d-flex justify-content-end">
                                    <button
                                        type='submit'
                                        disabled={formStatus === "submitting"}
                                        className='btn btn-primary'
                                    >
                                        {formStatus === "submitting" ? "Updating" : "Save"}
                                    </button>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>

            </div>
        </>
    )
}
export default EditAd;