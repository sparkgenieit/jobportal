import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../../../helpers/http";
import { BASE_API_URL } from "../../../helpers/constants";
function Skills() {
    const [Msg, setMsg] = useState({
        message: "",
        class: "",
        show: false
    })
    const [skillsList, setSkillsList] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        http.get('/skills/all')
            .then((res) => {
                setSkillsList(res.data)
            })

        document.title = "Skills"
    }, [])

    const handleDelete = (skill) => {
        http.delete(`skills/delete/${skill._id}`)
            .then((res) => {
                setMsg({
                    show: true,
                    class: "alert alert-success",
                    message: "Skill Deleted"
                })
                setTimeout(() => {
                    window.location.reload()
                }, 1000);

            })
            .catch((err) => {
                setMsg({
                    show: true,
                    class: "alert alert-danger",
                    message: err.response.data.message || err.message
                })

                setTimeout(() => {
                    setMsg({ ...Msg, show: false })
                }, 1000);


            })

    }

    const handleEdit = (skill) => {
        navigate(`/superadmin/Skills/${skill._id}`)
    }
    return (
        <>
            <div class="container-fluid pt-4">
                <div className="d-flex flex-column flex-md-row">
                    <h3 className="fs-4 text-center w-100 fw-bold">Skills</h3>
                    <Link type="button" className="btn btn-gradient-primary" to="/superadmin/AddSkills">Add</Link>
                </div>
                {Msg.show && <div className={Msg.class}>
                    {Msg.message}

                </div>}
                <div class="table-responsive">
                    <table class="table mt-4  text-center">
                        <thead>
                            <tr>
                                <th >Skill</th>
                                <th> Skill Domain </th>
                                <th >Photo</th>
                                <th></th>
                                <th></th>
                            </tr>
                            {skillsList && skillsList.map((skill, index) => {
                                return <tr key={index}>
                                    <td>{skill.skill_name}</td>
                                    <td>{skill.skill_dmain}</td>
                                    <td><img src={`${BASE_API_URL}/uploads/skillPhoto/${skill.photo}`} /></td>
                                    <td><button onClick={() => handleEdit(skill)} type="button" class="btn btn-gradient-primary">Edit</button></td>
                                    <td><button onClick={() => handleDelete(skill)} type="button" class="btn btn-gradient-primary">Delete</button></td>
                                </tr>
                            })
                            }
                        </thead>
                    </table>
                </div>
            </div>
        </>
    )

}
export default Skills;