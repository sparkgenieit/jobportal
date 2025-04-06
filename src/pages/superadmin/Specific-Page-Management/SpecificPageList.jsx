import { useMemo, useState,useRef, useEffect } from 'react';
import NavBarInfo from '../../../layouts/common/navbarItems';
import http from "../../../helpers/http";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Register Image Resize module
import Quill from "quill";
import ImageResize from "quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);


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

      const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [savedRange, setSavedRange] = useState(null); // ⬅️ store the cursor range

  const quillRef = useRef(null);

  const handleInsertImage = () => {
    const editor = quillRef.current?.getEditor();
    if (editor && imageUrl) {
      if (savedRange) {
        editor.setSelection(savedRange.index, savedRange.length); // ⬅️ restore cursor
      }
      editor.insertEmbed(savedRange?.index || 0, "image", imageUrl);
      setShowImageModal(false);
      setImageUrl("");
    }
  };

      const modules = useMemo(() => ({
        toolbar: {
          container: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
            [{ 'insertImageUrl': 'Insert Image via URL' }] // Custom button (optional)
          ],
          handlers: {
            image: () => {
              const editor = quillRef.current?.getEditor();
              const range = editor?.getSelection();
              setSavedRange(range); // ⬅️ save the cursor position
              setShowImageModal(true); // open the modal
            }
          }
        },
        imageResize: {
          modules: ["Resize", "DisplaySize", "Toolbar"],
        },
      }), []);
  

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

                <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={[
                    "header", "bold", "italic", "underline", "list", "bullet", "link", "image"
                    ]}
                    style={{ height: "400px", marginBottom: "50px" }}
                />
                
              </div>
              {showImageModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{ background: "white", padding: "20px", borderRadius: "8px" }}>
            <h3>Insert Image via URL</h3>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              style={{ width: "300px", marginBottom: "10px" }}
            />
            <div>
              <button onClick={handleInsertImage} style={{ marginRight: "10px" }}>Insert</button>
              <button onClick={() => setShowImageModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
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
