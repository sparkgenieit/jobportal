import { useState } from "react";
import useCurrentUser from "../../../helpers/Hooks/useCurrentUser";
import { Roles } from "../../../services/common/Roles.service";


const ReportJob = ({ onReportJob }) => {
    const user = useCurrentUser()
    const [reportReason, setReportReason] = useState("")

    const handleReportReason = (e) => {
        setReportReason(e.target.value)
    }

    if (!user || user.role !== Roles.User) {
        return <h3 className='text-center p-5'>Please Login as user to report the job</h3>
    }

    return (
        <div>
            <div>
                <h5>Report Job</h5>
            </div>
            <form className=' d-flex flex-column gap-3 p-2'>
                <div className='d-flex align-items-center'>
                    <input type='radio' id="discriminatory-content" name='report-job' value="Contains Discriminatory Content" className='form-check-input' onChange={handleReportReason} />
                    <label for='discriminatory-content' className='form-check-label ps-3' >Contains Discriminatory Content</label>
                </div>
                <div className='d-flex align-items-center'>
                    <input type='radio' id="fake-job" name='report-job' value="Fake Job/Scam" className='form-check-input' onChange={handleReportReason} />
                    <label for='fake-job' className='form-check-label ps-3' >Fake Job/Scam</label>
                </div>
                <div className='d-flex align-items-center'>
                    <input type='radio' id="inaccurate-information" name='report-job' value="Inaccurate Information" className='form-check-input' onChange={handleReportReason} />
                    <label for='inaccurate-information' className='form-check-label ps-3' >Inaccurate Information</label>
                </div>
                <div className='d-flex align-items-center'>
                    <input type='radio' id="offensive-language" name='report-job' value="Offensive Language" className='form-check-input' onChange={handleReportReason} />
                    <label for='offensive-language' className='form-check-label ps-3' >Offensive Language</label>
                </div>
                <div className='d-flex justify-content-end'>
                    <button type='button' disabled={reportReason === "" ? true : false} onClick={() => onReportJob(reportReason)} className='btn btn-danger'>Report this job</button>
                </div>
            </form>
        </div>
    )
}

export default ReportJob;