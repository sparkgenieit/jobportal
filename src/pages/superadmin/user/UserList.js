import Header from "../../../layouts/superadmin/Header";
import Sidebar from "../../../layouts/superadmin/Sidebar";
import Footer from "../../../layouts/superadmin/Footer";
import { useEffect, useState } from "react";
import http from "../../../helpers/http";
import { useNavigate, useSearchParams } from "react-router-dom";
import { itemsPerPage } from "../../../helpers/constants";
import Pagination from "../../../components/Pagination";

export default function UserList() {
    const [userRole, setUserRole] = useState("User");
    const [userList, setUserList] = useState(null);
    const [totalItems, setTotalItems] = useState("")
    const [searchParams] = useSearchParams();
    const [pgNumber, setPgNumber] = useState(searchParams.get("page") || 1)
    const navigate = useNavigate();

    useEffect(() => {
        const skip = (pgNumber - 1) * itemsPerPage;
        http.get(`/users/all?role=${userRole.toLowerCase()}&limit=${itemsPerPage}&skip=${skip}`)
            .then((res) => {
                setTotalItems(res.data.total)
                setUserList(res.data.users)
            })
            .catch(err => {
                setUserList([])
                setTotalItems(0)
            })
    }, [pgNumber, userRole])

    const itemsToShow = (pageNumber) => {
        setPgNumber(pageNumber)
        navigate(`/superadmin/users?page=${pageNumber}`)
    }

    return (
        <>
            <div className="container-scroller">
                {/* <Header /> */}
                <Header />
                <div class="container-fluid page-body-wrapper">
                    {/* <Sidebar /> */}
                    <Sidebar />
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
                                                <table class="table mt-4  text-center">
                                                    <thead>
                                                        <tr>
                                                            <th >{userRole} Id</th>
                                                            <th >{userRole} </th>
                                                            <th>  Email Address </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {userList && userList.length > 0 && userList.map((user, index) => {
                                                            return <tr key={index}>
                                                                <td>{user._id}</td>
                                                                <td>{user.first_name + ' ' + user.last_name}  </td>
                                                                <td>{user.email}</td>
                                                            </tr>
                                                        })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <Pagination totalCount={totalItems} onPageClick={itemsToShow} currentPage={+pgNumber} pageNumberToShow={2} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )

}

