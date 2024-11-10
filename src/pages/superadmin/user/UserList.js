import { useEffect, useState } from "react";
import http from "../../../helpers/http";
import { useNavigate, useSearchParams } from "react-router-dom";
import { itemsPerPage } from "../../../helpers/constants";
import Pagination from "../../../components/Pagination";
import Loader from "../../../components/Loader";

export default function UserList() {
    const [userRole, setUserRole] = useState("User");
    const [userList, setUserList] = useState(null);
    const [totalItems, setTotalItems] = useState("")
    const [searchParams] = useSearchParams();
    const [pgNumber, setPgNumber] = useState(searchParams.get("page") || 1)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers(pgNumber)

        document.title = "Users List"
    }, [userRole])

    const handleNavigation = (id) => {
        userRole == "User" ? navigate(`/superadmin/view-profile/User/${id}`) : navigate(`/superadmin/view-profile/Employer/${id}`)
    }

    const fetchUsers = async (page) => {
        setIsLoading(true)
        const skip = (page - 1) * itemsPerPage;
        try {
            const res = await http.get(`/users/all?role=${userRole.toLowerCase()}&limit=${itemsPerPage}&skip=${skip}`)
            setIsLoading(false)
            setTotalItems(res.data.total)
            setUserList(res.data.users)
        } catch (error) {
            setIsLoading(false)
            setTotalItems(0)
            setUserList([])
        }
    }
    return (
        <>
            <div class="container-fluid bg-white pt-4">
                <h3 className="fs-4 text-center fw-bold">User Management</h3>

                <div className="d-flex justify-content-center">
                    <select className="form-select align-self-center" value={userRole} onChange={(e) => { setUserRole(e.target.value); setPgNumber(1) }}>
                        <option value="User">User</option>
                        <option value="Employer">Employer</option>
                    </select>
                </div>

                <div className="table-responsive">
                    <Pagination currentPage={pgNumber} setCurrentPage={setPgNumber} itemsPerPage={itemsPerPage} totalCount={totalItems} pageNumberToShow={2} fetchItems={fetchUsers}>
                        {isLoading && <Loader />}
                        {!isLoading &&
                            <table class="table mt-4  text-center">
                                <thead>
                                    <tr>
                                        <th >{userRole} Id</th>
                                        <th >{userRole} </th>
                                        <th>  Email Address </th>
                                        <th>View Profile</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userList && userList.length > 0 && userList.map((user, index) => {
                                        return <tr key={index}>
                                            <td>{user._id}</td>
                                            <td>{user.first_name + ' ' + user.last_name}  </td>
                                            <td>{user.email}</td>
                                            <td>
                                                <a onClick={() => handleNavigation(user._id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                                                        <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                                                    </svg>
                                                </a>
                                            </td>
                                        </tr>
                                    })
                                    }
                                </tbody>
                            </table>
                        }
                    </Pagination>
                </div>
            </div >
        </>
    )

}

