import React, { useEffect, useRef, useState } from "react";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

interface ToastViewerProps {
  content?: string;
  loading?: boolean;
}

export default function ToastViewer({ content = "", loading = false }: ToastViewerProps) {
  const [isClient, setIsClient] = useState(false);
  const viewerRef = useRef<any>(null); // Viewer doesn't have good types, use `any`

  // Set client-side flag to avoid SSR issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update content dynamically
  useEffect(() => {
    if (viewerRef.current && content?.trim()) {
      viewerRef.current.getInstance().setMarkdown(content);
    }
  }, [content]);

  if (loading) {
    return <div>Loading content...</div>;
  }

  if (!isClient) return null;

  return (
    <div className="border p-3 rounded bg-white shadow-sm">
      <Viewer ref={viewerRef} />
    </div>
  );
}
