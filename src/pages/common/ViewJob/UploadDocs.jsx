import { useEffect, useState } from "react";
import userService from "../../../services/common/user.service";
import { getFileName } from "../../../helpers/functions/textFunctions";


const UploadDocs = ({ job_id, user_id, onApply, message }) => {

    const [cv, setCv] = useState(null);
    const [coverLetter, setCoverLetter] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const { data } = await userService.get(user_id);
                setUser(data);
            } catch (error) {
                setUser(null);
            }
        }

        fetchUser();

    }, [job_id, user_id]);

    const handleApply = async () => {

        const applyData = {
            applied_date: new Date().toLocaleDateString('en-GB'),
            userId: user_id,
            jobId: job_id,
            applied: true
        }

        if (cv) {  // Check if cv is uploaded
            const formData = new FormData();
            formData.append("file", cv);
            try {
                const { data } = await userService.uploadCV(formData);

                applyData.cv = data.filename;
            } catch (error) {
                message({ status: "error", error })
            }
        } else {
            applyData.cv = user.cv
        }

        if (coverLetter) {  // Check if coverLetter is uploaded
            const formData = new FormData();
            formData.append("file", coverLetter);
            try {
                const { data } = await userService.uploadCoverLetter(formData);
                applyData.coverLetter = data.filename;
            } catch (error) {
                message({ status: "error", error })
            }
        } else {
            applyData.coverLetter = user.coverLetter
        }

        onApply(applyData)
    }

    const handleUpload = (e) => {
        const file = e.target.files[0];

        const fileExtension = file.name?.split('.')?.pop().toLowerCase();

        const acceptedExtensions = ["pdf"]

        if (!acceptedExtensions.includes(fileExtension)) {
            message({ status: "error", error: { message: "Resume and cover letter should only be in pdf format" } })
            return
        }

        if (e.target.id === "cv") {
            setCv(file);
        }

        if (e.target.id === "coverLetter") {
            setCoverLetter(file)
        }
    }

    return (
        <div className="d-flex flex-column gap-2  align-items-center">
            <input disabled={cv} type="file" onChange={handleUpload} id="cv" hidden />
            <input disabled={coverLetter} type="file" onChange={handleUpload} id="coverLetter" hidden />

            <div className="d-flex flex-column gap-3 justify-content-center">


                <div className="d-flex flex-column  align-items-center">
                    <label className="btn btn-primary d-flex gap-2 align-items-center" htmlFor="cv">Upload Resume  </label>
                    {cv && <span className="small text-center text-success">{cv.name}</span>}
                </div>
                <div className="d-flex flex-column  align-items-center">
                    <label className="btn btn-primary d-flex gap-2 align-items-center" htmlFor="coverLetter">Upload Cover Letter</label>
                    {coverLetter && <span className="small text-center text-success">{coverLetter.name}</span>}
                </div>
            </div>

            <div className="w-100 d-flex align-items-center gap-2  text-secondary">
                <span style={{ height: "1px", flex: 1, }} className="bg-secondary"></span>
                Or
                <span style={{ height: "1px", flex: 1, }} className="bg-secondary"></span>
            </div>


            <div className="d-flex flex-column gap-3 justify-content-center">

                <div className="d-flex flex-column  align-items-center">
                    <button type="button" onClick={() => setCv(null)} disabled={!user} className="btn btn-gradient-primary"> Use Uploaded Resume</button>
                    {user && <span className="small">{getFileName(user?.cv)}</span>}
                </div>


                <div className="d-flex flex-column  align-items-center">
                    <button type="button" onClick={() => setCoverLetter(null)} disabled={!user} className="btn btn-gradient-primary"> Use Uploaded Cover Letter</button>
                    {user && <span className="small">{getFileName(user?.coverLetter)}</span>}
                </div>
            </div>

            <div className="align-self-end">
                <button type="button" onClick={handleApply} className="btn btn-primary">Apply</button>
            </div>
        </div>
    );
};

export default UploadDocs;