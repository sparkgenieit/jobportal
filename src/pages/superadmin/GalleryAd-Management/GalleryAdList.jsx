import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../../../helpers/http';
import { BASE_API_URL } from "../../../helpers/constants";


const GalleryAdList = () => {
  const [ads, setAds] = useState([]);
  const [msg, setMsg] = useState({ show: false, message: '', class: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchAds();
    document.title = 'Gallery Ad Management';
  }, []);

  const fetchAds = () => {
    http.get('/gallery-ad')
      .then((res) => setAds(res.data))
      .catch((err) => {
        console.error('Error fetching gallery ads:', err);
      });
  };

  const handleDelete = (item) => {
    http.delete(`/gallery-ad/${item._id}`)
      .then(() => {
        setMsg({ show: true, class: 'alert alert-success', message: 'Ad deleted successfully' });
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        setMsg({
          show: true,
          class: 'alert alert-danger',
          message: err?.response?.data?.message || err.message
        });
        setTimeout(() => setMsg({ ...msg, show: false }), 1500);
      });
  };

  const handleEdit = (item) => {
    navigate(`/superadmin/gallery-ad/edit/${item._id}`);
  };

  const getImageUrl = (filename) => {
    return filename?.startsWith('http')
      ? filename
      : `${BASE_API_URL}/uploads/gallery-ads/${filename}`;
  };

  return (
    <div className="container-fluid pt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <h3 className="fs-4 text-center fw-bold">Gallery Advertisement</h3>
        <button
          type="button"
          className="btn btn-gradient-primary"
          onClick={() => navigate('/superadmin/gallery-ad/add')}
        >
          Add
        </button>
      </div>

      {msg.show && <div className={msg.class}>{msg.message}</div>}

      <div className="table-responsive mt-4">
        <table className="table text-center">
          <thead>
            <tr>
              <th>Block Image</th>
              <th>Hover Image</th>
              <th>Title</th>
              <th>Location</th>
              <th>Category</th>
              <th>CTA Button</th>
              <th>Color</th>
              <th colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            {ads.map((item, index) => (
              <tr key={index}>
                <td>
                  {item.blockImage ? (
                    <img
                      src={getImageUrl(item.blockImage)}
                      alt="Block"
                      height="60"
                      width="100"
                      className="rounded"
                    />
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {item.hoverImage ? (
                    <img
                      src={getImageUrl(item.hoverImage)}
                      alt="Hover"
                      height="60"
                      width="100"
                      className="rounded"
                    />
                  ) : (
                    '-'
                  )}
                </td>
                <td>{item.adTitle}</td>
                <td>{item.location}</td>
                <td>{item.category}</td>
                <td>{item.ctaButton || '-'}</td>
                <td>
                  {item.buttonColor ? (
                    <span
                      style={{
                        backgroundColor: item.buttonColor,
                        padding: '2px 8px',
                        color: '#fff',
                        borderRadius: '4px',
                      }}
                    >
                      {item.buttonColor}
                    </span>
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(item)}
                    className="btn btn-gradient-primary btn-sm"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-gradient-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {ads.length === 0 && (
              <tr>
                <td colSpan="9">No ads found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GalleryAdList;
