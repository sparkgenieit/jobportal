import { useEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import './location-popup.css';
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../helpers/slices/generalSlice';
import ToastViewer from "../components/common/ToastViewer";
import http from "../helpers/http";

export default function LocationPopup() {
    const dispatch = useDispatch();
    const locationPopup = useSelector((state) => state.general.location);

    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCityInfo = async () => {
            if (!locationPopup.city) return;

            setLoading(true);
            try {
                const citySlug = locationPopup.city.toLowerCase();
                const response = await http.get(`/cms/?category=regions&page=${citySlug}`);
                setInfo(response.data.content || []);
            } catch (error) {
                console.error("Failed to fetch city info:", error);
                setInfo([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCityInfo();
    }, [locationPopup.city]);

    const handleClose = () => {
        dispatch(setLocation({ show: false }));
        setInfo([]); // Optional: reset local info on close
    };

    return (
        <Modal size="xl" show={locationPopup.show} onHide={handleClose} centered>
            <Modal.Body>
                <div>
                    <div className='flex justify-between'>
                        <h2>{locationPopup.city}</h2>
                        <a type="button" className='p-2' onClick={handleClose}>
                            <RxCross1 size={"18px"} />
                        </a>
                    </div>

                    <div style={{ overflowX: "auto" }} className='flex gap-2 justify-between my-3'>
                        {[...Array(5)].map((_, i) => (
                            <img key={i}
                                style={{ height: "20vh", width: "100%" }}
                                className="rounded"
                                src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRqDexPvTsSD7a1UZ3TxHRw9bE5nD_ZlZZlZAWAQbfGaE-GEszVIkIvsSE-tx6o"
                                alt={`Location ${i + 1}`}
                            />
                        ))}
                    </div>

                    <div>
                        {loading ? (
                            <p>Loading content...</p>
                        ) : info?.length > 0 ? (
                            <ToastViewer key={locationPopup.city} content={info} loading={false} />
                        ) : (
                            <p>No activities found for this region.</p>
                        )}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
