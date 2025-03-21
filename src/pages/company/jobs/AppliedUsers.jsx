import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import http from "../../../helpers/http";
import useCurrentUser from "../../../helpers/Hooks/useCurrentUser";
import Pagination from '../../../components/Pagination';
import { itemsPerPage } from "../../../helpers/constants";
import { FaEye, FaRegCircleCheck } from "react-icons/fa6";
import Loader from "../../../components/Loader";
import { Roles } from "../../../services/common/Roles.service";
import { recruiterUrl } from "../../../services/common/urls/recruiterUrls.service";
import { companyUrls } from "../../../services/common/urls/companyUrls.service";

export default function AppliedUsers() {
  const params = useParams()
  const [totalItems, setTotalItems] = useState(0)
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false)
  const [pgNumber, setPgNumber] = useState(+searchParams.get("page") || 1)
  const [appliedUsers, setAppliedUsers] = useState(null)
  const [jobName, setJobName] = useState("")
  const user = useCurrentUser()
  const isShortListedOnly = searchParams.get("s")
  const navigate = useNavigate()

  useEffect(() => {
    fetchAppliedUsers(pgNumber)
  }, [])

  const fetchAppliedUsers = async (page) => {
    setLoading(true)
    const skip = (page - 1) * itemsPerPage
    try {
      const res = await http.get(`/companies/applied-users/${params.id}?shortlisted=${isShortListedOnly}&limit=${itemsPerPage}&skip=${skip}`)
      setLoading(false)
      const jobTitle = res.data.users[0].jobId.jobTitle
      document.title = jobTitle + " | Applied Users"
      setJobName(jobTitle)
      setAppliedUsers(res.data.users)
      setTotalItems(res.data.total)
    } catch (error) {
      setLoading(false)
      setJobName("")
      setAppliedUsers([])
      setTotalItems(0)
    }
  }

  const goToUserProfile = (userId, jobId) => {

    const pathName = user.role === Roles.Recruiter ? recruiterUrl.home : companyUrls.home

    const url = `${pathName}/applied-user-profile/${userId}?j=${jobId}`

    navigate(url)
  }

  const goBack = () => {
    navigate(-1)
  }

  return <>
    <div class="container-fluid">
      <div className="content-wrapper bg-white">
        <div class="d-flex position-relative">
          <a onClick={goBack} className="position-absolute start-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
            </svg>
          </a>
          <h3 class="text-center fs-4 fw-bold flex-grow-1 mb-3">List of Applicants for {jobName}</h3>
        </div>
        <div class="row">
          {/* <div class="col-12">
                {message.show && <div className={message.class}>
                  {message.text}
                </div>} */}
          <div class="card-body  bg-white ">
            <Pagination currentPage={pgNumber} setCurrentPage={setPgNumber} itemsPerPage={itemsPerPage} pageNumberToShow={2} totalCount={totalItems} fetchItems={fetchAppliedUsers} >
              <div class="col">
                {loading && <Loader />}
                {
                  !loading &&
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
                }
              </div>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  </>
}