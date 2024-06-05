import { useEffect, useState } from "react";
import Footer from "../../../layouts/superadmin/Footer";
import Header from "../../../layouts/superadmin/Header";
import Sidebar from "../../../layouts/superadmin/Sidebar";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import http from "../../../helpers/http";
import httpUpload from "../../../helpers/httpUpload";

function EditCategory() {
    const [categoryName, setCategoryName] = useState("")
    const [parentCategory, setParentCategory] = useState("")
    const [parentoption, setParentoption] = useState([])
    const [description, setDescription] = useState("")
    const [photo, setPhoto] = useState("")
    const [status, setStatus] = useState("")
    const [message, setMessage] = useState({
        Msg: "",
        msgClass: "",
        showMsg: false
    })
    const [errors, setErrors] = useState({
        categoryName: false,
        parentCategory: false,
        description: false,
        photo: false,
        status: false
    })
    const params = useParams();
    let id = params.id
    const [isImageUpdated, setIsImageUpdated] = useState(false)

    const [imagePreview, setImagePreview] = useState({
        show: false,
        src: "",

    })

    const navigate = useNavigate();

    useEffect(() => {
        http.get(`/categories/${id}`)
            .then((res) => {
                setCategoryName(res.data.name)
                setParentCategory(res.data.parent_id)
                setDescription(res.data.description)
                setPhoto(res.data.photo)
                setStatus(res.data.status)
                setImagePreview({
                    show: true,
                    src: `http://localhost:8080/uploads/categoryPhoto/${res.data.photo}`
                })

                if (res.data.parent_id !== "None") {  // Checking if parent id is none 
                    return http.get("/categories/all")
                        .then((res) => {
                            setParentoption(res.data)
                        })
                        .catch(err => console.log(err))
                } else {
                    setParentoption([])
                }
            })
            .catch(err => console.log(err))



    }, [])


    const PreviewImage = (e) => {

        setPhoto(e.target.files[0])
        setImagePreview({
            show: true,
            src: URL.createObjectURL(e.target.files[0]),
        })


    }

    const handleInput = (name, event) => {

        if (name === "name") {
            setCategoryName(event.target.value)
            if (event.target.value === "") {
                setErrors({ ...errors, categoryName: true })
            }
            else {
                setErrors({ ...errors, categoryName: false })

            }
        }

        if (name === "parent") {
            setParentCategory(event.target.value)
            if (event.target.value === "") {
                setErrors({ ...errors, parentCategory: true })
            }
            else {
                setErrors({ ...errors, parentCategory: false })
            }
        }

        if (name === "description") {
            setDescription(event.target.value)
            if (event.target.value === "") {
                setErrors({ ...errors, description: true })
            }
            else {
                setErrors({ ...errors, description: false })
            }
        }

        if (name === "photo") {
            setPhoto(event.target.value)
        }

        if (name === "status") {
            setStatus(event.target.value)
            if (event.target.value === "") {
                setErrors({ ...errors, status: true })
            }
            else {
                setErrors({ ...errors, status: false })
            }
        }

    }

    const SubmitButton = () => {
        let obj = {};
        let isValid = true;

        if (categoryName === "") {
            obj = { ...obj, categoryName: true }
            isValid = false;
        } else if (/^[a-z ]{2,}$/gi.test(categoryName.trim()) == false) {
            obj = { ...obj, categoryName: true }
            isValid = false;
        }
        else {
            obj = { ...obj, categoryName: false }
        }

        if (parentCategory === "") {
            obj = { ...obj, parentCategory: true }
            isValid = false;
        } else {
            obj = { ...obj, parentCategory: false }
        }

        if (description === "") {
            obj = { ...obj, description: true }
            isValid = false;
        } else {
            obj = { ...obj, description: false }
        }

        if (photo === "") {
            obj = { ...obj, photo: true }
            isValid = false;
        } else {
            obj = { ...obj, photo: false }
        }

        if (status === "") {
            obj = { ...obj, status: true }
            isValid = false;
        } else {
            obj = { ...obj, status: false }
        }

        setErrors(obj)

        if (isValid) {

            if (isImageUpdated === true) { // checking if the image is updated
                const imageData = new FormData();
                imageData.append("file", photo);

                httpUpload.post("/upload/categoryPhoto?path=categoryPhoto", imageData)
                    .then(res => {
                        let data = {
                            "name": categoryName.trim(),
                            "parent_id": parentCategory,
                            "description": description,
                            "photo": res.data.filename,
                            "status": status
                        }
                        return http.put(`categories/update/${id}`, data)

                    })
                    .then((res) => {
                        setMessage({
                            showMsg: true,
                            Msg: "Category Updated Successfully",
                            msgClass: "alert alert-success"
                        })
                        setTimeout(() => {
                            navigate("/superadmin/Categorieslist1")
                        }, 2000)


                    })
                    .catch((err) => {
                        console.log(err)
                        setMessage({
                            showMsg: true,
                            Msg: err.response.data.message || err.message,
                            msgClass: "alert alert-danger"
                        })

                        setTimeout(() => {
                            setMessage({ ...message, showMsg: false })
                        }, 4000)

                    })
            }
            else {  // if the image is not updated 
                let data = {
                    "name": categoryName,
                    "parent_id": parentCategory,
                    "description": description,
                    "photo": photo,
                    "status": status
                }

                http.put(`/categories/update/${id}`, data)
                    .then((res) => {
                        setMessage({
                            showMsg: true,
                            Msg: "Category Updated Successfully",
                            msgClass: "alert alert-success"
                        })
                        setTimeout(() => {
                            navigate("/superadmin/Categorieslist1")
                        }, 2000)


                    })
                    .catch((err) => {
                        console.log(err)
                        setMessage({
                            showMsg: true,
                            Msg: err.response.data.message || err.message,
                            msgClass: "alert alert-danger"
                        })

                        setTimeout(() => {
                            setMessage({ ...message, showMsg: false })
                        }, 4000)

                    })



            }





            window.scrollTo({ top: 40, behavior: "smooth" })

        }
    }



    return (
        <>
            <div className="container-scroller">

                {/* <Header /> */}
                <Header />
                <div class="container-fluid page-body-wrapper">
                    {/* <Sidebar /> */}
                    <Sidebar />

                    <div class="container-fluid">
                        <div class="content-wrapper">
                            <div class="page-header">
                                <h3 class="page-title"> Categories </h3>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="Categorieslist">Super Admin</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Categories</li>
                                    </ol>
                                </nav>
                            </div>

                            <div class="row">
                                <div class="col-12">

                                    <div class="card-body bg-white ">

                                        <div class="row">
                                            <div class="col-12">
                                                <div class="card">
                                                    <h4 class="card-title px-3 py-4" > Edit Category</h4>
                                                    <div class="card-body py-0">
                                                        {message.showMsg && <div class={message.msgClass} role="alert">
                                                            {message.Msg}
                                                        </div>}
                                                        <form class="form-sample">
                                                            <div class="col-md-6">
                                                                <div class="form-group row">
                                                                    <label class="col-sm-3 col-form-label">Name<span className="text-danger">*</span></label>
                                                                    <div class="col-sm-9">
                                                                        <input type="text" value={categoryName} onChange={(e) => handleInput("name", e)} class="form-control" />
                                                                        {errors.categoryName && <div className="text-danger">Please Write a Proper Name</div>}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-6">
                                                                <div class="form-group row">
                                                                    <label class="col-sm-3 col-form-label pt-2">Parent Category<span className="text-danger">*</span></label>
                                                                    <div class="col-sm-9">

                                                                        <select id="Active" value={parentCategory} onChange={(e) => handleInput("parent", e)} class="form-select">
                                                                            <option value=""></option>
                                                                            {parentoption && parentoption.length === 0 && <option value="None">None</option>}
                                                                            {parentoption && parentoption.map((option, index) => {
                                                                                return (
                                                                                    <option key={index} value={option.name}>{option.name}</option>
                                                                                )
                                                                            })}

                                                                        </select>
                                                                        {errors.parentCategory && <div className="text-danger">Please Select the Parent Category</div>}

                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-6">
                                                                <div class="form-group row">
                                                                    <label class="col-sm-3 col-form-label">Description<span className="text-danger">*</span></label>
                                                                    <div class="col-sm-9">
                                                                        <input type="text" value={description} onChange={(e) => handleInput("description", e)} class="form-control" />
                                                                        {errors.description && <div className="text-danger">Please Write the Description</div>}

                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div class="col-md-6">
                                                                <div class="form-group row">
                                                                    <label class="col-sm-3 col-form-label" for="photo "> Photo<span className="text-danger">*</span> </label>
                                                                    <div class="col-sm-9">



                                                                        {imagePreview.show && <div className="mb-2"><img src={imagePreview.src} height="150px" width="180px" />
                                                                        </div>}
                                                                        {
                                                                            !isImageUpdated && <button type="button" onClick={() => { setIsImageUpdated(true) }} class="btn btn-gradient-primary ">Change Picture</button>

                                                                        }
                                                                        {isImageUpdated === true &&
                                                                            <input type="file" id="photo" onChange={(e) => PreviewImage(e)} class="form-control w-40" />
                                                                        }
                                                                        {errors.photo && <div className="text-danger">Please Upload the Photo</div>}


                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div class="col-md-6">
                                                                <div class="form-group row">
                                                                    <label class="col-sm-3 col-form-label">Status<span className="text-danger">*</span></label>
                                                                    <div class="col-sm-9">
                                                                        <select name="Active" id="Active" value={status} onChange={(e) => handleInput("status", e)} class="form-select  ">
                                                                            <option value=""></option>
                                                                            <option value="Allow">Allow</option>
                                                                            <option value="Not Allow">Not Allow</option>
                                                                        </select>
                                                                        {errors.status && <div className="text-danger">Please select the Status</div>}


                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <button type="button" class="btn btn-gradient-primary" onClick={SubmitButton}>Submit</button>
                                                                    <button type="button" class="btn btn-light float-end">Cancel</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>

        </>)

}

export default EditCategory;