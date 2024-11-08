import { useEffect, useState } from "react";
import { Editor, EditorProvider } from "react-simple-wysiwyg";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../../helpers/http";
import httpUpload from "../../../helpers/httpUpload";
import { BASE_API_URL } from "../../../helpers/constants";

function EditSkill() {
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
    const [showMsg, setShowMsg] = useState(false)
    const [msgClass, setMsgClass] = useState('alert alert-success')
    const [message, setMessage] = useState("")
    const [imagePreview, setImagePreview] = useState({
        show: false,
        src: "",

    })
    const [isImageUpdated, setIsImageUpdated] = useState(false)

    const navigate = useNavigate();
    const params = useParams();
    let id = params.id

    useEffect(() => {
        http.get(`/skills/${id}`)
            .then((res) => {
                setSkillname(res.data.skill_name)
                setSkillDomain(res.data.skill_dmain)
                setDescription(res.data.description)
                setImage(res.data.photo)

                setImagePreview({
                    show: true,
                    src: `${BASE_API_URL}/uploads/skillPhoto/${res.data.photo}`
                })
            })
            .catch(err => console.log(err))

    }, [])

    const PreviewImage = (e) => {

        setImage(e.target.files[0])
        setImagePreview({
            show: true,
            src: URL.createObjectURL(e.target.files[0]),
        })


    }


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
        if (name === "image") {
            setImage(event.target.files[0]);
        }
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

            if (isImageUpdated === true) { // checking if the image is updated

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

                        return http.put(`/skills/update/${id}`, data)
                    })
                    .then((res) => {
                        setShowMsg(true)
                        setMessage("Skills Updated SuccessFully")
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

            } else {  // if the image is not updated
                const data = {
                    "skill_name": skillname,
                    "skill_dmain": skillDomain,
                    "description": description,
                    "photo": image
                }

                http.put(`skills/update/${id}`, data)
                    .then((res) => {
                        setShowMsg(true)
                        setMessage("Skills Updated SuccessFully")
                        setMsgClass("alert alert-success")
                        setTimeout(() => {
                            navigate("/superadmin/Skills")

                        }, 2000);

                    })
                    .catch((err) => {
                        setShowMsg(true)
                        setMessage(err.response.statusText)
                        setMsgClass("alert alert-danger")
                        setTimeout(() => {
                            setShowMsg(false)
                        }, 5000);
                    }
                    )

            }



            window.scrollTo({ top: 40, behavior: "smooth" })
        }

    }


    return (
        <>

            <div class="container-fluid">
                <div className="content-wrapper bg-white">
                    <h3 className="fs-4 text-center fw-bold">Edit Skill</h3>

                    <div class="row">
                        <div class="col-12">

                            <div class="card-body bg-white ">

                                <div class="row">
                                    <div class="col-12">
                                        <div class="card">
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

                                                                {imagePreview.show && <div className="mb-2"><img src={imagePreview.src} height="150px" width="180px" />
                                                                </div>}
                                                                {
                                                                    !isImageUpdated && <button type="button" onClick={() => { setIsImageUpdated(true) }} class="btn btn-gradient-primary ">Change Picture</button>

                                                                }
                                                                {isImageUpdated === true &&
                                                                    <input type="file" id="photo" onChange={(e) => PreviewImage(e)} class="form-control w-40" />
                                                                }
                                                                {error.image && <div className="text-danger">Please Upload the Image</div>}

                                                            </div>
                                                        </div>
                                                    </div>




                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <button type="button" onClick={handleSubmit} class="btn btn-gradient-primary ">Save</button>
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

export default EditSkill;