import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { RxCross1 } from 'react-icons/rx';
import { adService } from '../../../services/company/Ads.service';
import { BASE_API_URL } from '../../../helpers/constants';

export default function LandingPageAdvert() {
    const [isModalVisible, setModalVisible] = useState(true);
    const [advertisement, setAdvertisement] = useState(null);
    const [isHidden, setIsHidden] = useState(false);

    // Handle path blocking inside useEffect (for React rules)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const currentPath = window.location.pathname;
            if (currentPath.startsWith('/company/') || currentPath.startsWith('/admin/')) {
                setIsHidden(true);
            }
        }
    }, []);

    useEffect(() => {
        adService.showAds('landing-page-popup')
            .then(response => setAdvertisement(response.data))
            .catch(() => setAdvertisement(null));
    }, []);

    if (isHidden || !advertisement) return null; // Ensures hooks run correctly

    const closeModal = () => setModalVisible(false);

    const imgSrc = advertisement?.company_id
        ? `${BASE_API_URL}/uploads/ads/${advertisement.image}`
        : advertisement?.ad_image_url || '';

    return (
        <Modal show={isModalVisible} onHide={closeModal} centered>
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
