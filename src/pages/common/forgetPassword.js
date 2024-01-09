import logo from './logo.svg';
import './forgetPassword.css';

function forgetPassword() {
    return (
   <>
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="page-header">
                        <h3 class="page-title"> Reset Password </h3>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">Forms</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Form elements</li>
                            </ol>
                        </nav>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label"> PASSWORD</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <button type="submit" class="btn btn-gradient-primary me-2">Submit</button>
                            </div>
                        </div>

                    </>
                    );
}

                    export default App;
