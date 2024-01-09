import logo from './logo.svg';
import './appliedJobs.css';

function appliedJobs() {
  return (
   <>
   <div class="main-panel">
        <div class="content-wrapper">
          <div class="page-header">
            <h3 class="page-title"> Jobs </h3>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">My Applied Jobs</a></li>
                <li class="breadcrumb-item active" aria-current="page">List</li>
              </ol>
            </nav>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <form class="form-sample">
                    <div class="row">
                     <table class="table">
                        <thead>
                        <tr>
                            <td><b>Name</b></td>
                            <td><b>Company Name</b></td>
                            <td><b>post date</b></td>
                            <td><b>End date</b></td>
                            <td><b>View</b></td>
                        </tr>
                        </thead>
                        <tr>
                            <td>name</td>
                            <td>Company Name</td>
                            <td>post date</td>
                            <td>End date</td>
                            <td><button type="button" class="btn btn-success">button</button></td>
                        </tr>
                        <tr>
                            <td>name</td>
                            <td>Company Name</td>
                            <td>post date</td>
                            <td>End date</td>
                            <td><button type="button" class="btn btn-success">button</button></td>
                        </tr>
                        <tr>
                            <td>name</td>
                            <td>Company Name</td>
                            <td>post date</td>
                            <td>End date</td>
                            <td><button type="button" class="btn btn-success">button</button></td>
                        </tr>
                     </table>
                        
                  </form>
                </div>
              </div>
            </div>

            
          </div>
        </div>

   </>
  );
}

export default App;
