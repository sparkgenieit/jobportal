


import Header from "../../../layouts/superadmin/Header";
import Sidebar from "../../../layouts/superadmin/Sidebar";
import Footer from "../../../layouts/superadmin/Footer";

function Categorieslist1 (){
  return(
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
                <h3 class="page-title">Categorieslist</h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">superAdmin</a></li>
                        <li class="breadcrumb-item active" aria-current="page">CategoriesTable</li>
                    </ol>
                </nav>
            </div>
                <div>
                 <a href="Categori"><button type="button" className="btn   btn-primary float-end">Add</button></a> 
                </div>
            <div class="row my-5">
                <div class="col-12">

                    <div class="card-body bg-white  ">
                      <div class="row align-items-start">
                      <div class=" row cointainer p-5  justify-content-between">
                        <h1 align="centre">Categories table</h1>
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="row">Category Name</th>
                              <th scope="row">Photo</th>
                              <th scope="row">Delete</th>
                            </tr>
                            <tr>
                              <td scope="row">Education </td>
                              <td scope="row"> <img src="../Pictures/Sql.jpg.png" alt=""
                                  style = {{height: '50px',width: '50px'}}/></td>
                              <td scope="row"><button type="button" class="btn btn-primary">DELETE</button></td>
                            </tr>
                            <tr>
                              <td scope="row">Transport</td>
                              <td scope="row"><img src="../Pictures/javascript.jpg.png" alt=""
                                 style = {{height: '50px',width: '50px'}}/></td>
                              
                              <td scope="row"><button type="button" class="btn btn-primary">DELETE</button></td>
                            </tr>
                            <tr>
                              <td scope="row">Healthcare</td>
                              <td scope="row"> <img src="../Pictures/Html.jpg.png" alt=""
                                  style = {{height: '50px',width: '50px'}}/></td>
                                  <td scope="row"><button type="button" class="btn btn-primary">DELETE</button></td>
                            </tr>
                            
                          </thead>
                        </table>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <button type="submit" class="btn btn-gradient-primary me-2">Submit</button>
                        <button class="btn btn-light">Cancel</button>
                      </div>
                      </div>
                </div>
                </div>
                </div>
                </div>
                <Footer/>
                </div>
                </div>
                </div>
               
           
    </>
  )
}
export default Categorieslist1 ;