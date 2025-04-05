import { useState, useEffect } from 'react';
import NavBarInfo from '../../../layouts/common/navbarItems';
import http from "../../../helpers/http";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SpecificPagesList = ({ pageType = 'special' }) => {
  const getValue = (path) => path.split("/").at(-1);

  const Categories = { ...NavBarInfo };
  let pageCategories;

  if (pageType === 'b2b') {
    const transformData = (data) =>
      data.reduce((acc, item) => {
        acc[item.heading] = [...item.links];
        return acc;
      }, {});
    pageCategories = transformData(Categories['b2B']);
  } else {
    const keysToRemove = ['places', 'regions', 'info', 'b2B'];
    keysToRemove.forEach((key) => {
      delete Categories[key];
    });
    pageCategories = Categories;
  }

  const [category, setCategory] = useState('Select Category');
  const [page, setPage] = useState('Select Page');
  const [content, setContent] = useState('');
  const [sendingSpecificPage, setSendingSpecificPage] = useState(false);
  const [error, setError] = useState('');
  const [showEditor, setShowEditor] = useState(false);
      const message = useShowMessage()
  

  useEffect(() => {
    const fetchPageContent = async () => {
      if (category !== 'Select Category' && page !== 'Select Page') {
        try {
          const response = await http.get(`/cms/?category=${category}&page=${page}`);
          setContent(response?.data?.content || '');
          setShowEditor(true);
        } catch (err) {
          console.error("Error fetching page content:", err);
          setContent('');
          setShowEditor(true); // still show editor for new content
        }
      } else {
        setShowEditor(false);
      }
    };

    fetchPageContent();
  }, [category, page]);

  const saveSpecificPage = async () => {
    if (!content || content.trim() === "") {
      setError("Content can't be empty");
      return;
    } else {
      setError("");
    }

    try {
      setSendingSpecificPage(true);
      const data = { category, page, content };
      await http.post("/cms/", data);
      message({ status: "success", message: "Updated Content" })
    } catch (e) {
      console.error("Error saving page:", e);
    } finally {
      setSendingSpecificPage(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="content-wrapper bg-white">
        <h3 className="fs-4 text-center fw-bold">Specific Pages List</h3>
        <div className="grid lg:grid-cols-4">
          <label>Select Page</label>
          <div className="lg:col-span-3 flex gap-3">
            <select
              className="border capitalize border-slate-600 rounded-md px-3 py-2"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage('Select Page');
                setShowEditor(false);
              }}
            >
              <option value="Select Category">Select Category</option>
              {Object.keys(pageCategories).map((title, index) => (
                <option className="capitalize" key={index}>
                  {title}
                </option>
              ))}
            </select>
            <select
              value={page}
              name="page"
              onChange={(e) => {
                setPage(e.target.value);
              }}
              className="border border-slate-600 rounded-md px-3 py-2"
            >
              <option value="Select Page">Select Page</option>
              {pageCategories[category]?.map((page, index) => (
                <option key={index} value={getValue(page.path)}>
                  {page.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {showEditor && (
          <div className="mt-3 container-fluid">
            <div className="d-flex mt-5 flex-column gap-4">
              <div className="d-flex flex-column gap-2">
                <label className="form-label">Page Content:</label>
                <ReactQuill theme="snow" value={content} onChange={setContent} />
              </div>

              <div className="fs-6 fw-bold text-center text-danger">{error && error}</div>

              <div className="align-self-end">
                <button
                  type="button"
                  disabled={sendingSpecificPage}
                  onClick={saveSpecificPage}
                  className="btn btn-primary rounded-4"
                >
                  {sendingSpecificPage ? "Adding..." : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecificPagesList;
