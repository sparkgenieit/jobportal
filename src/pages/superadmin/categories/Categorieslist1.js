import axios from 'axios';
import Header from "../../../layouts/superadmin/Header";
import Sidebar from "../../../layouts/superadmin/Sidebar";
import Footer from "../../../layouts/superadmin/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Categorieslist1() {
  const [categoriesList, setCategoriesList] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:8080/categories/all")
      .then((res) => {
        setCategoriesList(res.data)
      })
  }, [])

  const editButton = (id) => {
    navigate(`/superadmin/Categories/${id}`)
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
                <h3 class="page-title">Categories List</h3>
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Super Admin</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Categories Table</li>
                  </ol>
                </nav>
              </div>

              <div class="row my-5">

                <div class="col-12">


                  <div class="card-body bg-white  ">

                    <div class="row col-12 ">
                      <div className="d-flex justify-content-between">
                        <h4 className="card-title pt-2">Categories Table</h4>
                        <a type="button" className="btn btn-gradient-primary" href="/superadmin/Categories1">Add</a>
                      </div>

                      <table class="table mt-4  text-center">
                        <thead>
                          <tr>
                            <th >Category Name</th>
                            <th >Parent Category </th>
                            <th >Photo</th>
                            <th></th>
                            <th></th>

                          </tr>

                          {categoriesList && categoriesList.map((category, index) => {
                            return <tr key={index}>
                              <td>{category.name}</td>
                              <td>{category.parent_id}</td>
                              <td><img src={category.photo} /></td>
                              <td><a type="button" onClick={() => editButton(category._id)} class="btn btn-gradient-primary">Edit</a></td>
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
export default Categorieslist1;