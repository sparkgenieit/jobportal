import Header from "../../../layouts/superadmin/Header";
import Sidebar from "../../../layouts/superadmin/Sidebar";
import Footer from "../../../layouts/superadmin/Footer";
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
    }, [userRole])

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
            <div class="container-fluid">
                <div class="content-wrapper">
                    <div class="page-header">
                        <h3 class="page-title">Users</h3>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">Super Admin</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Users</li>
                            </ol>
                        </nav>
                    </div>
                    <div class="row my-5">
                        <div class="card-body bg-white rounded">
                            <div class="col-12">
                                <div class="row col-12 ">
                                    <div className="d-flex justify-content-between ">
                                        <h4 className="card-title pt-2">Users</h4>
                                        <div>
                                            <select className="form-select" value={userRole} onChange={(e) => { setUserRole(e.target.value); setPgNumber(1) }}>
                                                <option value="User">User</option>
                                                <option value="Employer">Employer</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
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
                                                                    <a href={userRole == "User" ? `/superadmin/view-profile/User/${user._id}` : `/superadmin/view-profile/Employer/${user._id}`}>                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )

}

