import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../../../helpers/http';

function AddGalleryItem() {
  const [form, setForm] = useState({
    thumb: '',
    full: '',
    location: '',
    category: '',
    videoId: ''
  });

  const [error, setError] = useState({
    thumb: false,
    full: false,
    location: false,
    category: false,
  });

  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState('alert alert-success');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Add Gallery Item';
  }, []);

  const handleInput = (name, value) => {
    setForm({ ...form, [name]: value });

    if (value === '') {
      setError((prev) => ({ ...prev, [name]: true }));
    } else {
      setError((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = () => {
    let isValid = true;
    const err = {};

    ['thumb', 'full', 'location', 'category'].forEach((field) => {
      if (!form[field]) {
        err[field] = true;
        isValid = false;
      }
    });

    setError(err);

    if (!isValid) return;

    http.post('/gallery-grid', form)
      .then(() => {
        setShowMsg(true);
        setMessage('Gallery item added successfully');
        setMsgClass('alert alert-success');
        setTimeout(() => navigate('/superadmin/gallery'), 2000);
      })
      .catch((err) => {
        setShowMsg(true);
        setMsgClass('alert alert-danger');
        setMessage(err?.response?.data?.message || err.message);
        setTimeout(() => setShowMsg(false), 5000);
      });

    window.scrollTo({ top: 40, behavior: 'smooth' });
  };

  return (
    <div className="container-md pt-4">
      <h3 className="fw-bold text-center fs-4">Add a Gallery Item</h3>

      {showMsg && <div className={msgClass}>{message}</div>}

      <form className="form-sample pt-3">
        <div className="col-md-9">
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Thumbnail URL <span className="text-danger">*</span></label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                value={form.thumb}
                onChange={(e) => handleInput('thumb', e.target.value)}
              />
              {error.thumb && <div className="text-danger">Please enter a thumbnail URL</div>}
              {form.thumb && <img src={form.thumb} className="mt-2" height="150" width="180" alt="thumb preview" />}
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Full Image URL <span className="text-danger">*</span></label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                value={form.full}
                onChange={(e) => handleInput('full', e.target.value)}
              />
              {error.full && <div className="text-danger">Please enter the full image URL</div>}
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Location <span className="text-danger">*</span></label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                value={form.location}
                onChange={(e) => handleInput('location', e.target.value)}
              />
              {error.location && <div className="text-danger">Please enter the location</div>}
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Category <span className="text-danger">*</span></label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                value={form.category}
                onChange={(e) => handleInput('category', e.target.value)}
              />
              {error.category && <div className="text-danger">Please enter a category</div>}
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
                onChange={(e) => handleInput('videoId', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-9">
            <button type="button" onClick={handleSubmit} className="btn btn-gradient-primary">Submit</button>
            <button type="button" className="btn btn-light float-end" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddGalleryItem;
