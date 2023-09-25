"use client";
import { useState } from "react";

export default function Home() {
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaName, setMediaName] = useState("");
  const [design, setDesign] = useState("pointer-events-none ");
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("SEARCH");
  const fetchMedia = async () => {
    try {
      setMsg("SEARCHING");
      const response = await fetch("/api/fetchMedia", {
        method: "POST",
        body: JSON.stringify({ mediaUrl }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error);
      }

      const data = await response.json();
      setMediaName(data);
      setDesign("");
      setMsg("SEARCH");
    } catch (error) {
      setErrorMsg("Download Error !!! Please refresh...");
    }
  };

  return (
    <div className="space-y-7 mx-5">
      <h1 className="text-3xl text-center font-bold">
        YOUTUBE MEDIA DOWNLOADER
      </h1>
      <input
        type="text"
        value={mediaUrl}
        onChange={(e) => setMediaUrl(e.target.value)}
        placeholder="Paste your youtube link here..."
        className="border-2 text-2xl py-2 px-4 block m-auto w-full max-w-[600px]"
      />
      <button
        onClick={fetchMedia}
        className="bg-black text-white py-3 px-6 block m-auto"
      >
        {msg}
      </button>

      <div className={`${design} space-y-3`}>
        <div>
          <p className="font-bold text-center">Set Audio file download name</p>
          <input
            type="text"
            value={mediaName}
            onChange={(e) => setMediaName(e.target.value)}
            className="border-2 text-2xl py-2 px-4 block m-auto w-full max-w-[600px]"
          />
        </div>
        <a
          href={`/api/fetchMedia?mediaUrl=${mediaUrl}`}
          download={`${mediaName}_audio.mp3`}
          className="block"
        >
          <button className="bg-black text-white py-3 px-6 block m-auto">
            DOWNLOAD
          </button>
        </a>
      </div>

      {errorMsg ? (
        <p className="text-3xl text-red-600  font-extrabold text-center">
          ⚠️ {errorMsg}
        </p>
      ) : null}
    </div>
  );
}
