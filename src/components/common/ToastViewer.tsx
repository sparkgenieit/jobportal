import React from "react"; // ✅ Add this
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { useEffect, useState } from "react";

interface ToastViewerProps {
  content?: string;
  loading?: boolean;
}

export default function ToastViewer({ content = "", loading = false }: ToastViewerProps) {
  const [isClient, setIsClient] = useState(false);

  // Avoid SSR issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (loading) {
    return <div>Loading content...</div>;
  }

  if (!isClient) return null;

  return (
    <div className="border p-3 rounded bg-white shadow-sm">
      {content?.trim() ? (
        <Viewer initialValue={content} />
      ) : (
        <div className="text-muted">No content available.</div>
      )}
    </div>
  );
}
