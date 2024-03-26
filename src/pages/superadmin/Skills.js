import Header from "../../layouts/superadmin/Header";
import Sidebar from "../../layouts/superadmin/Sidebar";
import Footer from "../../layouts/superadmin/Footer";
import { useState } from "react";
function Skills() {

    const [skillsList, setSkillsList] = useState([
        {
            skillName: "HTML",
            skillDomain: "Web Development",
            photo: "https://www.shutterstock.com/shutterstock/photos/1851522412/display_1500/stock-photo-html-inscription-against-laptop-and-code-background-learn-html-programming-language-computer-1851522412.jpg"
        },
        {
            skillName: "Typing",
            skillDomain: "Office",
            photo: "https://cdn.pixabay.com/photo/2017/09/06/16/13/hand-2722108_1280.jpg"
        },
        {
            skillName: "Drawing",
            skillDomain: "Art",
            photo: "https://cdn.pixabay.com/photo/2017/05/11/11/14/draw-2303845_1280.jpg"
        },
        {
            skillName: "Acting",
            skillDomain: "Entertainment",
            photo: "https://cdn.pixabay.com/photo/2017/05/11/11/14/draw-2303845_1280.jpg"
        },
    ])
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
                                                            <td>{skill.skillName}</td>
                                                            <td>{skill.skillDomain}</td>
                                                            <td><img src={skill.photo} /></td>
                                                            <td><a type="button" href="editCategory" class="btn btn-gradient-primary">Edit</a></td>
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