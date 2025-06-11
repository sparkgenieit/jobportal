import { useEffect, useMemo, useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import http from "../../../helpers/http";
import httpUpload from "../../../helpers/httpUpload";
import NavBarInfo from "../../../layouts/common/navbarItems";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import ToastViewer from "../../../components/common/ToastViewer";
import { BASE_API_URL } from "../../../helpers/constants";

const GENERAL_PAGES = ["home", "jobs"];

const SpecificPagesList = () => {
  const [pageType, setPageType] = useState("special");
  const [category, setCategory] = useState("Select Category");
  const [page, setPage] = useState("Select Page");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [viewOnlyMode, setViewOnlyMode] = useState(false);
  const [showMetaFields, setShowMetaFields] = useState(false);

  const [metaTitle, setMetaTitle] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const toastEditorRef = useRef();
  const message = useShowMessage();

  const getValue = (path) => path.split("/").at(-1);
  const isGeneral = pageType === "general";

  const pageCategories = useMemo(() => {
    if (pageType === "b2b") {
      return NavBarInfo["b2B"].reduce((acc, item) => {
        acc[item.heading] = [...item.links];
        return acc;
      }, {});
    } else if (pageType === "special") {
      return Object.fromEntries(Object.entries(NavBarInfo).filter(([key]) => key !== "b2B"));
    } else {
      return { general: GENERAL_PAGES.map((title) => ({ title, path: `/general/${title}` })) };
    }
  }, [pageType]);

  useEffect(() => {
    const fetchPageContent = async () => {
      if (page !== "Select Page" && (!isGeneral && category !== "Select Category")) {
        try {
          const response = await http.get(`/cms/?category=${category}&page=${page}`);
          const newContent = response?.data?.content || "";
          setContent(newContent);
          setShowEditor(true);
          setTimeout(() => {
            const instance = toastEditorRef.current?.getInstance();
            if (instance) {
              instance.setMarkdown("");
              setTimeout(() => instance.setMarkdown(newContent), 30);
            }
          }, 10);
        } catch (err) {
          console.error("Error fetching page content:", err);
          setContent("");
          setShowEditor(true);
        }
      } else {
        setShowEditor(false);
      }

      if (page !== "Select Page") {
        try {
          const metaRes = await http.get(
            isGeneral
              ? `/meta/?page=${page}`
              : `/meta/?page=${page}&category=${category}`
          );
          setMetaTitle(metaRes?.data?.title || "");
          setMetaKeywords(metaRes?.data?.keywords || "");
          setMetaDescription(metaRes?.data?.description || "");
        } catch {
          setMetaTitle("");
          setMetaKeywords("");
          setMetaDescription("");
        }
      }
    };

    fetchPageContent();
  }, [category, page, pageType]);

  const savePage = async () => {
    if (!isGeneral && (!content || content.trim() === "")) {
      setError("Content can't be empty");
      return;
    }

    setError("");
    setSending(true);

    try {
      if (!isGeneral) {
        await http.post("/cms/", { category, page, content });
      }

      await http.post("/meta/", {
        page,
        ...(isGeneral ? {} : { category }),
        title: metaTitle,
        keywords: metaKeywords,
        description: metaDescription,
      });

      message({ status: "success", message: "Saved successfully" });
    } catch (err) {
      console.error("Save error:", err);
      message({ status: "error", message: "Save failed" });
    } finally {
      setSending(false);
    }
  };

  const handleEditorChange = () => {
    const instance = toastEditorRef.current?.getInstance();
    if (instance) {
      const updated = instance.getMarkdown();
      setContent(updated);
    }
  };

  return (
    <div className="container-fluid">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold text-center mb-4">Specific Pages List</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-1">
            <label className="font-semibold block mb-1">Page Type</label>
            <select
              className="border rounded px-3 py-2 w-full"
              value={pageType}
              onChange={(e) => {
                const newType = e.target.value;
                setPageType(newType);
                setCategory("Select Category");
                setPage("Select Page");
                setContent("");
                setShowEditor(false);
                setShowMetaFields(newType === "general");
              }}
            >
              <option value="special">Special</option>
              <option value="b2b">B2B</option>
              <option value="general">General</option>
            </select>
          </div>

          {!isGeneral && (
            <div className="md:col-span-1">
              <label className="font-semibold block mb-1">Category</label>
              <select
                className="border rounded px-3 py-2 w-full"
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
            </div>
          )}

          <div className="md:col-span-1">
            <label className="font-semibold block mb-1">Page</label>
            <select
              className="border rounded px-3 py-2 w-full"
              value={page}
              onChange={(e) => setPage(e.target.value)}
            >
              <option>Select Page</option>
              {(pageCategories[isGeneral ? "general" : category] || []).map((pg, i) => (
                <option key={i} value={getValue(pg.path)}>
                  {pg.title}
                </option>
              ))}
            </select>
          </div>

          {!isGeneral && page !== "Select Page" && (
            <div className="md:col-span-1 flex items-end justify-end">
              <button
                onClick={() => setShowMetaFields(!showMetaFields)}
                className="btn btn-outline-secondary"
              >
                {showMetaFields ? "Hide Meta SEO" : "Show Meta SEO"}
              </button>
            </div>
          )}
        </div>

        {(isGeneral || showMetaFields) && page !== "Select Page" && (
          <div className="mt-4 grid grid-cols-1 gap-4">
            <div>
              <label className="block font-medium mb-1">Meta Title</label>
              <input
                className="w-full border px-3 py-2 rounded"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Meta Keywords</label>
              <input
                className="w-full border px-3 py-2 rounded"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Meta Description</label>
              <textarea
                className="w-full border px-3 py-2 rounded"
                value={metaDescription}
                rows={3}
                onChange={(e) => setMetaDescription(e.target.value)}
              />
            </div>
          </div>
        )}

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
                      formData.append("file", blob);
                      try {
                        const res = await httpUpload.post("/cms/upload-image", formData);
                        const uploadedUrl = `${BASE_API_URL}${res.data.url}`;
                        if (res.data.url) {
                          callback(uploadedUrl, "image");
                        } else {
                          alert("Failed to upload image");
                        }
                      } catch (error) {
                        console.error("Image upload error:", error);
                        alert("Image upload failed");
                      }
                    }
                  }}
                />
              )}
            </div>

            {error && (
              <div className="text-red-600 text-sm font-medium mt-2">{error}</div>
            )}

            
          </div>
        )}

        {(showEditor || isGeneral) && (
  <div className="mt-6 text-end">
    <button
      onClick={savePage}
      className="btn btn-primary rounded"
      disabled={sending}
    >
      {sending ? "Saving..." : "Save"}
    </button>
  </div>
)}
      </div>
    </div>
  );
};

export default SpecificPagesList;
