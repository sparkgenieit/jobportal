import { useMemo } from "react";
import { marked } from "marked";
import parse from "html-react-parser";
import { BASE_API_URL } from "../../../helpers/constants";
import { timeAgo } from "../../../helpers/functions";

export default function AdminAd({ adView, handleApprove, setShow }) {
    const date = useMemo(() => new Date(adView?.creationdate).toLocaleDateString("en-GB"), [adView]);

    return (
        <>
            {adView && (
                <div className="d-flex flex-column gap-3 mt-3">
                    {/* Banner Image & Ad Details Combined */}
                    <div className="d-flex flex-column flex-md-row border border-success rounded p-3">
                        {adView.image && (
                            <img
                                style={{ maxWidth: "300px", maxHeight: "200px" }}
                                className="rounded border border-secondary me-md-3 mb-3 mb-md-0"
                                src={`${BASE_API_URL}/uploads/ads/${adView.image}`}
                                alt={adView.title}
                            />
                        )}

                        <div className="flex-grow-1">
                            <h4>{adView.title}</h4>
                            <p>{adView.location}</p>
                            <p>
                                <strong>Type:</strong> {adView.type} | <strong>End Date:</strong> {new Date(adView.end_date).toLocaleDateString()}
                            </p>
                            <p>
                                {date} ({timeAgo(date)})
                            </p>
                        </div>
                    </div>

                    {/* Redirect URL */}
                    {adView.redirect_url && (
                        <a href={adView.redirect_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            Visit Ad URL
                        </a>
                    )}

                    {/* Description */}
                    <div className="border border-success rounded p-3">
                        <p>{parse(marked(adView.description || ""))}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex justify-content-center gap-3 mt-3">
                        {adView.status !== "LIVE" && (
                            <button type="button" onClick={() => handleApprove(adView)} className="btn btn-success">
                                Approve
                            </button>
                        )}
                        {adView.status === "LIVE" && (
                            <button type="button" disabled className="btn btn-success">
                                Approved
                            </button>
                        )}
                        {adView.status === "REJECTED" && (
                            <button type="button" disabled className="btn btn-danger">
                                Rejected
                            </button>
                        )}
                        {adView.status !== "REJECTED" && (
                            <button type="button" onClick={() => setShow(true)} className="btn btn-outline-danger">
                                Reject
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
