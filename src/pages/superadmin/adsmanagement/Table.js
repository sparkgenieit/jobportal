import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap'

import EditAd from "./edit";
import http from "../../../helpers/http";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import { tryCatch } from "../../../helpers/functions";
import { RxCross1 } from "react-icons/rx";

function Table() {
    const [adsList, setAdsList] = useState(null)
    const [showEditAd, setShowEditAd] = useState(false)
    const [adEdit, setAdEdit] = useState(null)
    const message = useShowMessage()

    const fetchAds = async () => {
        const { data, error } = await tryCatch(() => http.get("/ads/all"))
        setAdsList(data)

        if (error) {
            message({ status: "Error", error })
        }
    }

    useEffect(() => {
        document.title = "Ads List"
        fetchAds()
    }, [])

    const handleDelete = (ads) => {
        http.delete(`ads/delete/${ads._id}`)
            .then((res) => {
                message({ status: "Success", message: "Ad Deleted" })
                fetchAds()
            })
            .catch((err) => {
                message({ status: "Error", error: err })
            })
    }

    const edit = (ad) => {
        setAdEdit(ad)
        setShowEditAd(true)
    }

    return (
        <>

            <div class="container-fluid bg-white pt-4">
                <h3 className="fs-4 text-center fw-bold">Ads</h3>
                <div className="d-flex justify-content-end">
                    <Link className="btn btn-primary" to="/superadmin/AddForms" style={{ textDecoration: "none", color: "white" }}>Add</Link>
                </div>

                <div className="table-responsive">
                    <table className="table">
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
            </div >

            <Modal show={showEditAd} onHide={() => setShowEditAd(false)}>
                <Modal.Body className="p-2 bg-white">
                    <div className="p-0 float-end d-block d-md-none">  <RxCross1 onClick={() => setShowEditAd(false)} /> </div>
                    <EditAd ad={adEdit} />
                </Modal.Body>
            </Modal>
        </>
    )





}
export default Table;