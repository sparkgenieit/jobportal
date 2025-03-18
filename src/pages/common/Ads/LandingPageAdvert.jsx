import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { RxCross1 } from 'react-icons/rx';
import { adService } from '../../../services/company/Ads.service';
import { BASE_API_URL } from '../../../helpers/constants';


export default function LandingPageAdvert() {
    const [isModalVisible, setModalVisible] = useState(true);
    const [advertisement, setAdvertisement] = useState(null);

    const closeModal = () => setModalVisible(false);

    useEffect(() => {
        adService.showAds('landing-page-popup')
            .then(response => setAdvertisement(response.data))
            .catch(() => setAdvertisement(null));
    }, []);

    if (!advertisement) return null;

    const imgSrc = advertisement?.company_id 
    ? `${BASE_API_URL}/uploads/ads/${advertisement.image}` 
    : advertisement?.ad_image_url || '';
      

    return (
        <Modal show={isModalVisible} onHide={() => { }} centered>
            <Modal.Body className="bg-white">
                <div className="d-flex justify-content-end">
                    <RxCross1 role="button" onClick={closeModal} fontSize={20} />
                </div>
                <div className="d-flex flex-column align-items-center justify-content-evenly h-100">
                    <h2>{advertisement?.title}</h2>
                    <img
                        src={imgSrc}
                        alt={advertisement?.title}
                        style={{ width: "100%", height: "50vh" }}
                    />
                    <p>{advertisement?.description}</p>
                    <a
                        type="button"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={advertisement?.redirect_url}
                        className="btn btn-info rounded-4"
                        
                    >
                        Learn More
                    </a>
                </div>
            </Modal.Body>
        </Modal>
    );
}
