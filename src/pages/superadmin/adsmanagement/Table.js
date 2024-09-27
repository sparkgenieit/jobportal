import Header from "../../../layouts/superadmin/Header";
import Footer from "../../../layouts/superadmin/Footer";
import Sidebar from "../../../layouts/superadmin/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import EditAd from "./edit";
import http from "../../../helpers/http";



function Table() {
    const [adsList, setAdsList] = useState(null)
    const [showEditAd, setShowEditAd] = useState(false)
    const [adEdit, setAdEdit] = useState(null)
    const [Msg, setMsg] = useState({
        message: "",
        class: "",
        show: false
    })

    useEffect(() => {
        http.get("/ads/all")
            .then((res) => setAdsList(res.data))
    }, [])

    const handleDelete = (ads) => {
        http.delete(`ads/delete/${ads._id}`)
            .then((res) => {
                setMsg({
                    show: true,
                    class: "alert alert-success",
                    message: "Ad Deleted"
                })
                setTimeout(() => {
                    window.location.reload()
                }, 1000);

            })
            .catch((err) => {
                setMsg({
                    show: true,
                    class: "alert alert-danger",
                    message: err.response.data.message || err.message
                })

                setTimeout(() => {
                    setMsg({ ...Msg, show: false })
                }, 1000);


            })

    }


    const edit = (ad) => {
        setAdEdit(ad)
        setShowEditAd(true)

    }

    return (
        <>

            {!showEditAd &&
                <div class="container-fluid">
                    <div className="content-wrapper bg-white">
                        <div class="page-header">
                            <h3 class="page-title">Ads List</h3>
                        </div>
                        <div className="card-body bg-white my-5">
                            {Msg.show &&
                                <div className={Msg.class}>
                                    {Msg.message}

                                </div>}

                            <div className="row">
                                <div className="pb-4">
                                    <a type="button" className="btn btn-primary float-end" href="/superadmin/AddForms" style={{ textDecoration: "none", color: "white" }}>Add</a>
                                </div>
                                <div className="col-12">






                                    <table className="table col-12">
                                        <thead>
                                            <tr>

                                                <th>Ad Title</th>

                                                <th>Pages</th>
                                                <th>Position</th>
                                                <th>Size</th>
                                                <th>Price</th>
                                                <th>Number of Clicks</th>
                                                <th colSpan="2"></th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {adsList && adsList.map((ads, index) => {
                                                return (
                                                    <tr>
                                                        <td>{ads.title}</td>

                                                        <td>{ads.pages}</td>
                                                        <td>{ads.position}</td>
                                                        <td>{ads.size}</td>
                                                        <td>{ads.price}</td>
                                                        <td>{ads.noOfClicks}</td>

                                                        <td className="text-center"><a type="button" href="#" class="btn btn-gradient-primary" onClick={() => edit(ads)}>Edit</a></td>
                                                        <td className="text-center"><button type="button" class="btn btn-gradient-primary" onClick={() => handleDelete(ads)}>Delete</button></td>


                                                    </tr>)



                                            })}
                                        </tbody>




                                    </table>

                                </div>
                            </div>
                        </div>



                    </div>

                </div >}
            {showEditAd && <EditAd ad={adEdit} />}
        </>
    )





}
export default Table;