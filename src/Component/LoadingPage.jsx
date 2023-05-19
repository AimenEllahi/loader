import React, { useState, useEffect } from "react";
import TranslateIcon from "@mui/icons-material/Translate";
import LanguageIcon from "@mui/icons-material/Language";
import PublicIcon from "@mui/icons-material/Public";
import axios from "axios";
import "./index.css";

const LoadingPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loadingTime, setLoadingTime] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const downloadProgressHandler = (progressEvent) => {
    const { loaded, total } = progressEvent;
    const progress = Math.round((loaded / total) * 100);
    console.log(`Download Progress: ${progress}%`);
  };

  useEffect(() => {
    const fetchLoadingTime = async () => {
      try {
        const startTime = performance.now();

        const response = await axios.get("https://api.publicapis.org/entries", {
          onDownloadProgress: downloadProgressHandler,
        });

        const endTime = performance.now();
        const loadingTime = endTime - startTime;

        setLoadingTime(loadingTime);
        console.log("Loading time:", loadingTime);
      } catch (error) {
        console.error("Error fetching loading time:", error);
      }
    };

    fetchLoadingTime();
  }, []);

  return (
    <div className='icon-container'>
      <span
        className='text text-e'
        style={{
          fontSize: windowWidth < 800 ? 50 : 100,
          fontFamily: "bold",
        }}
      >
        E
      </span>
      <span
        className='text text-l'
        style={{
          fontSize: windowWidth < 800 ? 50 : 100,
          fontFamily: "bold",
        }}
      >
        L
      </span>
      <TranslateIcon
        className='icon translate'
        style={{
          fontSize: windowWidth < 800 ? 50 : 100,
        }}
      />
      <LanguageIcon
        className='icon language'
        style={{
          fontSize: windowWidth < 800 ? 50 : 100,
        }}
      />
      <PublicIcon
        className='icon public'
        style={{
          fontSize: windowWidth < 800 ? 50 : 100,
        }}
      />
    </div>
  );
};

export default LoadingPage;
