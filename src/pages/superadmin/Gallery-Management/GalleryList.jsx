import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../../../helpers/http';
import { BASE_API_URL } from '../../../helpers/constants';

const GalleryList = () => {
  const [gallery, setGallery] = useState([]);
  const [msg, setMsg] = useState({ show: false, message: '', class: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    document.title = 'Gallery';
  }, []);

  const fetchData = () => {
    http.get('/gallery-grid')
      .then((res) => setGallery(res.data))
      .catch((err) => {
        console.error('Error fetching gallery items:', err);
      });
  };

  const handleDelete = (item) => {
    http.delete(`/gallery-grid/${item._id}`)
      .then(() => {
        setMsg({ show: true, class: 'alert alert-success', message: 'Gallery item deleted' });
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
    navigate(`/superadmin/gallery/edit/${item._id}`);
  };

  return (
    <div className="container-fluid pt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <h3 className="fs-4 text-center fw-bold">Gallery Management</h3>
        <button
          type="button"
          className="btn btn-gradient-primary"
          onClick={() => navigate('/superadmin/gallery/add')}
        >
          Add
        </button>
      </div>

      {msg.show && <div className={msg.class}>{msg.message}</div>}

      <div className="table-responsive mt-4">
        <table className="table text-center">
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Location</th>
              <th>Category</th>
              <th>Video</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {gallery.map((item, index) => (
              <tr key={index}>
                <td><img src={item.thumb} className="w-25" alt="thumb" /></td>
                <td>{item.location}</td>
                <td>{item.category}</td>
                <td>{item.videoId ? '🎬' : '-'}</td>
                <td>
                  <button
                    onClick={() => handleEdit(item)}
                    className="btn btn-gradient-primary"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-gradient-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GalleryList;
