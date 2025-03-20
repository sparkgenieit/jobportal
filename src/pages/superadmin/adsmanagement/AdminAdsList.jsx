import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

import AdForm from "./AdForm";
import http from "../../../helpers/http";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import { tryCatch } from "../../../helpers/functions";
import { RxCross1 } from "react-icons/rx";
import { FaPencilAlt, FaTrash } from "react-icons/fa";


export default function AdminAdsList() {
    const [adsList, setAdsList] = useState(null);
    const [showEditAd, setShowEditAd] = useState(false);
    const [adEdit, setAdEdit] = useState(null);
    const message = useShowMessage();

    const fetchAds = async () => {
        const { data, error } = await tryCatch(() => http.get("/ads/adminads"));
        if (error) {
            message({ status: "Error", error });
        } else {
            setAdsList(data);
        }
    };

    useEffect(() => {
        document.title = "Ads List";
        fetchAds();
    }, []);

    const handleDelete = async (ad) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${ad.title}"?`);
        if (!confirmDelete) return;

        const { error } = await tryCatch(() => http.delete(`/ads/delete-admin/${ad._id}`));

        if (error) {
            message({ status: "Error", error });
        } else {
            message({ status: "Success", message: "Ad Deleted Successfully" });
            fetchAds();
        }
    };

    const edit = (ad) => {
        setAdEdit(ad);
        setShowEditAd(true);
    };

    const onHide = () => {
        setShowEditAd(false);
        setAdEdit(null);
    };

    return (
        <>
            <div className="container-fluid bg-white pt-4">
                <h3 className="fs-4 text-center fw-bold">Ads</h3>
                <div className="d-flex justify-content-end mb-3">
                    <Link className="btn btn-primary" to="/superadmin/post-ad">
                        Add New Ad
                    </Link>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Ad Title</th>
                                <th>Type</th>
                                <th>Image</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adsList && adsList.length > 0 ? (
                                adsList.map((ad) => (
                                    <tr key={ad._id}>
                                        <td>{ad.title}</td>
                                        <td className="text-capitalize">{ad.ad_type}</td>
                                        <td>
                                            {ad.ad_image_url ? (
                                                <img
                                                    src={ad.ad_image_url}
                                                    alt={ad.title}
                                                    width="100"
                                                    height="50"
                                                    className="img-thumbnail"
                                                />
                                            ) : (
                                                <span className="text-muted">No Image</span>
                                            )}
                                        </td>
                                        <td className="text-center">
                                            <button className="btn btn-white btn-xs border m-1" onClick={() => edit(ad)}>
                                                <FaPencilAlt />
                                            </button>
                                            <button className="btn btn-danger btn-xs border m-1" onClick={() => handleDelete(ad)}>
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center text-muted">
                                        No ads found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            <Modal size="lg" show={showEditAd} onHide={onHide}>
                <Modal.Body className="p-3 bg-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="m-0">{adEdit ? "Edit Ad" : "Create Ad"}</h5>
                        <RxCross1 role="button" onClick={onHide} />
                    </div>
                    <hr />
                    <AdForm
                        ad={adEdit}
                        onSuccess={() => {
                            onHide(); // Close the modal
                            fetchAds(); // Refresh the list
                        }}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
}
