import Header from '../../layouts/company/Header';
import Footer from '../../layouts/company/Footer';
import Sidebar from '../../layouts/company/Sidebar';

function CompanyProfile() {
  return (
    <>
      
      <div className="container-scroller">

        <Header />
        <div class="container-fluid page-body-wrapper">
          <Sidebar />
          <div class="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title"> Employer Profile </h3>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Employer</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Post a Job</li>
                  </ol>
                </nav>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Employer Profile </h4>
                      <form className="form-sample">


                        <div className="row">
                          <p className="card-description"> Company Name </p>


                          <div className="col-md-6">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Category</label>
                              <div className="col-sm-9">
                                <select className="form-control">
                                  <option>IT</option>
                                  <option>Non-IT</option>
                                </select>
                              </div>
                            </div>
                            <div className="row">
                              <label className="col-3 col-form-label">WebSite</label>
                              <div className="col-9">
                                <input type="text" className="form-control" />
                              </div>

                            </div>

                          </div>

                          <p className="Location"> Location </p>

                          <div className="row">

                            <div className="col-md-6">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Address 1</label>
                                <div className="col-sm-9">
                                  <input type="text" class="form-control" id="push" onkeyup="swa(event)" />
                                  <div className="bgcol" id="error"></div>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Address 2</label>
                                <div className="col-sm-9">
                                  <input type="text" class="form-control" id="push2" onkeyup="swa2(event)" />
                                  <div className="bgcol" id="error2"></div>
                                </div>
                              </div>
                            </div>


                          </div>

                          <div className="row">

                            <div className="col-md-6">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">State</label>
                                <div className="col-sm-9">
                                  <input type="text" className="form-control" id="push1" onkeyup="swa1(event)" />
                                  <div className="bgcol" id="error1"></div>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Postalcode</label>
                                <div className="col-sm-9">
                                  <input type="text" className="form-control" id="push3" onkeyup="swa3(event)" />
                                  <div className="bgcol" id="error3"></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">City</label>
                                <div className="col-sm-9">
                                  <input type="text" className="form-control" id="push4" onkeyup="swa4(event)" />
                                  <div className="bgcol" id="error4"></div>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Country</label>
                                <div className="col-sm-9">
                                  <select className="form-control">
                                    <option>India</option>
                                    <option>Italy</option>
                                    <option>Russia</option>
                                    <option>Britain</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <label className="col-sm-3 col-form-label">Logo</label>
                                  <div className="col-sm-9">
                                    <input className="form-control" type="file" />

                                    <div className="bgcol" id="error5"></div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <label className="col-sm-3 col-form-label">About Company</label>
                                  <div className="col-sm-9">
                                    <input type="text" className="form-control" id="push5" onkeyup="swa5(event)" />
                                    <div className="bgcol" id="error5"></div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group row">
                                  <label className="col-sm-3 col-form-label">Mission and Values</label>
                                  <div className="col-sm-9">
                                    <input type="text" className="form-control" id="push6" onkeyup="swa6(event)" />
                                    <div className="bgcol" id="error6"></div>
                                  </div>
                                </div>
                              </div>
                            </div>


                            <div className="col-md-6">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Work Cluture</label>
                                <div className="col-sm-9">
                                  <input type="text" className="form-control" id="push7" onkeyup="swa7(event)" />
                                  <div className="bgcol" id="error7"></div>
                                </div>
                              </div>
                            </div>
                            <p className="Social Links"> Social Links</p>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <label className="col-sm-3 col-form-label">Facebook</label>
                                  <div className="col-sm-9">
                                    <input type="text" className="form-control" id="push8" onkeyup="swa8(event)" />
                                    <div className="bgcol" id="error8"></div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group row">
                                  <label class="col-sm-3 col-form-label">Instagram</label>
                                  <div className="col-sm-9">
                                    <input type="text" className="form-control" id="push9" onkeyup="swa9(event)" />
                                    <div className="bgcol" id="error9"></div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Linkedin</label>
                                <div className="col-sm-9">
                                  <input type="text" className="form-control" id="push10" onkeyup="swa10(event)" />
                                  <div className="bgcol" id="error10"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <button type="button" onclick="srav()" className="btn btn-gradient-primary me-2">Submit</button>
                          </div>
                        </div>
                      </form>
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
export default CompanyProfile;