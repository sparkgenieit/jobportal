import { BASE_API_URL } from "../helpers/constants";

export default function ViewProfileData({ user, JobTypes }) {
    const handleDownload = (event, path, file) => {
        event.preventDefault();
        fetch(`${BASE_API_URL}/uploads/${path}/${file}`, {
            responseType: "blob",
        })
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                //link.setAttribute("download", file);
                link.download = file;
                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error("Error fetching the file:", error);
            });
    };

    return <>
        <form className="form-sample p-0 mt-3">
            <div className="row p-0">
                <div className="col-md-9">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">First Name :</label>
                        <div className="col-sm-9">
                            <div className=' p-2'>
                                {user.first_name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-9">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Last Name :  </label>
                        <div className="col-sm-9">
                            <div className='p-2'>
                                {user.last_name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-9">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Email address :  </label>
                        <div className="col-sm-9">
                            <div className=' p-2'>{user.email}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-9">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Mobile :</label>
                        <div className="col-sm-9">
                            <div className='p-2'>
                                {user.phone}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-9">
                    <div className="form-group row">
                        <label className="col-sm-6 col-form-label fw-bold">Personal Summary : </label>
                        <div className="col-sm-12">
                            <div className=' p-2'>
                                {user.profile_summary}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <p className="card-description fw-bold mt-3"><strong>Work History :</strong></p>
            <div className="row">
                <div className="col-md-11 small card table-responsive-sm">
                    <table class="table-sm ">
                        <thead>
                            <tr className=' border-bottom' >
                                <th className='px-3'>Job Title</th>
                                <th className='px-3' >Employer</th>
                                <th className='px-3' >Location</th>
                                <th className='px-3' >From</th>
                                <th className='px-3'>To</th>
                                <th className='px-3'>Description</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.work_history && user.work_history.length > 0 && user.work_history.map((x, index) => {
                                    return (
                                        <>
                                            <tr className='border-bottom' key={index}>
                                                <td className='px-3'>{x.jobTitle}</td>
                                                <td className='px-3'>{x.employer}</td>
                                                <td className='px-3'>{x.location}</td>
                                                <td className='px-3'>{x.fromDate && new Date(x.fromDate).toLocaleDateString('en-GB')}</td>
                                                <td className='px-3'>{x.toDate && new Date(x.toDate).toLocaleDateString('en-GB')}</td>
                                                <td className='px-3'>{x.description}</td>
                                            </tr>

                                        </>

                                    )
                                })
                            }


                        </tbody>
                    </table>






                </div>
            </div>
            <p className="card-description mt-3 fw-bold"><strong>Education :</strong></p>
            <div className="row">
                <div className="col-md-11 small card table-responsive-sm">
                    <table class="table-sm">
                        <thead>
                            <tr className=' border-bottom'>
                                <th className='px-3' >Education Provider</th>
                                <th className='px-3'  >Qualification</th>
                                <th className='px-3' >Year Completed</th>
                                <th className='px-3' >Valid in NZ?</th>
                                <th className='px-3' >Description</th>



                            </tr>
                        </thead>
                        <tbody>

                            {
                                user.education && user.education.length > 0 && user.education.map((x, index) => {
                                    return (
                                        <tr className='border-bottom' key={index}>
                                            <td className='px-3' >{x.educationProvider}</td>
                                            <td className='px-3' >{x.qualification}</td>
                                            <td className='px-3' >{x.yearCompleted}</td>
                                            <td className='px-3' >{x.validInNZ}</td>
                                            <td className='px-3' >{x.description}</td>


                                        </tr>

                                    )
                                })
                            }

                        </tbody>
                    </table>







                </div>
            </div>


            <p className="card-description mt-3 fw-bold"><strong>Licences :</strong></p>
            <div className="row">
                <div className="col-md-11 small card table-responsive-sm">
                    <table class="table-sm  ">

                        <thead>
                            <tr className=' border-bottom'>
                                <th className='px-3' >Licence Name</th>
                                <th className='px-3' >Issuing Authority</th>
                                <th className='px-3' >Issue Date</th>
                                <th className='px-3' >Expiry Date</th>
                                <th className='px-3' >Valid in NZ?</th>
                                <th className='px-3' >Description</th>




                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.licences && user.licences.length > 0 && user.licences.map((x, index) => {
                                    return (
                                        <tr className='border-bottom' key={index}>
                                            <td className='px-3' >{x.licenseName}</td>
                                            <td className='px-3' >{x.issuingAuthority}</td>
                                            <td className='px-3' >{x.issueDate && new Date(x.issueDate).toLocaleDateString('en-GB')}</td>
                                            <td className='px-3' >{x.expiryDate && new Date(x.expiryDate).toLocaleDateString('en-GB')}</td>
                                            <td className='px-3' >{x.validInNZ}</td>
                                            <td className='px-3' >{x.description}</td>



                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>






                </div>
            </div>
            <p className="card-description mt-3 fw-bold"><strong>Certifications :</strong></p>
            <div className="row">
                <div className="col-md-11 small card table-responsive-sm">
                    <table class="table-sm">
                        <thead>
                            <tr className=' border-bottom'>
                                <th className='px-3' >Certificate Name</th>

                                <th className='px-3' >Issuing Authority</th>
                                <th className='px-3' >Issue Date</th>
                                <th className='px-3' >Expiry Date</th>
                                <th className='px-3' >Valid in NZ?</th>
                                <th className='px-3' >Description</th>




                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.certification && user.certification.length > 0 && user.certification.map((x, index) => {
                                    return (
                                        <tr className='border-bottom' key={index}>
                                            <td td className='px-3'  >{x.certificateName}</td>
                                            <td className='px-3' >{x.issuingAuthority}</td>
                                            <td className='px-3' >{x.issueDate && new Date(x.issueDate).toLocaleDateString('en-GB')}</td>
                                            <td className='px-3' >{x.expiryDate && new Date(x.expiryDate).toLocaleDateString('en-GB')}</td>
                                            <td className='px-3' >{x.validInNZ}</td>
                                            <td td className='px-3'  >{x.description}</td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-9">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Skills :</label>
                        <div className="col-sm-9">
                            {user.skills}

                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-9">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Availability:</label>
                        <div className="col-sm-9">
                            {user.availability ? 'Yes' : "No"}
                        </div>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-md-9">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Notice Period:</label>
                        <div className="col-sm-9">
                            {user.noticePeriod}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-9">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Preferred Job Types :</label>
                        <div className="col-sm-9">
                            {user.preferredJobTypes}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-9">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Preferred Locations :</label>
                        <div className="col-sm-9">
                            {user.preferredJobLocations}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-9">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Preferred Jobcategorys :</label>
                        <div className="col-sm-9">
                            {user.preferredJobCategories}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-9">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Expected rate Per hour : </label>
                        <div className="col-sm-9">
                            <div>{user.expectedRatePerHour}</div>
                        </div>
                    </div>
                </div>
            </div>


            {/* <div className="row">
                <div className="col-md-9">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Profile is Visible to others:</label>
                        <div className="col-sm-9">
                            {user.showProfile}
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="col-md-9">
                <div class="form-group row">
                    <label className="col-form-label col-sm-3 fw-bold">Visa Type :</label>
                    <div className='col-sm-9'>
                        {user.visaType}
                    </div>
                </div>
            </div>

            <div className="col-md-9">
                <div className="form-group row">
                    <label className="col-form-label col-sm-3 fw-bold ">Visa Expiry Date:</label>
                    <div className="col-sm-9">
                        {user.visaExpiryDate && new Date(user.visaExpiryDate.slice(0, 10)).toLocaleDateString('en-GB')}
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-md-9">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Upload CV :  </label>
                        <div className="col-sm-9">
                            {user.cv && <a style={{ "textDecoration": "underline" }} href="/" onClick={(event) => handleDownload(event, 'cvs', user?.cv?.filename)}>{user?.cv?.originalname}</a>}
                            {/* {user.uploadCV} */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-9">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Upload Cover Letter :  </label>
                        <div className="col-sm-9">
                            {user.coverLetter && <a style={{ "textDecoration": "underline" }} href="/" onClick={(event) => handleDownload(event, 'coverletters', user?.coverLetter?.filename)}>{user?.coverLetter?.originalname}</a>}
                        </div>
                    </div>
                </div>
            </div>







        </form >

    </>
}