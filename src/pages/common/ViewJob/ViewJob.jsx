
import "./view-job.css";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../helpers/http";
import Loader from "../../../components/Loader";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import { useDispatch } from "react-redux";
import { setInfo, setLocation } from "../../../helpers/slices/generalSlice";
import useCurrentUser from "../../../helpers/Hooks/useCurrentUser";
import { BASE_APP_URL } from "../../../helpers/constants";
import { Roles } from "../../../services/common/Roles.service";
import ReportJob from "./ReportJob";
import UploadDocs from "./UploadDocs";
import JobContent from "./JobContent";

export default function ViewJob() {
  const [isJobApplied, setIsJobApplied] = useState(false);
  const [isJobSaved, setIsJobSaved] = useState(false);
  const [jobview, setJobview] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const { _id: userId, role } = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState({ show: false });
  const message = useShowMessage();

  useEffect(() => {
    setLoading(true);
    getJob()
      .then(() => getUserJobStatus())
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      increaseView(params.id);
    }, 15000);
    return () => clearTimeout(timer);
  }, [params.id, role]);

  const getJob = () => {
    return http
      .get(`/jobs/${params.id}`)
      .then((response) => {
        setJobview(response.data);
        document.title = `${response.data.jobTitle} | ${response.data.company}`;
      })
      .catch((err) => {
        console.error("Error fetching job:", err);
        setJobview(null);
      });
  };

  const increaseView = async (id) => {
    if (!role || role === Roles.User) {
      try {
        await http.patch(`/jobs/increase-view-count/${id}`);
      } catch (error) {
        console.error("Error while increasing views:", error);
      }
    }
  };

  const getUserJobStatus = () => {
    if (userId && userId.trim() !== "") {
      http
        .get(`/jobs/user-job-status/${userId}?jobId=${params.id}`)
        .then((res) => {
          if (res.data.saved) setIsJobSaved(true);
          if (res.data.applied) setIsJobApplied(true);
        })
        .catch((err) => {
          console.error("Error fetching job status:", err);
          setIsJobSaved(false);
          setIsJobApplied(false);
        });
    }
  };

  const handleClose = () => setShowModal({ show: false });

  const onReportJob = async (reason) => {
    handleClose();
    try {
      if (userId && role === Roles.User) {
        const data = { userId, jobId: jobview._id, reportReason: reason };
        await http.post("/jobs/report", data);
        message({ status: "Success", message: "Reported Successfully", path: -1 });
      } else throw new Error("Something went wrong");
    } catch (error) {
      message({ status: "Error", error });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${BASE_APP_URL}/jobs/${jobview._id}`);
    message({ status: "Success", message: "Link Copied" });
  };

  async function onApply(data) {
    setShowModal({ show: false });
    try {
      await http.post("/jobs/apply", data);
      message({ status: "Success", message: "Applied Successfully" });
      setIsJobApplied(true);
    } catch (error) {
      message({ status: "Error", error });
    }
  }

  function handleApply() {
    if (userId && role === "user") {
      setShowModal({ show: true, type: "apply" });
    } else {
      message({ status: "Error", error: { message: "Please login as user to apply to job" } });
    }
  }

  function handleSave() {
    if (!userId || role !== "user") {
      return message({ status: "Error", error: { message: "Please login as a user to save the job" } });
    }
    if (isJobSaved) return;
    const data = {
      saved_date: new Date().toLocaleDateString("en-GB"),
      userId,
      jobId: jobview._id,
      saved: true,
    };

    http.post("/jobs/save", data)
      .then(() => {
        message({ status: "Success", message: "Job Saved Successfully" });
        setIsJobSaved(true);
      })
      .catch((error) => message({ status: "Error", error }));
  }

  const handleInfo = (e) => {
    dispatch(setInfo({ show: true, info: jobview.info, job: jobview }));
    e.stopPropagation();
  };

  if (loading) return <Loader />;
  if (!loading && (!jobview || jobview.status !== "approved")) {
    return <div className="h-screen font-bold flex justify-center items-center">Job Not Found</div>;
  }

  return (
    <JobContent
      jobview={jobview}
      isJobApplied={isJobApplied}
      isJobSaved={isJobSaved}
      handleApply={handleApply}
      handleSave={handleSave}
      handleShare={handleShare}
      handleInfo={handleInfo}
      showModal={showModal}
      setShowModal={setShowModal} // ✅ Add this

      handleClose={handleClose}
      onReportJob={onReportJob}
      onApply={onApply}
      userId={userId}
      role={role}
      params={params}
      dispatch={dispatch}
      message={message}
    />
  );
}
