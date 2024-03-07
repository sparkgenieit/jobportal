


import Footer from "../../../layouts/superadmin/Footer";
import Header from "../../../layouts/superadmin/Header";
import Sidebar from "../../../layouts/superadmin/Sidebar";


function Categories1(){
  
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
                <h3 class="page-title"> Jobs </h3>  
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="Categorieslist">SuperAdmin</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Categeries</li>
                    </ol>
                </nav>
            </div>

            <div class="row">
                <div class="col-12">

                    <div class="card-body bg-white ">
                                          
                        <div class="row">
                        <div class="col-12">
                          <div class="card">
                            <div class="card-body">
                              <h4 class="card-title">Categories</h4>
                              <form class="form-sample">
                                <p class="card-description"> Add </p>
                                
                                <div class="col-md-6">
                                    <div class="form-group row">
                                      <label class="col-sm-3 col-form-label"> Name</label>
                                      <div class="col-sm-9">
                                        <input type="text" class="form-control" />
                                      </div>
                                    </div>
                                    </div>
                          
                                      <div class="col-md-6">
                                      <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">description</label>
                                        <div class="col-sm-9">
                                          <input type="text" class="form-control" />
                                        </div>
                                      </div>
                                      </div>
                                      
                                      
                                        <div class="col-md-6">
                                        <div class="form-group row">
                                          <label class="col-sm-3 col-form-label" for="photo "> Photo </label>
                                          <div class="col-sm-9">
                                          <input type="file" id="photo" class="form-control w-40" />
                                        </div>
                                        </div>
                                        </div>
                                        
                                        
                                          <div class="col-md-6">
                                            <div class="form-group row">
                                              <label class="col-sm-3 col-form-label">Status</label>
                                              <div class="col-sm-9">
                                                <select name="Active" id="Active" class="form-control w-40 ">
                                                  <option value="Active"></option>
                                                  <option value="Active">Allow</option>
                                                  <option value="Active">NotAllow</option>
                                                </select>

                                              </div>
                                            </div>
                                            </div>
                                            
                                            <div class="row">
                                              <div class="col-md-6">
                                                <button type="submit" class="btn btn-gradient-primary me-2">Submit</button>
                                                <button class="btn btn-light">Cancel</button>
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
                <Footer/>
              </div>
          </div>
      </div>
              
              </>)

}

export default Categories1;