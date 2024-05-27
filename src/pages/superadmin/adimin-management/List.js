// import Header from '..../../layouts/company/Header';
// import Footer from '../../layouts/company/Footer';
// import Sidebar from '../../layouts/company/Sidebar';
import { useEffect, useState } from 'react';
import Header from '../../../layouts/superadmin/Header';
import Sidebar from '../../../layouts/superadmin/Sidebar';
import Footer from '../../../layouts/superadmin/Footer';
import axios from 'axios';
import AdminEdit from './Edit';
import http from '../../../helpers/http';
import Pagination from '../../../components/Pagination';
import Loader from '../../../components/Loader';
import { itemsPerPage } from '../../../helpers/constants';



const List = () => {

  const [adminList, setAdminList] = useState([])
  const [currentAdmin, setCurrentAdmin] = useState()
  const [editAdmin, setEditAdmin] = useState(false)
  const [Msg, SetMsg] = useState(false)
  const [message, setMessage] = useState("")

  const [totalItems, setTotalItems] = useState([])
  const [pgNumber, setPgNumber] = useState(1)
  const [IsLoading, setIsLoading] = useState(false)

  useEffect(() => {
    http.get(`/users/admins/all?limit=${itemsPerPage}&skip=0`)
      .then((res) => {
        setAdminList(res.data.jobs)
        let total = []
        new Array(Math.ceil(res.data.total / itemsPerPage)).fill(1).forEach((arr, index) => total.push({ number: index + 1 }))
        setTotalItems(res.data.total)

      })
  }, [])

  function handleAdmin(admin) {
    setCurrentAdmin(admin);
    setEditAdmin(true)
  }

  const itemsToShow = (pageNumber) => {
    setIsLoading(true)
    setPgNumber(pageNumber)
    const skip = (pageNumber - 1) * itemsPerPage


    http.get(`/users/admins/all?limit=${itemsPerPage}&skip=${skip}`)
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false)
          setAdminList(res.data.jobs)
        }, 500)
      })
      .catch(err => {
        SetMsg(true)
        setMessage(err.message)

        setTimeout(() => {
          SetMsg(false)
        }, 1200);
      })

  }

  function deleteAdmin(admin) {
    const adminId = admin._id

    http.delete(`/users/admin/delete/${adminId}`)
      .then((res) => {
        SetMsg(true);
        setMessage("Admin Deleted Successfully")
        setTimeout(() => {
          window.location.reload()
        }, 2000)

      })
      .catch((err) => {
        SetMsg(true);
        setMessage("An Error Occured while deleting the Admin");
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
  }


  return (<>
    {!editAdmin &&
      <div className="container-scroller">
        {IsLoading && <Loader />}
        {/* <Header /> */}
        {/* <Header /> */}
        <Header />
        <div class="container-fluid page-body-wrapper">
          {/* <Sidebar /> */}
          {/* <Sidebar /> */}
          <Sidebar />


          <div class="main-panel">

            <div class="content-wrapper">
              <div class="page-header">
                <h3 class="page-title"> Admin-Management </h3>
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Admin</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Admin-Management</li>
                  </ol>
                </nav>
              </div>


              <div class="row ">
                <div className="">
                  <a type="button" className="btn btn-primary float-end mb-1  " href="/superadmin/admins/Create">Add</a>
                </div>
                <div class="col-12">

                  <div class="card">
                    <div class="card-body">

                      {Msg && <div class="alert alert-danger" role="alert">
                        {message}
                      </div>}





                      <form class="form-sample">

                        <div class="row">
                          <table class="table">
                            <thead>
                              <tr className='text-center'>
                                <th>Id</th>
                                <th>Email</th>

                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody className='text-center'>
                              {adminList && adminList.length > 0 &&
                                adminList.map((admin, index) => {
                                  return <tr key={index}>
                                    <td>{admin._id}</td>
                                    <td>{admin.email}</td>

                                    <td>
                                      <a type="button" onClick={() => handleAdmin(admin)} class="btn btn-white btn-xs border m-1"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" /></svg></span></a>
                                      <button type="button" onClick={() => deleteAdmin(admin)} class="btn btn-danger btn-xs border m-1"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                      </svg></span>
                                      </button>
                                    </td>
                                  </tr>
                                })

                              }
                            </tbody>
                          </table>
                        </div>
                      </form>

                      <Pagination totalCount={totalItems} onPageClick={itemsToShow} currentPage={pgNumber} pageNumberToShow={2} />
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <Footer />


          </div>

        </div>
      </div>}
    {editAdmin && <AdminEdit currentAdmin={currentAdmin} />}
  </>)

}
export default List;