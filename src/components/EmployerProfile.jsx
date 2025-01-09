import { BASE_API_URL } from "../helpers/constants"

export default function EmployerProfile({ user }) {
    return <>
        <div className="grid md:grid-cols-4 p-2">
            <div className="md:col-span-3 grid md:grid-cols-3 gap-2">
                <div className="font-bold"> Company Name : </div>
                <div className="md:col-span-2">{user.name}</div>


                <div className="font-bold "> Email : </div>
                <div className="md:col-span-2">{user.email}</div>


                <div className="font-bold "> Address 1: </div>
                <div className="md:col-span-2">{user.address1}</div>


                <div className="font-bold "> Address 2: </div>
                <div className="md:col-span-2">{user.address2}</div>


                <div className="font-bold "> Address 3: </div>
                <div className="md:col-span-2">{user.address3}</div>


                <div className="font-bold "> City: </div>
                <div className="md:col-span-2">{user.city}</div>


                <div className="font-bold "> Postal Code: </div>
                <div className="md:col-span-2">{user.postalCode}</div>


                <div className="font-bold "> Contact Person : </div>
                <div className="md:col-span-2">{user.contact}</div>


                <div className="font-bold "> Phone : </div>
                <div className="md:col-span-2">{user.phone}</div>


                <div className="font-bold ">Company's Website : </div>
                <div className="md:col-span-2"><a href={user.website} target="blank">{user.website}</a> </div>

            </div>

            <div>
                {user.logo && <>
                    <div className="font-bold text-center my-3">Company Logo</div>
                    <img className="rounded" width="100%" src={`${BASE_API_URL}/uploads/logos/${user.logo}`} />
                </>}
            </div>
        </div>
    </>
}