import logo from './logo.svg';
import './userLogin.css';

function userLogin() {
  return (
   <>
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="page-header">
            <h3 class="page-title"> Login </h3>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Employee</a></li>
                <li class="breadcrumb-item active" aria-current="page">Login</li>
              </ol>
            </nav>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Login </h4>
                  <form class="form-sample">


                    <div class="col-md-9">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">EMAIL</label>
                        <div class="col-sm-9">

                          <input type="text" id="email" onkeyup="call(event)" class="form-control" />

                          <div style="color:red" id="error">

                          </div>
                        </div>
                      </div>
                    </div>


                    <div class="col-md-9">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">PASSWOPRD</label>
                        <div class="col-sm-9">

                          <input type="text" id="password" onkeyup="cal(event)" class="form-control" />
                          <div style="color:red" id="error1"></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-9 mt-3 row">
                      <div class="col-md-6">

                        <button type="button" onclick="valid()" class="btn btn-gradient-primary me-2">Submit</button>
                      </div>
                    </div>


                  </>
                  );
}

                  export default App;
