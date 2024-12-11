import { BASE_API_URL } from "../helpers/constants"

export default function EmployerProfile({ user }) {
    return <>
        <div className="row">
            <div className="col-md-9 row g-3">
                <div className="fw-bold col-md-4"> Company Name : </div>
                <div className="col-md-8">{user.name}</div>


                <div className="fw-bold col-md-4"> Email : </div>
                <div className="col-md-8">{user.email}</div>


                <div className="fw-bold col-md-4"> Address 1 : </div>
                <div className="col-md-8">{user.address1}</div>


                <div className="fw-bold col-md-4"> Address 2 : </div>
                <div className="col-md-8">{user.address2}</div>


                <div className="fw-bold col-md-4"> Address 3 : </div>
                <div className="col-md-8">{user.address3}</div>


                <div className="fw-bold col-md-4"> City: </div>
                <div className="col-md-8">{user.city}</div>


                <div className="fw-bold col-md-4"> Postal Code: </div>
                <div className="col-md-8">{user.postalCode}</div>


                <div className="fw-bold col-md-4"> Contact Person : </div>
                <div className="col-md-8">{user.contact}</div>


                <div className="fw-bold col-md-4"> Phone : </div>
                <div className="col-md-8">{user.phone}</div>


                <div className="fw-bold col-md-4">Company's Website : </div>
                <div className="col-md-8"><a href={user.website} target="blank">{user.website}</a> </div>

            </div>

            <div className="col-md-3">
                {user.logo && <>
                    <div className="fw-bold text-center my-3">Company Logo</div>
                    <img className="rounded" width="100%" src={`${BASE_API_URL}/uploads/logos/${user.logo}`} />
                </>}
            </div>
        </div>
    </>
}