import Header from "../../../layouts/superadmin/Header";
import Sidebar from "../../../layouts/superadmin/Sidebar";
import Footer from "../../../layouts/superadmin/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Skills() {

    const [skillsList, setSkillsList] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:8080/skills/all')
            .then((res) => {
                setSkillsList(res.data)
            })
    }, [])

    const handleEdit = (skill) => {
        navigate(`/superadmin/Skills/${skill._id}`)
    }
    return (
        <>

            <div className="container-scroller">

                {/* <Header /> */}
                <Header />
                <div class="container-fluid page-body-wrapper">
                    {/* <Sidebar /> */}
                    <Sidebar />

                    <div class="main-panel">
                        <div class="content-wrapper">
                            <div class="page-header">
                                <h3 class="page-title">Skills</h3>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#">Super Admin</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Skills</li>
                                    </ol>
                                </nav>
                            </div>

                            <div class="row my-5">

                                <div class="col-12">


                                    <div class="card-body bg-white  ">

                                        <div class="row col-12 ">
                                            <div className="d-flex justify-content-between">
                                                <h4 className="card-title pt-2">Skills</h4>
                                                <a type="button" className="btn btn-gradient-primary" href="/superadmin/AddSkills">Add</a>
                                            </div>

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
                                                            <td><img src={skill.photo} /></td>
                                                            <td><button onClick={() => handleEdit(skill)} type="button" class="btn btn-gradient-primary">Edit</button></td>
                                                            <td><button type="button" class="btn btn-gradient-primary">Delete</button></td>
                                                        </tr>
                                                    })

                                                    }


                                                </thead>
                                            </table>

                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )

}
export default Skills;