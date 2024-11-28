import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap'

import EditAd from "./EditAd";
import http from "../../../helpers/http";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import { tryCatch } from "../../../helpers/functions";
import { RxCross1 } from "react-icons/rx";

export default function AdsList() {
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

    const onHide = () => {
        setShowEditAd(false)
    }
    return (
        <>

            <div class="container-fluid bg-white pt-4">
                <h3 className="fs-4 text-center fw-bold">Ads</h3>
                <div className="d-flex justify-content-end">
                    <Link className="btn btn-primary" to="/superadmin/post-ad" style={{ textDecoration: "none", color: "white" }}>Add</Link>
                </div>

                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Ad Title</th>
                                <th>Type</th>
                                <th colSpan={3}>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adsList && adsList.map((ads, index) => {
                                return (
                                    <tr key={ads._id}>
                                        <td>{ads.title}</td>
                                        <td>{ads.ad_type}</td>
                                        <td><img src={ads.ad_image_url} alt={ads.title} /></td>
                                        <td className="text-center"><a type="button" class="btn btn-gradient-primary" onClick={() => edit(ads)}>Edit</a></td>
                                        <td className="text-center"><button type="button" class="btn btn-gradient-primary" onClick={() => handleDelete(ads)}>Delete</button></td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div >

            <Modal show={showEditAd} onHide={onHide}>
                <Modal.Body className="p-2 bg-white">
                    <div className="p-0 float-end d-block d-md-none">  <RxCross1 onClick={onHide} /> </div>
                    <EditAd ad={adEdit} onHide={onHide} />
                </Modal.Body>
            </Modal>
        </>
    )
}