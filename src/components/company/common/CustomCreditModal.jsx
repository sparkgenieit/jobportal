import { Modal } from "react-bootstrap";
import { companyUrls } from '../../../services/common/urls/companyUrls.service';


const CustomCreditModal = ({ show, handleClose, handleNavigation, type, credits, usedFreeCredit }) => {
  const isJob = type === "job";

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        {credits === 0 && !usedFreeCredit ? (
          <div className="d-flex flex-column align-items-center gap-2 p-2">
            <h3>{isJob ? "POST A JOB FOR FREE" : "POST AN AD FOR FREE"}</h3>
            <div>
              <img
                style={{ width: "200px" }}
                src="/assets/images/free-gift.gif"
                alt={isJob ? "free-job" : "free-ad"}
              />
            </div>

            <div className="d-flex flex-column align-items-center">
              <p>You can post the first {isJob ? "job" : "ad"} for free</p>
              <p>For your next {isJob ? "job" : "ad"}, you need to buy credits</p>
            </div>

            <div className="d-flex justify-content-end">
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  handleNavigation(isJob ? "/postajob" : companyUrls.selectAdType);
                }}
                className="btn btn-info"
              >
                {isJob ? "Post a Job" : "Post an Ad"}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="form-row ml-5">
              <div className="form-group">
                <div className="form-check ml-2">
                  <label className="form-check-label">
                    <span>Not Enough Credits</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  handleNavigation(isJob ? "/BuyJobCredits" : "/BuyAdCredits");
                }}
                className="btn btn-danger rounded-3"
              >
                Buy Credits
              </button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CustomCreditModal;
