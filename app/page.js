"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2, X, Rocket, GrapeIcon, BarChart } from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function Home() {
  const AnswerArea = [];
  const [fileName, setFileName] = useState(null);
  const [ansArea, setAnsArea] = useState([]);
  const [click, setClick] = useState(true);
  const [input, setInput] = useState("");
  const [fileLoading, setFileLoading] = useState(false);

  console.log(input);

  useEffect(() => {
    if (!fileName) return;

    console.log("Selected file: ", fileName);
    setFileLoading(true);

    //simulate time for async work
    const timer = setTimeout(() => {
      setFileLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [fileName, click,  setClick]);

  const handleChooseFile = async (e) => {
    const file = e?.target?.files[0];
    if (!file.name.endsWith(".pdf")) {
      toast.error("Only PDF files are allowed!", {
        style: {
          borderRadius: "12px",
          background: "rgba(255, 0, 0, 0.07)", // smooth, transparent red
          color: "#b91c1c",                   // modern deep red text
          border: "1px solid rgba(239, 68, 68, 0.3)", // subtle red border
          fontWeight: 600,
          padding: "12px 16px",
          backdropFilter: "blur(4px)",        // soft blur for transparency effect
          boxShadow: "0 4px 8px rgba(239, 68, 68, 0.1)", // soft red shadow
        },
        iconTheme: {
          primary: "#ef4444",                 // solid red icon
          secondary: "white",                 // white icon background
        },
      });


      return
    }

    if (file) {
      setFileName(file);
      const formData = new FormData();
      formData.append('pdf', file);
      setClick(false);

      try {
        const res = await axios.post("http://localhost:5000/api/upload/pdf",
          formData,
          {
            "Content-Type": "multipart/form-data",
          }
        );
      } catch (error) {
        console.log("Error in file upload", error);
        toast.error("File could not be uploaded", {
          style: {
            borderRadius: "10px",
            background: "white", // very light red
            color: "#b91c1c",       // calm red text
            border: "1px solid #fecaca", // soft red border
            fontWeight: 500,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          },
          iconTheme: {
            primary: "#ef4444", // red icon
            secondary: "#fef2f2", // matches background
          },
        });
      }
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
  }

  const handleSendResponce = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        prompt: "hey hii can you plz tell me which main points should to be add in our resume"
      });

      console.log("Gemini Responce: ", response.data.output);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  }


  return (
    <>

      {input ? (<div className="font-semibold flex flex-col gap-4 p-3.5 h-[80vh] w-[60vw]">
        <div className="text-[1.5rem]">{input}</div>
        <div className="text-[1rem] w-[55vw] h-[50px]">
          <div className="absolute  cursor-pointer flex flex-row gap-1 items-center justify-center">
            <Rocket size={18} />
            <p>Answer</p>
          </div>
          <div className="ml-24 absolute cursor-pointer flex flex-row gap-1 items-center justify-center">
            <BarChart size={18} />
            score
          </div>
        </div>
        <div className="text-[0.9rem] w-[56vw] v-[50vh] overflow-y-scroll [&::-webkit-scrollbar]:hidden">

        </div>

      </div>) : (<div className="font-semibold text-2xl">Check your resume score now !</div>)}

      <div className="flex items-center gap-3 justify-between font-sans dark:bg-neutral-950 rounded-3xl px-4 py-1 shadow-lg w-[55vw] min-h-[12vh]">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="relative">
          {fileName && (
            <div className="absolute -top-14 flex items-center gap-2 bg-gray-100 dark:bg-neutral-800 px-3 py-1 rounded-xl shadow-md animate-fadeIn">
              <p className="text-xs text-gray-700 dark:text-gray-200 truncate max-w-[120px]">
                {fileName.name}
              </p>
              <button
                onClick={handleRemoveFile}
                className="p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
              >
                <X onClick={() => setClick(true)} size={14} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          )}
          <label htmlFor="fileType"
            className="flex items-center justify-center w-10 h-10 dark:bg-neutral-800 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md">{fileLoading ? <Loader2 className="animate-spin" /> : <Plus className={`${click ? '' : 'text-gray-300'}`} />}</label>
          <input onChange={handleChooseFile} disabled={!!fileName} id="fileType" className="hidden" type="file" />
        </div>

        <Textarea
          onChange={(e) => { setInput(e.target.value) }}
          className={`justify-center mb-[-35px] items-center content-center h-[34%]`}
          placeholder="Type your message here." />
        <Button onClick={handleSendResponce} className={`rounded-2xl cursor-pointer`}>Send</Button>
      </div>
    </>
  );
}
