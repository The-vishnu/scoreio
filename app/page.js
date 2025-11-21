"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2, X, Rocket, GrapeIcon, BarChart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function Home() {
  const AnswerArea = [];
  const [fileName, setFileName] = useState(null);
  const [ansArea, setAnsArea] = useState([]);
  const [loading, setLoading] = useState(false);
  const [click, setClick] = useState(true);
  const [input, setInput] = useState("");
  const [fileLoading, setFileLoading] = useState(false);
  const scrollingRef = useRef(null)

  console.log(input);

  useEffect(() => {
    scrollingRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ansArea, loading]);

  // useEffect(() => {
  //   if(scrollRef.current){
  //     scrollRef.current.scrollTo({
  //       top: scrollRef.current.scrollHeight,
  //       behavior: "smooth"
  //     });
  //   }
  // }, [ansArea, loading]);


  useEffect(() => {
    if (!fileName) return;

    console.log("Selected file: ", fileName);
    setFileLoading(true);

    //simulate time for async work
    const timer = setTimeout(() => {
      setFileLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [fileName, click, setClick]);

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
      }
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
  }

  const handleSendResponce = async () => {
    try {
      setLoading(true)
      const response = await axios.post("http://localhost:5000/api/chat", {
        prompt: input
      });

      const ans = response.data.output

      console.log("Gemini Responce: ", ans);
      setAnsArea(prev => [...prev,
      {
        userInput: input,
        gemini: "Gemini",
        answar: ans
      }
      ]);
      setInput("");
    } catch (error) {
      setLoading(false);
      toast.error("Error! faild to send Query", {
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
      console.error("Axios Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-screen justify-between rounded-2xl w-full flex flex-col items-center">

        <div className="start mt- flex flex-col gap-10 overflow-y-auto  w-[60vw] max-h-fit h-[75vh]">

          {loading ? (<div> loading...</div>) : (
            <div className="flex flex-col gap-12">


              {Array.isArray(ansArea) && ansArea.map((item, index) => (
                <div key={index} className=" flex flex-col gap-6">
                  <div>
                    <span className="text-3xl font-semibold text-gray-700">
                      {item.userInput}
                    </span>
                  </div>

                  {/* Option section */}
                  <div className="flex flex-row gap-5">
                    <div className="flex flex-row cursor-pointer">
                      <Rocket />
                      <p>Answar</p>
                    </div>
                    <div className="flex flex-row cursor-pointer">
                      <BarChart />
                      <p>Score</p>
                    </div>
                  </div>

                  {/* Message area */}
                  <div>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw, rehypeHighlight]}
                      components={{
                        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-4 mb-2" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-4 mb-2" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-3 mb-2" {...props} />,
                        p: ({ node, ...props }) => <p className="mb-3 text-gray-800" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc ml-6 mb-3" {...props} />,
                        li: ({ node, ...props }) => <li className="leading-relaxed mb-1" {...props} />,
                        strong: ({ node, ...props }) => <strong className="font-bold text-black" {...props} />,
                        code: ({ node, inline, ...props }) =>
                          inline ? (
                            <code className="px-1 py-0.5 bg-gray-200 rounded text-sm" {...props} />
                          ) : (
                            <pre className="p-3 bg-gray-900 text-gray-100 rounded-lg overflow-auto text-sm mb-3">
                              <code {...props} />
                            </pre>
                          ),
                      }}
                    >
                      {item.answar}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}

              <div ref={scrollingRef}></div>

            </div>
          )}

        </div>

        <div className="flex absolute bottom-5 items-center bg-gray-200 gap-3 justify-between font-sans dark:bg-neutral-950 rounded-3xl px-4 py-1 shadow-lg w-[55vw] min-h-[12vh]">
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
          <div className="sticky bottom-0">
            <div className="flex flex-row mr-[55px] justify-between">

              <Textarea
                value={input}
                onChange={(e) => { setInput(e.target.value) }}
                className={`start justify-center items-center content-center w-[45vw] h-[34%]`}
                placeholder="Type your message here." />
              <Button onClick={handleSendResponce} className={`rounded-2xl cursor-pointer`}>Send</Button>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}
