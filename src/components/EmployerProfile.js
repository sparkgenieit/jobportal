import { BASE_API_URL } from "../helpers/constants"

export default function EmployerProfile({ user }) {
    return <>
        <div className="row">
            <div className="col-9">
                <div className=" d-flex  m-4">
                    <span className="fw-bold col-4"> Company Name : </span>
                    <span className="col-8">{user.name}</span>
                </div>
                <div className=" d-flex  m-4">
                    <span className="fw-bold col-4"> Email : </span>
                    <span className="col-8">{user.email}</span>
                </div>
                <div className=" d-flex  m-4">
                    <span className="fw-bold col-4"> Address 1 : </span>
                    <span className="col-8">{user.address1}</span>
                </div>
                <div className="d-flex  m-4">
                    <span className="fw-bold col-4"> Address 2 : </span>
                    <span className="col-8">{user.address2}</span>
                </div>
                <div className="d-flex  m-4">
                    <span className="fw-bold col-4"> Address 3 : </span>
                    <span className="col-8">{user.address3}</span>
                </div>
                <div className="d-flex  m-4">
                    <span className="fw-bold col-4"> City: </span>
                    <span className="col-8">{user.city}</span>
                </div>
                <div className="d-flex  m-4">
                    <span className="fw-bold col-4"> Postal Code: </span>
                    <span className="col-8">{user.postalCode}</span>
                </div>
                <div className="d-flex  m-4">
                    <span className="fw-bold col-4"> Contact Person : </span>
                    <span className="col-8">{user.contact}</span>
                </div>
                <div className="d-flex  m-4">
                    <span className="fw-bold col-4"> Phone : </span>
                    <span className="col-8">{user.phone}</span>
                </div>
                <div className="d-flex  m-4">
                    <span className="fw-bold col-4">Company's Website : </span>
                    <span className="col-8"><a href={user.website} target="blank">{user.website}</a> </span>
                </div>
            </div>

            <div className="col-3">
                {user.logo && <>
                    <div className="fw-bold text-center my-3">Company Logo</div>
                    <img className="rounded" width="100%" src={`${BASE_API_URL}/uploads/logos/${user.logo}`} />
                </>}
            </div>
        </div>
    </>
}