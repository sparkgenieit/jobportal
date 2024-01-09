import logo from './logo.svg';
import './userRegistration.css';

function userRegistration() {
  return (
   <>
   <div class="main-panel">
        <div class="content-wrapper">
          <div class="page-header">
            <h3 class="page-title"> Registration </h3>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Employee</a></li>
                <li class="breadcrumb-item active" aria-current="page">Registration</li>
              </ol>
            </nav>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Registration </h4>
                  <form class="form-sample">


         
            <div class="col-md-9">
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">First Name</label>
                <div class="col-sm-9">
                  
                  <input type="text" id="fname" onkeyup = "ab(event)"class="form-control" />

                  <div style = "color:red" id="error">

                </div>
              </div>
            </div>
            </div>

            <div class="col-md-9">
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Last Name</label>
                <div class="col-sm-9">
                    <input type="text" id="lname" onkeyup = "bc(event)"class="form-control" />

                    <div style = "color:red" id="error1">

                </div>
              </div>
            </div>
         </div>
            <div class="col-md-9">
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">EMAIL</label>
              
                
                <div class="col-sm-9"> 
                     <input type="text" id="email" onkeyup = "cd(event)"class="form-control" />

                    <div style = "color:red" id="error2">
    
                  
                </div>
              </div>
            </div>
            </div>
            
              <div class="col-md-9">
                <div class="form-group row">
                    <label class="col-sm-3 col-form-label"> PASSWORD</label>
                   
                  
                  <div class="col-sm-9">
                    <input type="text" id="password" onkeyup = "de(event)"class="form-control" />

                    <div style = "color:red" id="error3">

                    <input type="text" class="form-control" />
                  </div>
                </div>
              </div>
              </div>

                <div class="col-md-9">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">CONFIRM PASSWORD</label>
                    <div class="col-sm-9">
                        <input type="text" id="confirm" onkeyup = "ef(event)"class="form-control" />

                        <div style = "color:red" id="error4">
    
                    
                    </div>
                  </div>
                </div>
                </div>
                
                  <div class="col-md-9">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">PHONE NUMBER</label>
                      <div class="col-sm-9">

                        <input type="text" id="contact" onkeyup = "fg(event)"class="form-control" />

                        <div style = "color:red" id="error5">
    
                      </div>
                    </div>
                  </div>

                    <div class="col-md-9">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Gender</label>
                        <div class="col-sm-9">
                            
                            
        
                          <select id = "gender" onchange="gh(event)" class="form-control form-control form-control-lg">
                            <option></option>
                            <option>Male</option>
                            <option>Female</option>
                          </select>
                          <div style = "color:red" id="error6">
                        </div>
                     </div>
                     </div>
                
                    
                    <div class="col-md-9">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Date of Birth</label>
                        <div class="col-sm-9">
                            <input id="date"   placeholder="dd/mm/yyyy" onkeyup = "hi(event)"class="form-control" />

                            <div style = "color:red" id="error7">
        
                          
                        </div>
                      </div>
                    </div>
                 

                  <div class="row">
                    <div class="col-md-6 form-check form-check-flat form-check-primary">
                      <label class="form-check-label">
                        <input type="checkbox" class="form-check-input">Please Follow Terms</label>
                    </div>
                  </div>
                  <div class="col-md-9 mt-3 row">
                    <div class="col-md-6">

                      <button type="button" onclick="valid()" class="btn btn-gradient-primary me-2">Submit</button>
                    </div>
                  </div>
                  
            
        </div>

   </>
  );
}

export default App;
