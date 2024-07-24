import { useEffect, useState } from "react";
import Footer from "../../../layouts/company/Footer";
import Header from "../../../layouts/company/Header";
import Sidebar from "../../../layouts/company/Sidebar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import http from "../../../helpers/http";
import Pagination from '../../../components/Pagination';
import { itemsPerPage } from "../../../helpers/constants";
import { FaEye, FaRegCircleCheck } from "react-icons/fa6";

export default function AppliedUsers() {
  const params = useParams()
  const [searchParams] = useSearchParams()
  const [pgNumber, setPgNumber] = useState(searchParams.get("page") || 1)
  const [totalItems, setTotalItems] = useState("")
  const [appliedUsers, setAppliedUsers] = useState(null)
  const [jobName, setJobName] = useState("")

  const isShortListedOnly = searchParams.get("s")
  const navigate = useNavigate()

  useEffect(() => {
    const skip = (pgNumber - 1) * itemsPerPage
    http.get(`/companies/applied-users/${params.id}?shortlisted=${isShortListedOnly}&limit=${itemsPerPage}&skip=${skip}`)
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

  const goToUserProfile = (userId, jobId) => {
    navigate(`/company/applied-user-profile/${userId}?j=${jobId}`)
  }

  const goBack = () => {
    navigate(-1)
  }

  return <>
    <div className="container-scrollar">
      <Header />
      <div class="container-fluid page-body-wrapper">
        <Sidebar />
        <div class="container-fluid">
          <div class="content-wrapper">
            <div class="page-header">
              <a onClick={goBack}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                </svg>
              </a>
              <h3 class="page-title">List of Applicants for {jobName}</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="#">Employer</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Applicants</li>
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

                  <table class="table text-center">
                    <thead>
                      <tr >
                        <th>Applicant Name</th>
                        <th>Applicant Email</th>
                        <th>Applied Date</th>
                        <th className="text-center">View Resume</th>
                        {appliedUsers && appliedUsers.some((user) => user.shortlisted === true) && <th>Shortlisted</th>}
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
                              <button
                                type="button"
                                className="btn btn-outline-dark btn-xs"
                                onClick={() => goToUserProfile(user.userId._id, user.jobId._id)}
                              >
                                <FaEye fontSize={18} />
                              </button>
                            </td>
                            <td >
                              {user.shortlisted ? <FaRegCircleCheck fill="green" fontSize={20} /> : ""}
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