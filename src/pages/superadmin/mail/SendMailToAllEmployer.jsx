import { useEffect, useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import http from "../../../helpers/http";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";

export default function SendMailToAllEmployer() {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [error, setError] = useState("");

  const editorRef = useRef();
  const messageHook = useShowMessage();

  useEffect(() => {
    document.title = "Mail all the employers";
  }, []);

  const sendMessage = async () => {
    const content = editorRef.current?.getInstance().getMarkdown();

    if (!subject.trim()) {
      setError("Subject can't be empty");
      return;
    }

    if (!content.trim()) {
      setError("Message can't be empty");
      return;
    }

    setError("");
    setSendingMessage(true);

    try {
      const data = { subject, message: content };
      await http.post("/mails/mail-all-employers", data);
      messageHook({
        status: "success",
        message: "Messages Sent",
      });
      setSubject("");
      setMessage("");
      editorRef.current?.getInstance().reset();
    } catch (e) {
      messageHook({
        status: "error",
        error: e,
      });
    } finally {
      setSendingMessage(false);
    }
  };

  return (
    <div className="mt-3 container-fluid">
      <h3 className="text-center fw-bold fs-4">Mail all the employers</h3>

      <div className="d-flex mt-5 flex-column gap-4">
        <div className="row">
          <div className="col-lg-3">
            <label className="form-label">Subject:</label>
          </div>
          <div className="col-lg-9">
            <input
              name="subject"
              className="form-control"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
            />
          </div>
        </div>

        <div className="d-flex flex-column gap-2">
          <label className="form-label">Message:</label>
          <Editor
            previewStyle="vertical"
            height="400px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            ref={editorRef}
            initialValue=""
            onChange={() => {
              const currentMarkdown = editorRef.current
                ?.getInstance()
                .getMarkdown();
              setMessage(currentMarkdown);
            }}
          />
        </div>

        <div className="fs-6 fw-bold text-center text-danger">
          {error && error}
        </div>

        <div className="align-self-end">
          <button
            type="button"
            disabled={sendingMessage}
            onClick={sendMessage}
            className="btn btn-primary rounded-4"
          >
            {sendingMessage ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
