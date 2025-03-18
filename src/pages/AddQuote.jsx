import React, { useState, useEffect } from "react";
import axios from "../utils/Axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../index.css";

const AddQuote = () => {
  const navigate = useNavigate();
  
  // Load from sessionStorage if available
  const storedData = sessionStorage.getItem("editorData");
  const initialData = storedData ? JSON.parse(storedData) : { content: "", title: "" };
  const [editorData, setEditorData] = useState(initialData);

  // Effect to update sessionStorage whenever editorData changes
  useEffect(() => {
    sessionStorage.setItem("editorData", JSON.stringify(editorData));
  }, [editorData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!editorData.content.trim()) {
      toast.error("Content cannot be empty!");
      return;
    }

    try {
      const response = await axios.post("/api/editor/save-content", {
        title: editorData.title,
        content: editorData.content,
      });

      if (response.data.success) {
        toast.success("Content saved successfully!");
        // sessionStorage.removeItem("editorData"); // Clear sessionStorage after saving
        navigate("/dashboard/notepad");
      } else {
        toast.error("Failed to save content!");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Failed to save the content!");
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl font-bold mb-6 text-center">Notepad</h2>

      {/* CKEditor */}
      <CKEditor
        editor={ClassicEditor}
        data={editorData.content || ""}
        config={{
          toolbar: [
            "heading", "|", "bold", "italic", "underline", "strikethrough", "link",
            "bulletedList", "numberedList", "blockQuote", "|", "undo", "redo", "|",
            "alignment",
          ],
          alignment: { options: ["left", "center", "right", "justify"] },
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData((prev) => ({ ...prev, content: data }));
        }}
      />

      {/* Save Button */}
      <button
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
        onClick={handleSubmit}
      >
        Save Content
      </button>
    </div>
  );
};

export default AddQuote;
