import { useEffect, useState } from "react";
import Footer from "../../../layouts/company/Footer";
import Header from "../../../layouts/company/Header";
import Sidebar from "../../../layouts/company/Sidebar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import http from "../../../helpers/http";
import Pagination from '../../../components/Pagination';
import { itemsPerPage } from "../../../helpers/constants";

export default function AppliedUsers() {
  const params = useParams()
  const [searchParams] = useSearchParams()
  const [pgNumber, setPgNumber] = useState(searchParams.get("page") || 1)
  const [totalItems, setTotalItems] = useState("")
  const [appliedUsers, setAppliedUsers] = useState(null)
  const [jobName, setJobName] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const skip = (pgNumber - 1) * itemsPerPage
    http.get(`/companies/applied-users/${params.id}?limit=${itemsPerPage}&skip=${skip}`)
      .then(res => {
        setJobName(res.data.users[0].jobId.jobTitle)
        setAppliedUsers(res.data.users)
        setTotalItems(res.data.total)
      })
      .catch(err => {
        setAppliedUsers([])
      })
  }, [pgNumber])

  const itemsToShow = (pageNumber) => {
    setPgNumber(pageNumber)
    navigate(`/company/applied-users/${params.id}?page=${pageNumber}`)
  }

  const goToUserProfile = (userId) => {
    navigate(`/company/applied-user-profile/${userId}`)
  }

  return <>
    <div className="container-scrollar">
      <Header />
      <div class="container-fluid page-body-wrapper">
        <Sidebar />
        <div class="container-fluid">
          <div class="content-wrapper">
            <div class="page-header">
              <h3 class="page-title">Users Applied for {jobName}</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="#">Employer</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Applied Users</li>
                </ol>
              </nav>
            </div>

            <div class="row">
              {/* <div class="col-12">
                {message.show && <div className={message.class}>
                  {message.text}
                </div>} */}

              <div class="card-body  bg-white ">
                <div class="col">

                  <table class="table">
                    <thead>
                      <tr >
                        <th>Applicant Name</th>
                        <th>Applicant Email</th>
                        <th>Applied Date</th>
                        <th className="text-center">View User's Profile</th>
                      </tr>
                    </thead>
                    <tbody>

                      {appliedUsers && appliedUsers.length > 0 &&
                        appliedUsers.map((user, index) => {
                          return <tr key={index}>
                            <td>{user.userId.first_name + " " + user.userId.last_name}</td>
                            <td>{user.userId.email}</td>
                            <td>{user.applied_date}</td>
                            <td className="text-center">
                              <a type="button" onClick={() => goToUserProfile(user.userId._id)} >
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
                </div>
                <Pagination totalCount={totalItems} onPageClick={itemsToShow} currentPage={+pgNumber} pageNumberToShow={2} />

              </div>

            </div>


          </div>
        </div>


      </div>



    </div>
    <Footer />
  </>
}