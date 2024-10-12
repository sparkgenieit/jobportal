import { useEffect, useState } from "react";
import Footer from "../../../layouts/superadmin/Footer";
import Header from "../../../layouts/superadmin/Header";
import Sidebar from "../../../layouts/superadmin/Sidebar";
import axios from "axios";
import { Editor, EditorProvider } from "react-simple-wysiwyg";
import { useNavigate } from "react-router-dom";
import httpUpload from "../../../helpers/httpUpload";
import http from "../../../helpers/http";

function Addskills() {
    const [skillname, setSkillname] = useState("");
    const [skillDomain, setSkillDomain] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState({
        skillname: false,
        skillDomain: false,
        description: false,
        image: false
    })
    const [imagePreview, setImagePreview] = useState({
        show: false,
        src: ""

    })
    const [showMsg, setShowMsg] = useState(false)
    const [msgClass, setMsgClass] = useState('alert alert-success')
    const [message, setMessage] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Add a skill"
    }, [])

    function handleInput(name, event) {
        if (name === "name") {
            setSkillname(event.target.value)
            if (event.target.value === "") {
                setError({ ...error, skillname: true })
            }
            else {
                setError({ ...error, skillname: false })
            }
        }
        if (name === "domain") {
            setSkillDomain(event.target.value)
            if (event.target.value === "") {
                setError({ ...error, skillDomain: true });
            }
            else {
                setError({ ...error, skillDomain: false })
            }
        }
        if (name === "description") {
            setDescription(event.target.value)
            if (event.target.value === "") {
                setError({ ...error, description: true })
            }
            else {
                setError({ ...error, description: false })
            }
        }

    }

    const PreviewImage = (e) => {
        setImage(e.target.files[0])
        setImagePreview({
            show: true,
            src: URL.createObjectURL(e.target.files[0])
        })


    }

    function handleSubmit() {

        let obj = {}
        let isValid = true

        if (skillname === "") {
            obj = { ...obj, skillname: true };
            isValid = false;
        }
        else {
            obj = { ...obj, skillname: false }
        }

        if (skillDomain === "") {
            obj = { ...obj, skillDomain: true };
            isValid = false;
        }
        else {
            obj = { ...obj, skillDomain: false }
        }

        if (description === "") {
            obj = { ...obj, description: true };
            isValid = false;
        }
        else {
            obj = { ...obj, description: false }
        }

        if (image === "") {
            obj = { ...obj, image: true };
            isValid = false;
        }
        else {
            obj = { ...obj, image: false }
        }

        setError(obj)
        if (isValid) {

            const imageData = new FormData();
            imageData.append("file", image);


            httpUpload.post("/upload/skillPhoto?path=skillPhoto", imageData)
                .then(res => {

                    const data = {
                        "skill_name": skillname,
                        "skill_dmain": skillDomain,
                        "description": description,
                        "photo": res.data.filename
                    }

                    return http.post('/skills/create', data)
                })
                .then((res) => {
                    setShowMsg(true)
                    setMessage("Skills Added SuccessFully")
                    setMsgClass("alert alert-success")
                    setTimeout(() => {
                        navigate("/superadmin/Skills")

                    }, 2000);

                })
                .catch((err) => {
                    console.log(err)
                    setShowMsg(true)
                    setMessage(err.response.statusText)
                    setMsgClass("alert alert-danger")
                    setTimeout(() => {
                        setShowMsg(false)
                    }, 5000);
                }
                )





            window.scrollTo({ top: 40, behavior: "smooth" })
        }

    }


    return (
        <>


            <div class="container-fluid">
                <div className="content-wrapper bg-white">
                    <div class="page-header">
                        <h3 class="page-title"> Skills </h3>
                    </div>

                    <div class="row">
                        <div class="col-12">

                            <div class="card-body bg-white ">

                                <div class="row">
                                    <div class="col-12">
                                        <div class="card">
                                            <h4 class="card-title px-3 py-4">Add Skill</h4>
                                            <div class="card-body py-0">
                                                {showMsg && <div class={msgClass} role="alert">
                                                    {message}
                                                </div>}
                                                <form class="form-sample">
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Skill Name<span className="text-danger">*</span></label>
                                                            <div class="col-sm-9">
                                                                <input type="text" value={skillname} onChange={(e) => handleInput("name", e)} class="form-control" />
                                                                {error.skillname && <div className="text-danger">Please type the Skill Name</div>}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Skill Domain<span className="text-danger">*</span></label>
                                                            <div class="col-sm-9">
                                                                <input type="text" value={skillDomain} onChange={(e) => handleInput("domain", e)} class="form-control" />
                                                                {error.skillDomain && <div className="text-danger">Please type the Skill Domain</div>}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Description<span className="text-danger">*</span></label>
                                                            <div class="col-sm-9">
                                                                <EditorProvider>
                                                                    <Editor value={description} onChange={(e) => handleInput("description", e)} />

                                                                </EditorProvider>
                                                                {error.description && <div className="text-danger">Please type the Description</div>}
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label" for="photo "> Photo<span className="text-danger">*</span> </label>
                                                            <div class="col-sm-9">
                                                                <input type="file" id="photo" onChange={(e) => PreviewImage(e)} class="form-control w-40" />
                                                                {error.image && <div className="text-danger">Please Upload the Image</div>}
                                                                {imagePreview.show && <img src={imagePreview.src} height="150px" width="180px" />}
                                                            </div>
                                                        </div>
                                                    </div>




                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <button type="button" onClick={handleSubmit} class="btn btn-gradient-primary ">Submit</button>
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
            </div>

        </>)

}

export default Addskills;