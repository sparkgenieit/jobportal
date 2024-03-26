


import Footer from "../../../layouts/superadmin/Footer";
import Header from "../../../layouts/superadmin/Header";
import Sidebar from "../../../layouts/superadmin/Sidebar";


function Categories1() {

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
                <h3 class="page-title"> Categories </h3>
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="Categorieslist">Super Admin</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Categories</li>
                  </ol>
                </nav>
              </div>

              <div class="row">
                <div class="col-12">

                  <div class="card-body bg-white ">

                    <div class="row">
                      <div class="col-12">
                        <div class="card">
                          <h4 class="card-title px-3 py-4" > Add Category</h4>
                          <div class="card-body py-0">
                            <form class="form-sample">


                              <div class="col-md-6">
                                <div class="form-group row">
                                  <label class="col-sm-3 col-form-label">Name</label>
                                  <div class="col-sm-9">
                                    <input type="text" class="form-control" />
                                  </div>
                                </div>
                              </div>

                              <div class="col-md-6">
                                <div class="form-group row">
                                  <label class="col-sm-3 col-form-label">Parent Category</label>
                                  <div class="col-sm-9">
                                    <input type="text" class="form-control" />
                                  </div>
                                </div>
                              </div>

                              <div class="col-md-6">
                                <div class="form-group row">
                                  <label class="col-sm-3 col-form-label">Description</label>
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
                                    <select name="Active" id="Active" class="form-select  ">
                                      <option value="Active"></option>
                                      <option value="Active">Allow</option>
                                      <option value="Active">NotAllow</option>
                                    </select>

                                  </div>
                                </div>
                              </div>

                              <div class="row">
                                <div class="col-md-6">
                                  <button type="button" class="btn btn-gradient-primary ">Submit</button>
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
            <Footer />
          </div>
        </div>
      </div>

    </>)

}

export default Categories1;