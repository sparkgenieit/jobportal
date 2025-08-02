import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "../../../helpers/http";
import { BASE_API_URL } from "../../../helpers/constants";

function EditGalleryItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    thumb: "",
    full: "",
    location: "",
    category: "",
    videoId: "",
  });

  const [error, setError] = useState({
    thumb: false,
    full: false,
    location: false,
    category: false,
  });

  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState("alert alert-success");
  const [message, setMessage] = useState("");

  useEffect(() => {
    http
      .get(`/gallery-grid/${id}`)
      .then((res) => {
        setForm(res.data);
        document.title = `Edit - ${res.data.location}`;
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
    if (value === "") {
      setError((prev) => ({ ...prev, [name]: true }));
    } else {
      setError((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = () => {
    let isValid = true;
    const err = {};

    ["thumb", "full", "location", "category"].forEach((field) => {
      if (!form[field]) {
        err[field] = true;
        isValid = false;
      }
    });

    setError(err);
    if (!isValid) return;

    http
      .put(`/gallery-grid/${id}`, form)
      .then(() => {
        setShowMsg(true);
        setMessage("Gallery item updated successfully");
        setMsgClass("alert alert-success");
        setTimeout(() => navigate("/superadmin/gallery"), 2000);
      })
      .catch((err) => {
        setShowMsg(true);
        setMessage(err?.response?.data?.message || err.message);
        setMsgClass("alert alert-danger");
        setTimeout(() => setShowMsg(false), 5000);
      });

    window.scrollTo({ top: 40, behavior: "smooth" });
  };

  return (
    <div className="container-md pt-4">
      <h3 className="fw-bold text-center fs-4">Edit Gallery Item</h3>

      {showMsg && <div className={msgClass}>{message}</div>}

      <form className="form-sample pt-3">
        <div className="col-md-9">
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">
              Thumbnail URL<span className="text-danger">*</span>
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                value={form.thumb}
                onChange={(e) => handleChange("thumb", e.target.value)}
              />
              {error.thumb && (
                <div className="text-danger">Please enter thumbnail URL</div>
              )}
              {form.thumb && (
                <img
                  src={
                    form.thumb.startsWith("http")
                      ? form.thumb
                      : `${BASE_API_URL}${form.thumb}`
                  }
                  className="mt-2"
                  height="100"
                  alt="preview"
                />
              )}{" "}
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">
              Full Image URL<span className="text-danger">*</span>
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                value={form.full}
                onChange={(e) => handleChange("full", e.target.value)}
              />
              {error.full && (
                <div className="text-danger">Please enter full image URL</div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">
              Location<span className="text-danger">*</span>
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
              {error.location && (
                <div className="text-danger">Please enter location</div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">
              Category<span className="text-danger">*</span>
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
              />
              {error.category && (
                <div className="text-danger">Please enter category</div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">YouTube Video ID</label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                value={form.videoId}
                onChange={(e) => handleChange("videoId", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-9">
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-gradient-primary"
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-light float-end"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditGalleryItem;
