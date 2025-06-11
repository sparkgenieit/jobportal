
    import React, { useRef } from "react";
    import Ads from "../Ads/Ads";
    import { Modal } from "react-bootstrap";
    import Tooltip from "../../../components/Tooltip";
    import ReportJob from "./ReportJob";
    import UploadDocs from "./UploadDocs";
    import { BASE_API_URL } from "../../../helpers/constants";
    import { getYoutubeVideoId, timeAgo } from "../../../helpers/functions";
    import { markdownToText, salaryPerAnnum } from "../../../helpers/functions/textFunctions";
    import { FaDollarSign, FaRegClock, FaShare, FaYoutube } from "react-icons/fa6";
    import { PiBookmarkSimpleBold, PiBookmarkSimpleFill, PiCarProfileThin } from "react-icons/pi";
    import { MdOutlineLocationOn, MdOutlinePeopleOutline } from "react-icons/md";
    import { FaCheckSquare } from "react-icons/fa";
    import { GiHotMeal } from "react-icons/gi";
    import { IoHomeOutline } from "react-icons/io5";
    import { BsBriefcase, BsCalendar3 } from "react-icons/bs";

    function JobContent({
    jobview,
    isJobApplied,
    isJobSaved,
    handleApply,
    handleSave,
    handleShare,
    handleInfo,
    showModal,
    setShowModal, // ✅ Add this

    handleClose,
    onReportJob,
    onApply,
    userId,
    role,
    params,
    dispatch,
    message
    }) {
    const youtubeRef = useRef(null);

    return (
        <>
        <div className="m-0 p-0 grid md:grid-cols-3 mt-3">
            <div className="md:col-span-2 job-details-box">
            {jobview.banner && (
                <div className="mb-3 mx-4">
                <img
                    className="rounded border border-slate-200 w-full h-[40vh]"
                    src={`${BASE_API_URL}/uploads/banners/${jobview.banner}`}
                    alt={jobview.company}
                />
                </div>
            )}

            <div className="mb-3 mx-4 flex items-center justify-between logo-youtube-container">
                <div className="flex items-center gap-3 w-full justify-between lg:justify-start">
                {jobview.companyLogo && (
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

                {jobview.youtubeUrl && (
                <div className="relative hidden lg:block">
                    <iframe
                    ref={youtubeRef}
                    className="rounded logo-youtube"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    src={`https://www.youtube.com/embed/${getYoutubeVideoId(jobview.youtubeUrl)}`}
                    allowFullScreen
                    />
                    <span
                    role="button"
                    onClick={() => youtubeRef.current?.requestFullscreen()}
                    className="youtube-play-button"
                    >
                    <FaYoutube fontSize={70} fill="#FF3D00" />
                    </span>
                </div>
                )}
            </div>

            <div className="grid md:grid-cols-3 border-2 border-green-300 rounded mx-4 p-3 text-sm lg:text-base">
                <div className="md:col-span-2">
                <div className="font-bold text-xl">{jobview.jobTitle}</div>
                {jobview.jobCategory}/{jobview.subCategory}
                <div role="button" onClick={handleInfo}>
                    <MdOutlineLocationOn fontSize={20} />
                    <span className="underline text-blue-600">{jobview.location}</span>
                </div>
                <div className="hidden md:block">
                    {new Date(jobview.creationdate).toLocaleDateString("en-GB")} (
                    {timeAgo(new Date(jobview.creationdate).toLocaleDateString("en-GB"))})
                </div>
                <div className="gap-3 hidden md:flex mt-3 items-center text-sm lg:text-base">
                    {isJobApplied ? (
                    <button type="button" disabled className="bg-blue-600 p-2 rounded-md text-white">Applied</button>
                    ) : (
                    <button type="button" onClick={handleApply} className="bg-blue-600 p-2 rounded-md hover:bg-blue-500 text-white">Apply</button>
                    )}
                    <Tooltip tooltipText={"Share"}>
                    <FaShare fontSize={20} onClick={handleShare} />
                    </Tooltip>
                    {isJobSaved ? (
                    <PiBookmarkSimpleFill fontSize={20} />
                    ) : (
                    <Tooltip tooltipText={"Save"}>
                        <PiBookmarkSimpleBold fontSize={25} onClick={handleSave} />
                    </Tooltip>
                    )}
                </div>
                </div>

                <div>
                <div className="flex gap-2"><FaDollarSign fontSize={16} />
                    {jobview.salary_type === "negotiable" ? "Negotiable" : (
                    jobview.salary_type === "per annum" ? salaryPerAnnum(jobview.rateperhour) : jobview.rateperhour
                    ) + " " + jobview.salary_type}
                </div>
                <div className="flex gap-2"><BsBriefcase fontSize={16} />{jobview.jobtype}</div>
                <div className="flex gap-2"><BsCalendar3 fontSize={16} />{jobview.duration}</div>
                <div className="flex gap-2"><FaRegClock fontSize={16} />{jobview.weeklyperhour} hours per week</div>
                {jobview.numberofvacancies > 1 && (
                    <div className="flex gap-2"><MdOutlinePeopleOutline fontSize={16} />{jobview.numberofvacancies} Vacancies</div>
                )}
                {jobview.training?.includes("Yes") && (
                    <div className="flex gap-2"><FaCheckSquare fontSize={16} />Training provided</div>
                )}
                {jobview.benifits && (
                    <div className="flex items-center gap-2">
                    {jobview.benifits?.includes("Accommodation") && <Tooltip tooltipText={"Accommodation"}><IoHomeOutline fontSize={16} /></Tooltip>}
                    {jobview.benifits?.includes("Food") && <Tooltip tooltipText={"Food"}><GiHotMeal fontSize={16} /></Tooltip>}
                    {jobview.benifits?.includes("Transport") && <Tooltip tooltipText={"Transport"}><PiCarProfileThin fontSize={17} /></Tooltip>}
                    <span style={{ paddingTop: "2px" }}>Benefits</span>
                    </div>
                )}
                </div>
            </div>

            <div className="text-sm lg:text-base border-2 border-green-300 rounded m-4 p-3">
                <div>{markdownToText(jobview.description)}</div>
                <div className="flex justify-between items-center mt-4">
                <div className="flex gap-3 items-center">
                    {isJobApplied ? (
                    <button type="button" disabled className="bg-blue-600 p-2 rounded-md text-white">Applied</button>
                    ) : (
                    <button type="button" onClick={handleApply} className="bg-blue-600 p-2 rounded-md hover:bg-blue-500 text-white">Apply</button>
                    )}
                    <Tooltip tooltipText={"Share"} size={11}>
                    <FaShare fontSize={25} onClick={handleShare} />
                    </Tooltip>
                    {isJobSaved ? (
                    <PiBookmarkSimpleFill fontSize={25} />
                    ) : (
                    <Tooltip tooltipText={"Save"} size={11}>
                        <PiBookmarkSimpleBold fontSize={25} onClick={handleSave} />
                    </Tooltip>
                    )}
                </div>
                <button type="button" className="bg-red-600 p-2 rounded-md text-white" onClick={() => setShowModal({ show: true, type: "report" })}>Report</button>
                </div>
            </div>

            <div className="block lg:hidden relative mx-4">
                <iframe
                className="rounded"
                id="youtube-video"
                src={`https://www.youtube.com/embed/${getYoutubeVideoId(jobview.youtubeUrl)}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                />
            </div>
            </div>

            <div><Ads /></div>
        </div>

        <Modal size="md" show={showModal.show} onHide={handleClose} centered>
            <Modal.Body className="text-sm lg:text-base">
            {showModal.type === "report" && <ReportJob onReportJob={onReportJob} role={role} />}
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

    export default React.memo(JobContent);
