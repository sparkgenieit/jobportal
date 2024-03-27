import Header from "../../layouts/superadmin/Header";
import Footer from "../../layouts/superadmin/Footer";
import Sidebar from "../../layouts/superadmin/Sidebar";
import { useState } from "react";
import { FallingLines } from "react-loader-spinner";


function AddForms() {

    const [addtitle, setAddTitle] = useState('')
    const [description, setDescription] = useState('')
    const [position, setPosition] = useState('')
    const [size, setSize] = useState('')
    const [pagetoshow, setPageTOShow] = useState({
        about: false,
        home: false,
        jobs: false
    })
    const [price, setPrice] = useState('')
    const [numberofclicks, setNumberOfClicks] = useState('')


    const [addtitlemsg, setAddTitleMsg] = useState('Please Enter Title');
    const [positionmsg, setPositionMsg] = useState('Please Enter Position');
    const [descriptionmsg, setDescriptionMsg] = useState('Please Enter Description');
    const [pricemsg, setPriceMsg] = useState("Please Enter Price")


    const [error, setError] = useState('')
    const [errors, setErrors] = useState({
        addtitleError: false,
        descriptionError: false,
        positionError: false,
        sizeError: false,
        // pageError: false,
        priceError: false,
        numberError: false

    })


    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setPageTOShow({ ...pagetoshow, [name]: checked })
    }



    const FormHandle = (name, event) => {
        if (name == 'addtitle') {
            setAddTitle(event.target.value);
            if (event.target.value == '') {
                setErrors({ ...errors, addtitleError: true })

            }
            else {
                setErrors({ ...errors, addtitleError: false })
            }

        }

        if (name == 'description') {
            setDescription(event.target.value);
            if (event.target.value == '') {
                setErrors({ ...errors, descriptionError: true })

            }
            else {
                setErrors({ ...errors, descriptionError: false })
            }

        }

        if (name == 'position') {
            setPosition(event.target.value);
            if (event.target.value == '') {
                setErrors({ ...errors, positionError: true })

            }
            else {
                setErrors({ ...errors, positionError: false })
            }

        }

        if (name == 'size') {
            setSize(event.target.value);
            if (event.target.value == '') {
                setErrors({ ...errors, sizeError: true })

            }
            else {
                setErrors({ ...errors, sizeError: false })
            }

        }

        if (name == 'pagetoshow') {

            setPageTOShow(event.target.value);
            if (event.target.value == '') {
                setErrors({ ...errors, pageError: true })

            }
            else {
                setErrors({ ...errors, pageError: false })
            }

        }

        if (name == 'price') {
            setPrice(event.target.value);
            if (event.target.value == '') {
                setErrors({ ...errors, priceError: true })

            }
            else {
                setErrors({ ...errors, priceError: false })
            }

        }

        if (name == 'numberofclicks') {
            setNumberOfClicks(event.target.value);
            if (event.target.value == '') {
                setErrors({ ...errors, numberError: true })

            }
            else {
                setErrors({ ...errors, numberError: false })
            }

        }
    }


    const SubmitBtn = (event) => {
        const checkedValues = Object.values(pagetoshow)
        if (!checkedValues.includes(true)) {
            setError("Please Select One")
        }
        else {
            setError('')
        }
        let obj = {};

        if (addtitle == '') {
            obj = { ...obj, addtitleError: true };
            setAddTitleMsg('Please Enter Title');

        } else if (/^[a-z]{2,}$/gi.test(addtitle) == false) {

            obj = { ...obj, addtitleError: true };
            setAddTitleMsg('Not Proper Title');

        }
        else {

            obj = { ...obj, addtitleError: false };

        }

        if (description == '') {
            obj = { ...obj, descriptionError: true };
            setDescriptionMsg('Please Enter Description');

        } else if (/^\w{2,}$/gi.test(description) == false) {

            obj = { ...obj, descriptionError: true };
            setDescriptionMsg('Not Proper Description');

        }
        else {

            obj = { ...obj, descriptionError: false };

        }

        if (position == '') {

            obj = { ...obj, positionError: true };
            setPositionMsg('Please Enter position');

        } else if (/^[a-z]{2,}$/gi.test(position) == false) {

            obj = { ...obj, positionError: true };
            setPositionMsg('Not Proper position');

        }
        else {

            obj = { ...obj, positionError: false };

        }

        if (size == '') {

            obj = { ...obj, sizeError: true };
        }
        else {

            obj = { ...obj, sizeError: false };

        }

        if (pagetoshow == '') {


            obj = { ...obj, pageError: true };
        }
        else {

            obj = { ...obj, pageError: false };

        }

        if (price == '') {

            obj = { ...obj, priceError: true };
            setPriceMsg("Please Enter Price")
        }
        else if (/^[0-9]{0,}$/gi.test(price) == false) {
            obj = { ...obj, priceError: true };
            setPriceMsg("Not a Proper Price")

        }
        else {

            obj = { ...obj, priceError: false };

        }

        if (numberofclicks == '') {

            obj = { ...obj, numberError: true };
        }
        else {

            obj = { ...obj, numberError: false };

        }
        setErrors(obj)

    }



    return (
        <>

            <div className="container-scroller">
                <Header />

                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div class="main-panel">
                        <div class="content-wrapper">
                            <div class="page-header">
                                <h3 class="page-title"> Post An Add</h3>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="Table">Super Admin</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Ads</li>
                                    </ol>
                                </nav>
                            </div>
                            <div class="card-body bg-white p-5 ">
                                <form>
                                    <div class="row">
                                        <div class="col-md-7">
                                            <div class="form-group row">
                                                <label class="col-sm-3 col-form-label">Add Title <span style={{ color: "red" }}>*</span></label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control" value={addtitle} onChange={(event) => FormHandle('addtitle', event)} />
                                                    {errors.addtitleError && <div className='text-danger'>{addtitlemsg}</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-7">
                                            <div class="form-group row">
                                                <label class="col-sm-3 col-form-label">Description<span style={{ color: "red" }}>*</span></label>
                                                <div class="col-sm-9">
                                                    <textarea class="form-control" value={description} onChange={(event) => FormHandle('description', event)}></textarea>
                                                    {errors.descriptionError && <div className='text-danger'>{descriptionmsg}</div>}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-7">
                                            <div class="form-group row">
                                                <label class="col-sm-3 col-form-label">Position<span style={{ color: "red" }}>*</span></label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control" value={position} onChange={(event) => FormHandle('position', event)} />
                                                    {errors.positionError && <div className='text-danger'>{positionmsg} </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div class="col-md-7">
                                            <div class="form-group row">
                                                <label class="col-sm-3  col-form-label">Size<span style={{ color: "red" }}>*</span></label>
                                                <div class="col-sm-9">
                                                    <input type="number" class="form-control" value={size} onChange={(event) => FormHandle('size', event)} />
                                                    {errors.sizeError && <div className='text-danger'>Please enter size </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div class="col-md-7">
                                            <div class="form-group row">
                                                <label class="col-sm-3  col-form-label pt-4">Page To Show</label>
                                                <div class="col-sm-9 d-flex justify-content-between align-items-center">


                                                    <span><input type="checkbox" class="form-check-input mx-2" name='about' checked={pagetoshow.about} onChange={handleCheckboxChange} />About</span>



                                                    <span><input type="checkbox" class="form-check-input mx-2" name='home' checked={pagetoshow.home} onChange={handleCheckboxChange} />Home</span>



                                                    <span><input type="checkbox" class="form-check-input mx-2" name="jobs" checked={pagetoshow.jobs} onChange={handleCheckboxChange} />Jobs</span>


                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    {error && <div style={{ color: "red", paddingLeft: "125px" }}>{error}</div>}

                                    <div class="col-md-7">
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">Price<span style={{ color: "red" }}>*</span></label>
                                            <div class="col-sm-9">
                                                <input type="text" class="form-control" value={price} onChange={(event) => FormHandle('price', event)} />
                                                {errors.priceError && <div className='text-danger'>{pricemsg}</div>}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-7">
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">NumberOfClicks<span style={{ color: "red" }}>*</span></label>
                                            <div class="col-sm-9">
                                                <input type="number" class="form-control" value={numberofclicks} onChange={(event) => FormHandle('numberofclicks', event)} />
                                                {errors.numberError && <div className='text-danger'>Please enter number of clicks</div>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <div className='col-11 p-3'>
                                            <button type='button' className='btn btn-primary float-end' onClick={() => SubmitBtn()}>Save</button>

                                        </div>

                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )





}
export default AddForms;