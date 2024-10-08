import Header from "../../../layouts/superadmin/Header";
import Footer from "../../../layouts/superadmin/Footer";
import Sidebar from "../../../layouts/superadmin/Sidebar";
import { useState } from "react";
import { FallingLines } from "react-loader-spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import http from "../../../helpers/http";


function AddForms() {

    const [addtitle, setAddTitle] = useState('')
    const [description, setDescription] = useState('')
    const [position, setPosition] = useState('')
    const [size, setSize] = useState('')
    const [pagetoshow, setPageTOShow] = useState({
        "about": false,
        "home": false,
        "jobs": false
    })
    const [price, setPrice] = useState('')
    const [numberofclicks, setNumberOfClicks] = useState('')
    const [Msg, setMsg] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState(false)
    const [message, setMessage] = useState('')


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

    const navigate = useNavigate()


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
        let isValid = true;
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
            isValid = false;

        } else if (/^[a-z ]{2,}$/gi.test(addtitle.trim()) == false) {

            obj = { ...obj, addtitleError: true };
            setAddTitleMsg('Not Proper Title');
            isValid = false;

        }
        else {

            obj = { ...obj, addtitleError: false };

        }

        if (description == '') {
            obj = { ...obj, descriptionError: true };
            setDescriptionMsg('Please Enter Description');
            isValid = false;

        }
        else {

            obj = { ...obj, descriptionError: false };

        }

        if (position == '') {

            obj = { ...obj, positionError: true };
            setPositionMsg('Please Enter position');
            isValid = false;

        } else if (/^[a-z]{2,}$/gi.test(position) == false) {

            obj = { ...obj, positionError: true };
            setPositionMsg('Not Proper position');
            isValid = false;

        }
        else {

            obj = { ...obj, positionError: false };

        }

        if (size == '') {

            obj = { ...obj, sizeError: true };
            isValid = false;
        }
        else {

            obj = { ...obj, sizeError: false };

        }

        if (pagetoshow == '') {


            obj = { ...obj, pageError: true };
            isValid = false;
        }
        else {

            obj = { ...obj, pageError: false };

        }

        if (price == '') {

            obj = { ...obj, priceError: true };
            setPriceMsg("Please Enter Price")
            isValid = false;
        }
        else if (/^[0-9]{0,}$/gi.test(price) == false) {
            obj = { ...obj, priceError: true };
            setPriceMsg("Not a Proper Price")
            isValid = false;

        }
        else {

            obj = { ...obj, priceError: false };

        }

        if (numberofclicks == '') {

            obj = { ...obj, numberError: true };
            isValid = false;
        }
        else {

            obj = { ...obj, numberError: false };

        }
        setErrors(obj)

        let pages = "";
        for (const page in pagetoshow) {
            if (pagetoshow[page] === true) {
                pages += (page + " ")
            }
        }
        if (pages === "") {
            isValid = false
        }
        if (isValid) {

            const data = {
                title: addtitle.trim(),
                description: description,
                position: position,
                pages: pages,
                size: size,
                price: price,
                noOfClicks: numberofclicks

            }

            http.post("/ads/create", data)
                .then((res) => {
                    setMsg(true)
                    setMessage("Ad Posted Successfully")
                    setTimeout(() => {
                        navigate("/superadmin/Table")
                    }, 2000)
                }
                )
                .catch((err) => {

                    setErrorMsg(true)
                    setMessage(err.code)
                    setTimeout(() => {
                        setErrorMsg(false)
                    }, 5000)

                })


        }

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return (
        <>


            <div class="container-fluid">
                <div className="content-wrapper bg-white">
                    <div class="page-header">
                        <h3 class="page-title"> Post An Ad</h3>
                    </div>

                    <div class="card-body bg-white p-5 ">
                        {ErrorMsg && <div className='alert alert-danger' role="alert">
                            {message}
                        </div>}
                        {Msg && <div className='alert alert-success' role="alert">
                            {message}
                        </div>}
                        <form>
                            <div class="row">
                                <div class="col-md-7">
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Ad Title <span style={{ color: "red" }}>*</span></label>
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
                                        <label class="col-sm-3  col-form-label pt-4">Page To Show<span style={{ color: "red" }}>*</span></label>
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
                                    <label class="col-sm-3 col-form-label">Number of Clicks<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-9">
                                        <input type="number" class="form-control" value={numberofclicks} onChange={(event) => FormHandle('numberofclicks', event)} />
                                        {errors.numberError && <div className='text-danger'>Please enter number of clicks</div>}
                                    </div>
                                </div>
                            </div>

                            <div className='form-group'>
                                <div className='col-11 p-3'>
                                    <button type='button' className='btn btn-primary float-end' onClick={() => SubmitBtn()}>Submit</button>

                                </div>

                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </>
    )





}
export default AddForms;