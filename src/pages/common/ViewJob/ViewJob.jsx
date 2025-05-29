import "./view-job.css";
import { useEffect, useRef, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import http from "../../../helpers/http";
import Ads from "../Ads/Ads";
import { Modal } from "react-bootstrap";
import { BASE_API_URL, BASE_APP_URL } from "../../../helpers/constants";
import { getUserID, getYoutubeVideoId, timeAgo } from "../../../helpers/functions";
import { FaDollarSign, FaRegClock, FaShare, FaYoutube } from "react-icons/fa6";
import { PiBookmarkSimpleBold, PiBookmarkSimpleFill, PiCarProfileThin } from "react-icons/pi";
import { MdOutlineLocationOn, MdOutlinePeopleOutline } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import { GiHotMeal } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import Loader from "../../../components/Loader";
import Tooltip from "../../../components/Tooltip";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import { markdownToText, salaryPerAnnum } from "../../../helpers/functions/textFunctions";
import { BsBriefcase, BsCalendar3 } from "react-icons/bs";

import { useDispatch } from "react-redux";
import { setInfo, setLocation } from "../../../helpers/slices/generalSlice";
import useCurrentUser from "../../../helpers/Hooks/useCurrentUser";
import { Roles } from "../../../services/common/Roles.service";
import ReportJob from "./ReportJob";
import UploadDocs from "./UploadDocs";

export default function ViewJob() {
  const [isJobApplied, setIsJobApplied] = useState(false);
  const [isJobSaved, setIsJobSaved] = useState(false);
  const [jobview, setJobview] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const { _id: userId, role } = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState({ show: false });
  const youtubeRef = useRef(null);
  const message = useShowMessage();

  // Chain API calls so that getUserJobStatus is called after getJob
  useEffect(() => {
    setLoading(true);
    getJob()
      .then(() => getUserJobStatus())
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Increase view count after 15 seconds only if the component is mounted
  useEffect(() => {
    const timer = setTimeout(() => {
      increaseView(params.id);
    }, 15 * 1000);

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
          if (res.data.saved) {
            setIsJobSaved(true);
          }
          if (res.data.applied) {
            setIsJobApplied(true);
          }
        })
        .catch((err) => {
          console.error("Error fetching job status:", err);
          setIsJobSaved(false);
          setIsJobApplied(false);
        });
    }
  };

  const handleClose = () => {
    setShowModal({ show: false });
  };

  const onReportJob = async (reason) => {
    handleClose();
    try {
      if (userId && role === Roles.User) {
        const data = {
          userId,
          jobId: jobview._id,
          reportReason: reason,
        };
        await http.post("/jobs/report", data);
        message({
          status: "Success",
          message: "Reported Successfully",
          path: -1,
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      message({
        status: "Error",
        error,
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${BASE_APP_URL}/jobs/${jobview._id}`);
    message({
      status: "Success",
      message: "Link Copied",
    });
  };

  async function onApply(data) {
    setShowModal({ show: false });
    try {
      await http.post("/jobs/apply", data);
      message({
        status: "Success",
        message: "Applied Successfully",
      });
      setIsJobApplied(true);
    } catch (error) {
      message({
        status: "Error",
        error,
      });
    }
  }

  function handleApply() {
    if (userId && role === "user") {
      setShowModal({ show: true, type: "apply" });
    } else {
      message({
        status: "Error",
        error: { message: "Please login as user to apply to job" },
      });
    }
  }

  function handleSave() {
    if (!userId || role !== "user") {
      return message({
        status: "Error",
        error: { message: "Please login as a user to save the job" },
      });
    }
    // Prevent multiple API calls if job is already saved
    if (isJobSaved) return;

    const data = {
      saved_date: new Date().toLocaleDateString("en-GB"),
      userId,
      jobId: jobview._id,
      saved: true,
    };

    http
      .post("/jobs/save", data)
      .then(() => {
        message({ status: "Success", message: "Job Saved Successfully" });
        setIsJobSaved(true);
      })
      .catch((error) => {
        message({ status: "Error", error });
      });
  }

  const handleInfo = (e) => {
    dispatch(
      setInfo({
        show: true,
        info: jobview.info,
        job: jobview,
      })
    );
    e.stopPropagation();
  };

  if (loading) {
    return <Loader />;
  }

  if (!loading && (!jobview || jobview.status !== "approved")) {
    // When the job is not found or not approved
    return (
      <div className="h-screen font-bold flex justify-center items-center">
        Job Not Found
      </div>
    );
  }

if (loading) return <Loader />;

if (!loading && (!jobview || jobview.status !== "approved")) {
  return (
    <div className="h-screen font-bold flex justify-center items-center">
      Job Not Found
    </div>
  );
}

 return (
      <>
        <div className="m-0 p-0 grid md:grid-cols-3 mt-3">
          <div className="md:col-span-2 job-details-box">
            {/* Banner */}
            <div className="mb-3 mx-4">
              {jobview.banner && (
                <img
                  className="rounded border border-slate-200 w-full h-[40vh]"
                  src={`${BASE_API_URL}/uploads/banners/${jobview.banner}`}
                  alt={jobview.company}
                />
              )}
            </div>

            {/* Logo and Company Name */}
            <div className="mb-3 mx-4 flex items-center justify-between logo-youtube-container">
              {/* Logo */}
              <div className="flex items-center gap-3 w-full justify-between lg:justify-start">
                {jobview.companyLogo && jobview.companyLogo.length > 0 && (
                  <img
                    className="rounded logo-youtube border border-slate-200"
                    src={`${BASE_API_URL}/uploads/logos/${jobview.companyLogo}`}
                    alt={jobview.company}
                  />
                )}
                {jobview.info?.length > 0 ? (
                  <Tooltip tooltipText={"View Company Info"} size={12}>
                    <span
                      className="underline text-blue-500 font-semibold text-lg"
                      onClick={handleInfo}
                    >
                      {jobview.company}
                    </span>
                  </Tooltip>
                ) : (
                  jobview.company
                )}
              </div>

              {/* Youtube Iframe */}
              {jobview.youtubeUrl && (
                <div className="relative hidden lg:block">
                  <iframe
                    ref={youtubeRef}
                    className="rounded logo-youtube"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    src={`https://www.youtube.com/embed/${getYoutubeVideoId(
                      jobview.youtubeUrl
                    )}`}
                    allowFullScreen
                  />
                  <span
                    role="button"
                    onClick={() => {
                      if (youtubeRef.current)
                        youtubeRef.current.requestFullscreen();
                    }}
                    className="youtube-play-button"
                  >
                    <FaYoutube fontSize={70} fill="#FF3D00" />
                  </span>
                </div>
              )}
            </div>

            {/* Job Details */}
            <div className="grid md:grid-cols-3 border-2 border-green-300 rounded mx-4 p-3 text-sm lg:text-base">
              {/* Left Details */}
              <div className="md:col-span-2">
                <div className="font-bold text-xl">{jobview.jobTitle}</div>
                {jobview.jobCategory}/{jobview.subCategory}
                <div
                  role="button"
                  onClick={() =>
                    dispatch(
                      setLocation({ show: true, city: jobview.location })
                    )
                  }
                >
                  <MdOutlineLocationOn fontSize={20} />
                  <span className="underline text-blue-600">
                    {jobview.location}
                  </span>
                </div>
                <div className="hidden md:block">
                  {new Date(jobview.creationdate).toLocaleDateString("en-GB")} (
                  {timeAgo(
                    new Date(jobview.creationdate).toLocaleDateString("en-GB")
                  )}
                  )
                </div>
                <div className="gap-3 hidden md:flex mt-3 items-center text-sm lg:text-base">
                  {isJobApplied ? (
                    <button
                      type="button"
                      disabled
                      className="bg-blue-600 p-2 rounded-md text-white"
                    >
                      Applied
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleApply}
                      className="bg-blue-600 p-2 rounded-md hover:bg-blue-500 text-white"
                    >
                      Apply
                    </button>
                  )}
                  <Tooltip tooltipText={"Share"}>
                    <FaShare fontSize={20} onClick={handleShare} />
                  </Tooltip>
                  {isJobSaved ? (
                    <PiBookmarkSimpleFill fontSize={20} />
                  ) : (
                    <Tooltip tooltipText={"Save"}>
                      <PiBookmarkSimpleBold
                        fontSize={25}
                        onClick={handleSave}
                      />
                    </Tooltip>
                  )}
                </div>
              </div>

              {/* Right Details */}
              <div>
                <div className="flex gap-2">
                  <span>
                    <FaDollarSign fontSize={16} />
                  </span>
                  {jobview.salary_type === "negotiable" ? (
                    <span>Negotiable</span>
                  ) : (
                    <span>
                      {jobview.salary_type === "per annum"
                        ? salaryPerAnnum(jobview.rateperhour)
                        : jobview.rateperhour}{" "}
                      {jobview.salary_type}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <span>
                    <BsBriefcase fontSize={16} />
                  </span>
                  <span>{jobview.jobtype}</span>
                </div>
                <div className="flex gap-2">
                  <span>
                    <BsCalendar3 fontSize={16} />
                  </span>
                  <span>{jobview.duration}</span>
                </div>
                <div className="flex gap-2">
                  <span>
                    <FaRegClock fontSize={16} />
                  </span>
                  <span>{jobview.weeklyperhour} hours per week</span>
                </div>
                {jobview.numberofvacancies > 1 && (
                  <div className="flex gap-2">
                    <span>
                      <MdOutlinePeopleOutline fontSize={16} />
                    </span>
                    <span>{jobview.numberofvacancies} Vacancies</span>
                  </div>
                )}
                {jobview.training?.includes("Yes") && (
                  <div className="flex gap-2">
                    <span>
                      <FaCheckSquare fontSize={16} />
                    </span>
                    <span>Training provided</span>
                  </div>
                )}
                {jobview.benifits && (
                  <div className="flex items-center gap-2">
                    {jobview.benifits?.includes("Accommodation") && (
                      <Tooltip tooltipText={"Accommodation"}>
                        <span>
                          <IoHomeOutline fontSize={16} />
                        </span>
                      </Tooltip>
                    )}
                    {jobview.benifits?.includes("Food") && (
                      <Tooltip tooltipText={"Food"}>
                        <span>
                          <GiHotMeal fontSize={16} />
                        </span>
                      </Tooltip>
                    )}
                    {jobview.benifits?.includes("Transport") && (
                      <Tooltip tooltipText={"Transport"}>
                        <span>
                          <PiCarProfileThin fontSize={17} />
                        </span>
                      </Tooltip>
                    )}
                    <span style={{ paddingTop: "2px" }}>Benefits</span>
                  </div>
                )}
                <div className="block mt-3 md:hidden">
                  {new Date(jobview.creationdate).toLocaleDateString("en-GB")} (
                  {timeAgo(
                    new Date(jobview.creationdate).toLocaleDateString("en-GB")
                  )}
                  )
                </div>
                <div className="flex gap-3 md:hidden mt-2 items-center text-sm lg:text-base">
                  {isJobApplied ? (
                    <button
                      type="button"
                      disabled
                      className="bg-blue-600 p-2 rounded-md text-white"
                    >
                      Applied
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleApply}
                      className="bg-blue-600 p-2 rounded-md hover:bg-blue-500 text-white"
                    >
                      Apply
                    </button>
                  )}
                  <Tooltip tooltipText={"Share"}>
                    <FaShare fontSize={20} onClick={handleShare} />
                  </Tooltip>
                  {isJobSaved ? (
                    <PiBookmarkSimpleFill fontSize={20} />
                  ) : (
                    <Tooltip tooltipText={"Save"}>
                      <PiBookmarkSimpleBold
                        fontSize={25}
                        onClick={handleSave}
                      />
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>

            {/* Description Box */}
            <div className="text-sm lg:text-base border-2 border-green-300 rounded m-4 p-3">
              <div>{markdownToText(jobview.description)}</div>
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  {isJobApplied ? (
                    <button
                      type="button"
                      disabled
                      className="bg-blue-600 p-2 rounded-md text-white"
                    >
                      Applied
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleApply}
                      className="bg-blue-600 p-2 rounded-md hover:bg-blue-500 text-white"
                    >
                      Apply
                    </button>
                  )}
                  <Tooltip tooltipText={"Share"} size={11}>
                    <FaShare fontSize={25} onClick={handleShare} />
                  </Tooltip>
                  {isJobSaved ? (
                    <PiBookmarkSimpleFill fontSize={25} />
                  ) : (
                    <Tooltip tooltipText={"Save"} size={11}>
                      <PiBookmarkSimpleBold
                        fontSize={25}
                        onClick={handleSave}
                      />
                    </Tooltip>
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    className="bg-red-600 p-2 rounded-md text-white"
                    onClick={() =>
                      setShowModal({ show: true, type: "report" })
                    }
                  >
                    Report
                  </button>
                </div>
              </div>
            </div>

            {/* Youtube Iframe for Mobile */}
            <div className="block lg:hidden relative mx-4">
              <iframe
                className="rounded"
                id="youtube-video"
                src={`https://www.youtube.com/embed/${getYoutubeVideoId(
                  jobview.youtubeUrl
                )}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          {/* Ads Slot */}
          <div>
            <Ads />
          </div>
        </div>

        <Modal size="md" show={showModal.show} onHide={handleClose} centered>
          <Modal.Body className="text-sm lg:text-base">
            {showModal.type === "report" && (
              <ReportJob onReportJob={onReportJob} role={role} />
            )}
            {showModal.type === "apply" && (
              <UploadDocs
                job_id={params.id}
                user_id={userId}
                onApply={onApply}
                message={message}
              />
            )}
          </Modal.Body>
        </Modal>
      </>
    );

   
}
