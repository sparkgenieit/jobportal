
    
    <div class="main-panel">
      <div class="content-wrapper">
        <div class="page-header">
          <h3 class="page-title"> Employer Profile </h3>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#">Employer</a></li>
              <li class="breadcrumb-item active" aria-current="page">Post a Job</li>
            </ol>
          </nav>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Employer Profile </h4>
                <form class="form-sample">


                  <div class="row">
                    <p class="card-description"> Company Name </p>


                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Category</label>
                        <div class="col-sm-9">
                          <select class="form-control">
                            <option>IT</option>
                            <option>Non-IT</option>
                          </select>
                        </div>
                      </div>
                      <div class="row">
                        <label class="col-3 col-form-label">WebSite</label>
                        <div class="col-9">
                          <input type="text" class="form-control" />
                        </div>

                      </div>
                      
                    </div>

                    <p class="Location"> Location </p>
                      
                    <div class="row">

                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Address 1</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" id="push" onkeyup="swa(event)" />
                            <div class="bgcol" id="error"></div>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Address 2</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" id="push2" onkeyup="swa2(event)" />
                            <div class="bgcol" id="error2"></div>
                          </div>
                        </div>
                      </div>

                    
                    </div>
                    
                    <div class="row">
                      
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">State</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" id="push1" onkeyup="swa1(event)" />
                            <div class="bgcol" id="error1"></div>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Postalcode</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" id="push3" onkeyup="swa3(event)" />
                            <div class="bgcol" id="error3"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">City</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" id="push4" onkeyup="swa4(event)" />
                            <div class="bgcol" id="error4"></div>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Country</label>
                          <div class="col-sm-9">
                            <select class="form-control">
                              <option>India</option>
                              <option>Italy</option>
                              <option>Russia</option>
                              <option>Britain</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Logo</label>
                            <div class="col-sm-9">
                              <input class="form-control" type="file" />

                              <div class="bgcol" id="error5"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">About Company</label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control" id="push5" onkeyup="swa5(event)" />
                              <div class="bgcol" id="error5"></div>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Mission and Values</label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control" id="push6" onkeyup="swa6(event)" />
                              <div class="bgcol" id="error6"></div>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Work Cluture</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" id="push7" onkeyup="swa7(event)" />
                            <div class="bgcol" id="error7"></div>
                          </div>
                        </div>
                      </div>
                      <p class="Social Links"> Social Links</p>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Facebook</label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control" id="push8" onkeyup="swa8(event)" />
                              <div class="bgcol" id="error8"></div>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Instagram</label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control" id="push9" onkeyup="swa9(event)" />
                              <div class="bgcol" id="error9"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Linkedin</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" id="push10" onkeyup="swa10(event)" />
                            <div class="bgcol" id="error10"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                    <div class="row">
                      <div class="col-md-6">
                        <button type="button" onclick="srav()" class="btn btn-gradient-primary me-2">Submit</button>
                      </div>
                    </div>
                </form>
              </div>
            </div>
          </div>
      </div>
    </div>
