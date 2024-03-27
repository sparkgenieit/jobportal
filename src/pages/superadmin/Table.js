import Header from "../../layouts/superadmin/Header";
import Footer from "../../layouts/superadmin/Footer";
import Sidebar from "../../layouts/superadmin/Sidebar";
import { useState } from "react";


function Table() {

    const [adsList, setAdsList] = useState([
        {
            adTitle: "Whirlpool Ac",
            position: "Jobs",
            size: "20",
            price: "1000"
        },
        {
            adTitle: "Samsung Fridge",
            position: "Home",
            size: "40",
            price: "1800"
        },
        {
            adTitle: "Apple Iphone",
            position: "Home",
            size: "20",
            price: "2500"
        }])


    return (
        <>

            <div className="container-scroller">
                <Header />

                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div class="main-panel">
                        <div class="content-wrapper">
                            <div class="page-header">
                                <h3 class="page-title">Ads List</h3>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#">Ads</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Category</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="card-body bg-white my-5">

                                <div className="row">
                                    <div className="pb-4">
                                        <button type="button" className="btn btn-primary float-end "><a href="AddForms" style={{ textDecoration: "none", color: "white" }}>Add</a></button>
                                    </div>
                                    <div className="col-12">



                                        <table className="table col-12">
                                            <thead>
                                                <tr>

                                                    <th>Ad Title</th>
                                                    <th>Position</th>
                                                    <th>Size</th>
                                                    <th>Price</th>
                                                    <th colSpan="2"></th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {adsList && adsList.map((ads, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{ads.adTitle}</td>
                                                            <td>{ads.position}</td>
                                                            <td>{ads.size}</td>
                                                            <td>{ads.price}</td>
                                                            <td className="text-center"><a type="button" href="#" class="btn btn-gradient-primary">Edit</a></td>
                                                            <td className="text-center"><button type="button" class="btn btn-gradient-primary">Delete</button></td>


                                                        </tr>)



                                                })}
                                            </tbody>




                                        </table>

                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        </>
    )





}
export default Table;