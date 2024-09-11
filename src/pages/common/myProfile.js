import logo from './logo.svg';
import './myProfile.css';

function myProfile() {
  return (
   <>
      <div class="container-fluid">
        <div className="content-wrapper bg-white">
          <div class="page-header">
            <h3 class="page-title"> Employee Profile </h3>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Employee</a></li>
                <li class="breadcrumb-item active" aria-current="page">Profile</li>
              </ol>
            </nav>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">User Profile </h4>
                  <form class="form-sample">
                    <p class="card-description"></p>

                    <div class="row">
                      <div class="col-md-9">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">First Name</label>
                          <div class="col-sm-9">

                            <input type="text" id="f1" onkeyup="ha(event)" class="form-control" />
                            <div class="bgred" id="error1"></div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-9">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Last Name</label>
                          <div class="col-sm-9">

                            <input type="text" id="l1" onkeyup="ha(event)" class="form-control" />
                            <div class="bgred" id="error2"></div>
                          </div>
                        </div>
                      </div>



                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-6 col-form-label">Email address</label>
                            <div class="col-sm-6">
                              <input id="e1" onkeyup="ha1(event)" type="text" class="form-control" />
                              <div class="bgred" id="error3"></div>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-6 col-form-label">Personal summary</label>
                            <div class="col-sm-6">
                              <input id="s1" onkeyup="ha2(event)" type="text" class="form-control" />
                              <div class="bgred" id="error4"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-9">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Work history</label>
                            <div class="col-sm-9">
                              <input id="w1" onkeyup="ha3(event)" type="text" class="form-control" />
                              <div class="bgred" id="error5"></div>
                            </div>
                          </div>
                        </div>
                      </div>



                      <p class="card-description mt-3">Education Qualificaiton</p>
                      <div class="row">

                        <div class="col-md-3">
                          <input id="e1" onkeyup="ha17(event)" type="text" placeholder="Qualification"
                            class="form-control" />
                          <div class="bgred" id="error11"></div>
                        </div>

                        <div class="col-md-3">
                          <input id="e2" onkeyup="ha18(event)" type="text" placeholder="Institute"
                            class="form-control" />
                          <div class="bgred" id="error12"></div>
                        </div>

                        <div class="col-md-3">
                          <input id="e3" onkeyup="ha19(event)" type="text" placeholder="Passout Year"
                            class="form-control" />
                          <div class="bgred" id="error13"></div>
                        </div>

                        <div class="col-md-3">
                          <input id="e4" onkeyup="ha20(event)" type="text" placeholder="Percentage"
                            class="form-control" />
                          <div class="bgred" id="error14"></div>
                        </div>
                      </div>

                      <p class="card-description mt-3"> Certificates </p>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-6 col-form-label">Licence Name</label>
                            <div class="col-sm-6">
                              <input id="c1" onkeyup="ha7(event)" type="text" class="form-control" />
                              <div class="bgred" id="error19"></div>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-6 col-form-label">Issuing Authority</label>
                            <div class="col-sm-6">
                              <input id="c2" onkeyup="ha8(event)" type="text" class="form-control" />
                              <div class="bgred" id="error20"></div>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-6 col-form-label">Issue Date</label>
                            <div class="col-sm-6">
                              <input id="c3" onkeyup="ha9(event)" type="date" class="form-control" />
                              <div class="bgred" id="error21"></div>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-6 col-form-label">Expiry Date</label>
                            <div class="col-sm-6">
                              <input id="c4" onkeyup="ha10(event)" type="date" class="form-control" />
                              <div class="bgred" id="error22"></div>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-6 col-form-label">Discription</label>
                            <div class="col-sm-6">
                              <input id="d2" onkeyup="ha10(event)" type="text" class="form-control" />
                              <div class="bgred" id="error38"></div>
                            </div>
                          </div>
                        </div>



                      </div>

                      <p class="card-description"> Skills </p>
                      <div class="row">

                        <div class="col-md-3">
                          <select id="sk1" onchange="ha25(event)" class="form-control">
                            <option></option>
                            <option>PHP</option>
                            <option>REACT</option>
                            <option>Angular</option>
                          </select>
                          <div class="bgred" id="error23"></div>
                        </div>

                        <div class="col-md-3">
                          <input id="sk2" onkeyup="ha26(event)" type="text" placeholder="Latest version"
                            class="form-control" />
                          <div class="bgred" id="error24"></div>
                        </div>

                        <div class="col-md-3">
                          <input id="sk3" onkeyup="ha27(event)" type="text" placeholder="Last Used"
                            class="form-control" />
                          <div class="bgred" id="error25"></div>
                        </div>

                        <div class="col-md-3">
                          <select id="sk4" onchange="ha28(event)" class="form-control">
                            <option></option>
                            <option>Beginner</option>
                            <option>Intermedite</option>
                            <option>Expert</option>
                          </select>
                          <div class="bgred" id="error26"></div>
                        </div>
                      </div>


                      <p class="card-description mt-3"> Avalability </p>

                      <div class="row">
                        <div class="col-6">
                          <input id="ava" onkeyup="ha22(event)" class="form-control" placeholder="Now" />
                          <div class="bgred" id="error28"></div>
                        </div>
                        <div class="col-6">
                          <input id="ava1" onkeyup="ha22(event)" class="form-control"
                            placeholder="Input box Weeks(s)" />
                          <div class="bgred" id="error29"></div>
                        </div>

                      </div>

                      <p class="card-description mt-3"> Prefered Information </p>

                      <div class="row">

                        <div class="col-6">
                          <div class="form-group row">
                            <label class="col-6 col-form-label">Preferred location </label>
                            <div class="col-sm-6">
                              <input id="p2" onkeyup="ha22(event)" class="form-control" placeholder="text" />
                              <div class="bgred" id="error31"></div>
                            </div>
                          </div>
                        </div>

                        <div class="col-6">
                          <div class="form-group row">
                            <label class="col-6 col-form-label">Preferred job category </label>
                            <div class="col-sm-6">
                              <input id="p3" onkeyup="ha22(event)" class="form-control" placeholder="text" />
                              <div class="bgred" id="error32"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-9">
                          <div class="form-group row">
                            <label class="col-sm-4 col-form-label">Expected Rate per hour</label>
                            <div class="col-sm-6">
                              <input type="text" id="exp" class="form-control form-control form-control-lg" />
                              <div class="bgred" id="error33"></div>
                            </div>
                          </div>
                        </div>

                      </div>



                      <div class="row">
                        <div class="col-md-9">
                          <div class="form-group row">
                            <label class="col-sm-4 col-form-label">Show Profile</label>
                            <div class="col-sm-6">
                              <select id="sh1" class="form-control form-control form-control-lg">
                                <option>yes</option>
                                <option>No</option>
                              </select>
                              <div class="bgred" id="error34"></div>
                            </div>
                          </div>
                        </div>

                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-form-label col-6">Visa Type</label>
                            <select id="visa" onkeyup="ha29(event)" class="form-control col-6">
                              <option> </option>
                              <option>Working holiday visa</option>
                              <option>Work visa</option>
                              <option>Student visa</option>
                              <option>Permanet Resident</option>
                              <option>NZ citizen</option>
                              <option>Others </option>

                            </select>
                            <div class="bgred" id="error35"></div>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-form-label">Experiy Date </label>
                            <div class="col-sm-9">
                              <input id="exd" onchange="ha30(event)" class="form-control" type="date" />
                              <div class="bgred" id="error36"></div>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div class="row">
                        <div class="col-md-6 form-check form-check-flat form-check-primary">
                          <label class="form-check-label">
                            <input type="checkbox" class="form-check-input"> Remember me </label>
                        </div>
                      </div>



                      <div class="col-md-9 mt-3 row">
                        <div class="col-md-6">
                        </div>
                        <div class="col-md-6">

                          <button type="button" onclick="bn()" class="btn btn-gradient-primary me-2">Submit</button>
                        </div>
                      </div>

                    </div>
                  </form>



                </div>

              </div>


            </div>

          </>
          );
}

          export default App;
