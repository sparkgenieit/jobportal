import Header from "../../../layouts/company/Header";
import Sidebar from "../../../layouts/company/Sidebar";
import Footer from "../../../layouts/company/Footer";
function JobList() {
    return (
        <>
            <div className="container-scroller">
                <Header />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div class="main-panel">
                        <div class="content-wrapper">
                            <div class="page-header">
                                <h3 class="page-title">JobList </h3>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#">employer</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">JobList</li>
                                    </ol>
                                </nav>
                            </div>

                            <div class="row">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">JobList</h4>
                                            <form class="form-sample">
                                                <p class="card-description"> Personal info </p>
                                                <div class="row">

                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th><b>Name</b></th>
                                                                <th><b>Email</b></th>
                                                                <th><b>Phonenumber</b></th>
                                                                <th><b>Photo</b></th>
                                                                <th><b>logo</b></th>
                                                                <th><b>Submit</b></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Praveen</td>
                                                                <td>praveen@gmail.com</td>
                                                                <td>96826996</td>
                                                                {/* <td style={{backgroundImage:url("../pratices/aiimgs.webp"), backgroundSize:" cover;"}}></td> */}
                                                                <td><img src="../pratices/sparklogo.jpeg" alt="image" style={{height: "80px", width: "80px"}}/></td>
                                                                <td><button type="button" class="btn btn-success">button</button></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Sravani</td>
                                                                <td>sravani@gmail.com</td>
                                                                <td>57167661</td>
                                                                {/* <td style={{backgroundImage:url("../pratices/aiimgs.webp"), backgroundSize:" cover;"}}></td> */}
                                                                <td><img src="../pratices/sparklogo.jpeg" alt="image"style={{height: "80px", width: "80px"}}/></td>
                                                                <td><button type="button" class="btn btn-success">button</button></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Swarupa</td>
                                                                <td>swarupa@gmail.com</td>
                                                                <td>674979754</td>
                                                                {/* <td style={{backgroundImage:url("../pratices/aiimgs.webp"), backgroundSize:" cover;"}}></td> */}
                                                                <td><img src="../pratices/sparklogo.jpeg" alt="image" style={{height: "80px", width: "80px"}}/></td>

                                                                <td><button type="button" class="btn btn-success">button</button></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </form>
                                        </div>
                                        <Footer/>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                </div>




            </>
            )
  
}
export default JobList;