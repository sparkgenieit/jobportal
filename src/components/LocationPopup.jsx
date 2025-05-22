import { RxCross1 } from 'react-icons/rx';
import './location-popup.css';
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../helpers/slices/generalSlice';
import ToastViewer from "../components/common/ToastViewer";

export default function LocationPopup() {
    const dispatch = useDispatch();
    const locationPopup = useSelector((state) => state.general.location);
    const info = useSelector((state) => state.general.info);
console.log('info',info);
    const handleClose = () => {
        dispatch(setLocation({ show: false }));
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
                        <img style={{ height: "20vh", width: "100%" }} className="rounded" src="https://content.r9cdn.net/rimg/dimg/09/c2/d0aa16e0-city-2575-166c0a657e0.jpg?width=1366&height=768&xhint=1673&yhint=1229&crop=true" />
                        <img style={{ height: "20vh", width: "100%" }} className="rounded" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQptUYv5XAlbkhMn5MjKP2ZaYdJ-XadHrkEENVzISWgyX1cNMs1lmCbsCpny0uo" />
                        <img style={{ height: "20vh", width: "100%" }} className="rounded" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRqDexPvTsSD7a1UZ3TxHRw9bE5nD_ZlZZlZAWAQbfGaE-GEszVIkIvsSE-tx6o" />
                        <img style={{ height: "20vh", width: "100%" }} className="rounded" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRqDexPvTsSD7a1UZ3TxHRw9bE5nD_ZlZZlZAWAQbfGaE-GEszVIkIvsSE-tx6o" />
                        <img style={{ height: "20vh", width: "100%" }} className="rounded" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRqDexPvTsSD7a1UZ3TxHRw9bE5nD_ZlZZlZAWAQbfGaE-GEszVIkIvsSE-tx6o" />
                    </div>

                    <div>
                        {info?.length > 0 ? (
                            
                            <ToastViewer key={`${locationPopup.city}`} content={info} loading={!info}/>
                           
                        ) : (
                            <p>No activities found for this region.</p>
                        )}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}