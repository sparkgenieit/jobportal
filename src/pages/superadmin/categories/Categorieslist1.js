


import Header from "../../../layouts/superadmin/Header";
import Sidebar from "../../../layouts/superadmin/Sidebar";
import Footer from "../../../layouts/superadmin/Footer";
import { useState } from "react";

function Categorieslist1() {
  const [categoriesList, setCategoriesList] = useState([
    {
      categoryName: "Education",
      parentCategory: "Teaching",
      photo: "https://images.hindustantimes.com/rf/image_size_640x362/HT/p2/2015/12/01/Pictures/_c34102da-9849-11e5-b4f4-1b7a09ed2cea.jpg"
    },
    {
      categoryName: "Art",
      parentCategory: "Entertainment",
      photo: "https://cdn.pixabay.com/photo/2016/11/23/00/37/art-1851483_1280.jpg"
    },
    {
      categoryName: "Software Development",
      parentCategory: "IT",
      photo: "https://cdn.pixabay.com/photo/2016/11/23/14/45/coding-1853305_1280.jpg"
    },
    {
      categoryName: "Judicial",
      parentCategory: "Welfare",
      photo: "https://cdn.pixabay.com/photo/2019/11/11/10/05/law-4617873_1280.jpg"
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
                              <td>{category.categoryName}</td>
                              <td>{category.parentCategory}</td>
                              <td><img src={category.photo} /></td>
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
export default Categorieslist1;