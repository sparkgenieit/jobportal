
import './forgetPassword.css';

function ForgetPassword() {

    return (
        <>

            <div style={{ background: "#f2edf3", height: "80vh" }} class=" p-5 d-flex flex-column align-items-center justify-content-center">
                <div class="page-header">
                    <h3 class="page-title"> Forgot Password </h3>
                    {/* <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#"></a></li>
                                <li class="breadcrumb-item active" aria-current="page"></li>
                            </ol>
                        </nav> */}
                </div>

                <div class="input-group row">
                    <label class="col-sm-4 text-center col-form-label">Type your Email Id</label>
                    <div className='col-sm-8'>
                        <input type="text" class="form-control" />
                    </div>

                </div>
                <div class="row mt-3">
                    <div class="col-md-12 text-center">
                        <button type="submit" class="btn btn-gradient-primary">Submit</button>
                    </div>
                </div>
            </div>


        </>
    );
}

export default ForgetPassword;
