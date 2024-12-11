import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../../helpers/http";
import httpUpload from "../../../helpers/httpUpload";
import { BASE_API_URL } from "../../../helpers/constants";

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
        document.title = "Edit category"

        http.get(`/categories/${id}`)
            .then((res) => {
                setCategoryName(res.data.name)
                setParentCategory(res.data.parent_id)
                setDescription(res.data.description)
                setPhoto(res.data.photo)
                setStatus(res.data.status)
                setImagePreview({
                    show: true,
                    src: `${BASE_API_URL}/uploads/categoryPhoto/${res.data.photo}`
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
            <div class="container-md pt-4">
                <h3 className="fs-4 text-center fw-bold">Edit Category</h3>
                {message.showMsg && <div class={message.msgClass} role="alert">
                    {message.Msg}
                </div>}
                <form class="form-sample pt-3">
                    <div class="col-md-9">
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Name<span className="text-danger">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" value={categoryName} onChange={(e) => handleInput("name", e)} class="form-control" />
                                {errors.categoryName && <div className="text-danger">Please Write a Proper Name</div>}
                            </div>
                        </div>
                    </div>

                    <div class="col-md-9">
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

                    <div class="col-md-9">
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Description<span className="text-danger">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" value={description} onChange={(e) => handleInput("description", e)} class="form-control" />
                                {errors.description && <div className="text-danger">Please Write the Description</div>}

                            </div>
                        </div>
                    </div>

                    <div class="col-md-9">
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
                        <div class="col-md-9">
                            <button type="button" class="btn btn-gradient-primary" onClick={SubmitButton}>Submit</button>
                            <button type="button" class="btn btn-light float-end">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </>)

}

export default EditCategory;