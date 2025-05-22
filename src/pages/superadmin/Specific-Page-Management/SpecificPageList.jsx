import { useEffect, useRef, useState } from "react";
import { Editor, Viewer } from "@toast-ui/react-editor";
import http from "../../../helpers/http";
import httpUpload from "../../../helpers/httpUpload";

import NavBarInfo from "../../../layouts/common/navbarItems";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import ToastViewer from "../../../components/common/ToastViewer";
import { BASE_API_URL } from '../../../helpers/constants';

const SpecificPagesList = ({ pageType = "special" }) => {
  const getValue = (path) => path.split("/").at(-1);

  const Categories = { ...NavBarInfo };
  let pageCategories;

  if (pageType === "b2b") {
    const transformData = (data) =>
      data.reduce((acc, item) => {
        acc[item.heading] = [...item.links];
        return acc;
      }, {});
    pageCategories = transformData(Categories["b2B"]);
  } else {
    const keysToRemove = ["info", "b2B"];
    keysToRemove.forEach((key) => {
      delete Categories[key];
    });
    pageCategories = Categories;
  }

  const [category, setCategory] = useState("Select Category");
  const [page, setPage] = useState("Select Page");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [viewOnlyMode, setViewOnlyMode] = useState(false);

  const toastEditorRef = useRef();
  const message = useShowMessage();

  useEffect(() => {
    const fetchPageContent = async () => {
      if (category !== "Select Category" && page !== "Select Page") {
        try {
          const response = await http.get(`/cms/?category=${category}&page=${page}`);
          setContent(response?.data?.content || "");
          setShowEditor(true);
        } catch (err) {
          console.error("Error fetching page content:", err);
          setContent("");
          setShowEditor(true);
        }
      } else {
        setShowEditor(false);
      }
    };

    fetchPageContent();
  }, [category, page]);

  useEffect(() => {
    if (!viewOnlyMode && toastEditorRef.current && content?.trim()) {
      const instance = toastEditorRef.current.getInstance();
      const current = instance.getMarkdown();
      if (current !== content) {
        instance.setMarkdown(content);
      }
    }
  }, [content, viewOnlyMode]);

  const savePage = async () => {
    if (!content || content.trim() === "") {
      setError("Content can't be empty");
      return;
    }

    setError("");
    setSending(true);

    try {
      const data = { category, page, content };
      await http.post("/cms/", data);
      message({ status: "success", message: "Content updated successfully" });
    } catch (err) {
      console.error("Save error:", err);
      message({ status: "error", message: "Failed to update content" });
    } finally {
      setSending(false);
    }
  };

  const handleEditorChange = () => {
    const instance = toastEditorRef.current?.getInstance();
    if (instance) {
      setContent(instance.getMarkdown());
    }
  };

  return (
    <div className="container-fluid">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold text-center mb-4">Specific Pages List</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <label>Select Page</label>
          <div className="md:col-span-3 flex gap-3">
            <select
              className="border rounded px-3 py-2"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage("Select Page");
                setContent("");
                setShowEditor(false);
              }}
            >
              <option>Select Category</option>
              {Object.keys(pageCategories).map((title, index) => (
                <option key={index}>{title}</option>
              ))}
            </select>

            <select
              className="border rounded px-3 py-2"
              value={page}
              onChange={(e) => setPage(e.target.value)}
            >
              <option>Select Page</option>
              {pageCategories[category]?.map((pg, i) => (
                <option key={i} value={getValue(pg.path)}>
                  {pg.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {showEditor && (
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-lg">Page Content</label>
              <button
                onClick={() => setViewOnlyMode(!viewOnlyMode)}
                className="btn btn-outline-secondary text-sm"
              >
                {viewOnlyMode ? "Switch to Edit Mode" : "Switch to View Mode"}
              </button>
            </div>

            <div className="mt-4">
              {viewOnlyMode ? (
                <ToastViewer content={content} loading={!content} />
              ) : (
                <Editor
                  previewStyle="vertical"
                  height="500px"
                  initialEditType="wysiwyg"
                  hideModeSwitch={true}
                  useCommandShortcut={true}
                  ref={toastEditorRef}
                  onChange={handleEditorChange}
                  hooks={{
                    addImageBlobHook: async (blob, callback) => {
                      const formData = new FormData();
                      formData.append('file', blob);
                      try {
                        const res = await httpUpload.post('/cms/upload-image', formData);
                        const uploadedUrl = `${BASE_API_URL}${res.data.url}`;
                        if (res.data.url) {
                          callback(uploadedUrl, 'image');
                        } else {
                          alert('Failed to upload image');
                        }
                      } catch (error) {
                        console.error('Image upload error:', error);
                        alert('Image upload failed');
                      }
                    }
                  }}
                />
              )}
            </div>

            {error && (
              <div className="text-red-600 text-sm font-medium mt-2">{error}</div>
            )}

            <div className="mt-4 text-end">
              <button
                onClick={savePage}
                className="btn btn-primary rounded"
                disabled={sending}
              >
                {sending ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecificPagesList;