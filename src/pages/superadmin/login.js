
function login() {
    return <>

  <header id="header" class="header fixed-top" data-scrollto-offset="0">
    <div class="container-fluid d-flex align-items-center justify-content-between">

      <a href="index.html" class="logo d-flex align-items-center scrollto me-auto me-lg-0">

      
      </a>

     

    </div>
  </header>

  <main id="main">

   
{/*  
    <section class="inner-page">
      <div class="container" data-aos="fade-up">

        <div class="container-fluid" tyle="background-image: url(assets/images/bg.png);height: 500px; width: 100%;
        background-size: cover; background-repeat: no-repeat;">
            <div class="row">
                <div class="col-6 my-5 mx-4 d-flex flex-column justify-content-center">
    
                    <p class="text-light ">&#x27AA; Job board</p>
                    <div class="text-light fw-bold">Login to you now</div>
                    <p class="text-light">Lorem ipsum is simply dummy text of the prinrting and<br/>
                        typesetting industry has been the industry</p>
                        <div class="col-4">
                        <img src="../Desktop/fb.png" height="20px" width="20px" class="rounded  my-1"/>
                        <img src="../Desktop/gg.png" height="20px" width="20px" class="rounded my-1"/>
                        <img src="../Desktop/in.png" height="20px" width="20px" class="rounded my-1"/>
                        <img src="../Desktop/insta.jpeg" height="20px" width="20px" class="rounded my-1"/>
                        <img src="../Desktop/twi.png" height="20px" width="20px" class="rounded"/>
    
                        </div>
    
    
    
                        
                        
                </div>
                <div class="col-6 border bg-light my-5 p-3 rounded">
                    <p>If you have an account with us, please login</p>
                  
                    <form class="form-sample">


                      <div class="col-md-9">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">EMAIL</label>
                          <div class="col-sm-9">
  
                            <input type="text" id="email" onkeyup = "call(event)"class="form-control" />
  
                            <div style={{'color':'red'}} id="error">
  
                            </div>
                          </div>
                        </div>
                      </div>
  
  
                      <div class="col-md-9 mt-3">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">PASSWOPRD</label>
                          <div class="col-sm-9">
  
                            <input type="text" id="password"  onkeyup = "cal(event)" class="form-control" />
                            <div style={{'color':'red'}} id="error1"></div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-9 mt-3 row">

                        <div class="col-6">
                            <button  onclick="valid()" class="bg-primary text-light rounded" type="button">login</button>
                            <button class=" text-primary rounded " type="button">sign up</button>
                          </div> 
                      </div>
                    </form>
                </div>
            </div>
            <hr class="text-light my-5" />
            <div class="d-flex justify-content-between">
                <p class="text-light">&#169;copyright<span class="text-danger"> &#x2665;</span> dexginzone</p>
                <p class="text-light"> All rights reserved.</p>
    
            </div>
            
        </div>
       
      </div>
    </section> */}

    <section class="vh-100" style={{'backgroundColor': '#508bfc'}}>
      
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
    <img src="/assets/images/logo.png" style={{width:"50%"}} />
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-2-strong"  style={{'borderRadius': '#1rem'}} >
          <div class="card-body p-5">

            <h3 class="mb-5">Sign in</h3>

            <div class="form-outline mb-4">
              
            <label class="form-label" for="typeEmailX-2">Email</label>
              <input type="email" id="typeEmailX-2" class="form-control form-control-lg" />
            </div>

            <div class="form-outline mb-4">
              
            <label class="form-label" for="typePasswordX-2">Password</label>
              <input type="password" id="typePasswordX-2" class="form-control form-control-lg" />
            </div>

        
            {/* <div class="form-check d-flex justify-content-start mb-4">
              <input class="form-check-input" type="checkbox" value="" id="form1Example3" />
              <label class="form-check-label" for="form1Example3"> Remember password </label>
            </div> */}

            <div className='text-center'>
            <button class="btn btn-primary btn-lg btn-block" type="submit">Login</button>
            </div>

            <hr class="my-4" />
{/* 
            <button class="btn btn-lg btn-block btn-primary" style={{"backgroundColor": '#dd4b39'}}
              type="submit"><i class="fab fa-google me-2"></i> Sign in with google</button>
            <button class="btn btn-lg btn-block btn-primary mb-2" style="background-color: #3b5998;"
              type="submit"><i class="fab fa-facebook-f me-2"></i>Sign in with facebook</button> */}



          </div>
        </div>
      </div>
    </div>
  </div>
 
</section>


  </main>

    </>
}

export default login;
