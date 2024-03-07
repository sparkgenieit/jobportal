import Header from "../../layouts/superadmin/Header";
import Footer from "../../layouts/superadmin/Footer";
import Sidebar from "../../layouts/superadmin/Sidebar";
import { useState } from "react";
 
 
function Table() {
 
 
    return (
        <>
 
            <div className="container-scroller">
                <Header />
 
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div class="main-panel">
                        <div class="content-wrapper">
                            <div class="page-header">
                                <h3 class="page-title"> Post An Add</h3>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#">Ads</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Category</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="">
                                <button type="button" className="btn btn-primary float-end mb-5 p-6 "><a href="AddForms"style={{textDecoration:"none",color:"white"}}>Add</a></button>
                            </div>
                            <div className="row my-5">
                                <div className="col-12">
                                    <div className="card-body bg-white my-5">
                                    <form className="form-sample">
 
                                        <table className="table  ">
                                            <tr>
                                                <th>AddTitle</th>
                                                <th>Position</th>
                                                <th>Size</th>
                                                <th>Price</th>
                                            </tr>
                                            <tr>
                                                <td>developer</td>
                                                <td>manager</td>
                                                <td>20</td>
                                                <td>5000</td>
                                            </tr>
                                            <tr>
                                                <td>developer</td>
                                                <td>manager</td>
                                                <td>20</td>
                                                <td>5000</td>
                                            </tr>
                                            <tr>
                                                <td>developer</td>
                                                <td>manager</td>
                                                <td>20</td>
                                                <td>5000</td>
                                            </tr>
 
                                        </table>
                                    </form>
                                    </div>
                                </div>
                            </div>
 
 
 
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
 
 
 
 
 
}
export default Table;