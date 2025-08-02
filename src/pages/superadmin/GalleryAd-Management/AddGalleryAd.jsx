import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../../../helpers/http';

export default function AddGalleryAd() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [form, setForm] = useState({
    adTitle: '',
    adText: '',
    location: '',
    category: '',
    ctaLink: '',
    ctaButton: '',
    buttonColor: '',
    googleTrackLink: '',
    blockImageSEO: '',
    hoverImageSEO: '',
    youtubeLink: '',
  });

  const [blockImageFile, setBlockImageFile] = useState(null);
  const [hoverImageFile, setHoverImageFile] = useState(null);
  const [previewBlock, setPreviewBlock] = useState(null);
  const [previewHover, setPreviewHover] = useState(null);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [msgClass, setMsgClass] = useState('');
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    document.title = 'Add Gallery Ad';
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (value.trim() !== '') {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleFileChange = (setter, previewSetter) => (e) => {
    const file = e.target.files[0];
    if (file) {
      setter(file);
      previewSetter(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['adTitle', 'adText', 'location', 'category'];
    const newErrors = {};
    let isValid = true;

    requiredFields.forEach(field => {
      if (!form[field]?.trim()) {
        newErrors[field] = true;
        isValid = false;
      }
    });

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (blockImageFile) formData.append('images', blockImageFile);
    if (hoverImageFile) formData.append('images', hoverImageFile);

    try {
      await http.post('/gallery-ad', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMsgClass('alert alert-success');
      setMessage('Gallery Ad added successfully!');
      setShowMsg(true);

      setTimeout(() => {
        navigate('/superadmin/gallery-ad');
      }, 1500);
    } catch (err) {
      setMsgClass('alert alert-danger');
      setMessage(err?.response?.data?.message || 'Failed to add ad');
      setShowMsg(true);
      setTimeout(() => setShowMsg(false), 3000);
    }
  };

  return (
    <div className="container-md pt-4">
      <h3 className="fw-bold text-center fs-4">Add a Gallery Advertisement</h3>

      {showMsg && <div className={msgClass}>{message}</div>}

      <form onSubmit={handleSubmit} ref={formRef} encType="multipart/form-data" className="form-sample pt-3">

        {/* Text Inputs */}
        {[
          { label: 'Ad Title', name: 'adTitle', required: true },
          { label: 'Ad Text', name: 'adText', required: true },
          { label: 'Location', name: 'location', required: true },
          { label: 'Category', name: 'category', required: true },
          { label: 'Call to Action Link', name: 'ctaLink' },
          { label: 'Call to Action Button Text', name: 'ctaButton' },
          { label: 'Google Track Link', name: 'googleTrackLink' },
          { label: 'Image Title for SEO', name: 'blockImageSEO' },
          { label: 'Hover Image Title for SEO', name: 'hoverImageSEO' },
          { label: 'YouTube Link', name: 'youtubeLink' }
        ].map(({ label, name, required }) => (
          <div className="col-md-9" key={name}>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">
                {label} {required && <span className="text-danger">*</span>}
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name={name}
                  className="form-control"
                  value={form[name] || ''}
                  onChange={handleInputChange}
                />
                {errors[name] && <div className="text-danger">Please enter {label.toLowerCase()}</div>}
              </div>
            </div>
          </div>
        ))}

        {/* Block Image Upload */}
        <div className="col-md-9">
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Block Image</label>
            <div className="col-sm-9">
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleFileChange(setBlockImageFile, setPreviewBlock)}
              />
              {previewBlock && (
                <img
                  src={previewBlock}
                  alt="Block"
                  className="mt-2"
                  width={180}
                  height={150}
                />
              )}
            </div>
          </div>
        </div>

        {/* Hover Image Upload */}
        <div className="col-md-9">
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Hover/Clicked Image</label>
            <div className="col-sm-9">
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleFileChange(setHoverImageFile, setPreviewHover)}
              />
              {previewHover && (
                <img
                  src={previewHover}
                  alt="Hover"
                  className="mt-2"
                  width={180}
                  height={150}
                />
              )}
            </div>
          </div>
        </div>

        {/* Button Color Dropdown */}
        <div className="col-md-9">
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Button Colour</label>
            <div className="col-sm-9">
              <select
                className="form-control"
                name="buttonColor"
                value={form.buttonColor}
                onChange={handleInputChange}
              >
                <option value="">Select a color</option>
                <option value="#FF0000">Red</option>
                <option value="#00FF00">Green</option>
                <option value="#0000FF">Blue</option>
                <option value="#FFA500">Orange</option>
                <option value="#800080">Purple</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="row mt-4">
          <div className="col-md-9">
            <button type="submit" className="btn btn-gradient-primary">Submit</button>
            <button type="button" className="btn btn-light float-end" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </div>

      </form>
    </div>
  );
}
