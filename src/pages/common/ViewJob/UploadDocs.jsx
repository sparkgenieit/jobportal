const UploadDocs = ({ job_id }) => {
    return (
        <div className="d-flex flex-column gap-2  align-items-center">
            <input type="file" id="cv" hidden />
            <input type="file" id="coverLetter" hidden />
            <div className="d-flex flex-column gap-3 justify-content-center">

                <label className="btn btn-primary" htmlFor="cv">Upload Resume</label>


                <label className="btn btn-primary" htmlFor="coverLetter">Upload Cover Letter</label>

            </div>

            <div className="w-100 d-flex align-items-center gap-2  text-secondary">
                <span style={{ height: "1px", flex: 1, }} className="bg-secondary"></span>
                Or
                <span style={{ height: "1px", flex: 1, }} className="bg-secondary"></span>
            </div>


            <div className="d-flex flex-column gap-3 justify-content-center">

                <button className="btn btn-gradient-primary">Use Uploaded Resume</button>
                <button className="btn btn-gradient-primary">Use Uploaded Cover Letter</button>

            </div>

        </div>
    );
};

export default UploadDocs;