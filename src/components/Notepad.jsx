import React, { useEffect, useState } from "react";
import axios from "../utils/Axios";

const Notepad = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get("/api/editor/get-content");
        console.log("Fetched content:", response.data);

        if (response.data.success) {
          setQuote(response.data.content); // Set the fetched content
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="p-5 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg min-h-[400px]">
      <h2 className="text-3xl font-bold mb-6 text-center">Notepad</h2>
      <div
        className="prose prose-lg border p-6 rounded-lg bg-white shadow"
        dangerouslySetInnerHTML={{ __html: quote }}
      />
    </div>
  );
};

export default Notepad;
