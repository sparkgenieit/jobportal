import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCompanyInfo, initialValues } from '../../services/company/postAndEditJob.service';
import { getCloseDate } from '../../helpers/functions';
import { fetchUser } from '../../helpers/slices/userSlice';
import useCurrentUser from '../../helpers/Hooks/useCurrentUser';
import useShowMessage from '../../helpers/Hooks/useShowMessage';
import PostjobForm from '../../components/company/PostJobForm';
import http from '../../helpers/http';
import { companyUrls } from '../../services/common/urls/companyUrls.service';


export default function RecruiterPostajob() {

  const currentJob = useSelector((state) => state.general.currentJob)
  const [searchParams] = useSearchParams()
  const [jobData, setJobData] = useState(null)
  const dispatch = useDispatch()
  const user = useCurrentUser()
  const company_id = user.companyId._id
  const message = useShowMessage()
  const cloneJobId = searchParams.get("c")

  useEffect(() => {
    document.title = "Post a Job"
    // When the request is to clone an existing job
    if (cloneJobId) {
      setJobData({ ...currentJob, creationdate: new Date(), closedate: getCloseDate(new Date().toString()) })
      if (currentJob?.other_benefits) setShowOthersBenefits(true)
    } else {
      // If it is a regular post a job
      fetchCompanyInfo(company_id, setJobData, initialValues)
    }
  }, [])

  const discardForm = async (setFn) => {
    await fetchCompanyInfo(company_id, setFn, initialValues)
    window.scrollTo({ top: 20, behavior: "smooth" })
    setShowOthersBenefits(false)
  }

  const submitJob = async (data) => {

    // This data only gives us the input fields we need to add the company id and posted id 

    data.employer = user.name
    data.companyId = company_id
    data.posted_by = user._id

    try {
      await http.post('/jobs/create', data)
      message({
        status: "Success",
        message: "Job Posted Successfully",
        path: companyUrls.getUrl(companyUrls.postedJobs)
      })
      dispatch(fetchUser()) //To Update Credits
    }
    catch (err) {
      message({
        status: "error",
        error: err,
      })
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="content-wrapper bg-white">
          <h3 className="fs-4 fw-bold text-center"> Post a Job </h3>
          <div className="row">
            <div className=" bg-white">

              {jobData && <PostjobForm showButton={cloneJobId ? true : false} btnOnClick={discardForm} btnText={"Discard"} initialValues={jobData} onFormSubmit={submitJob} />}

            </div>
          </div>
        </div >
      </div >
    </>
  )
} 