import React, { useState, useEffect } from 'react';
import TranslateIcon from '@mui/icons-material/Translate';
import LanguageIcon from '@mui/icons-material/Language';
import PublicIcon from '@mui/icons-material/Public';
import axios from 'axios';
import "./index.css";

const LoadingPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loadingTime, setLoadingTime] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchLoadingTime = async () => {
      try {
        const startTime = performance.now();

        const response = await axios.get('https://api.publicapis.org/entries');

        const endTime = performance.now();
        const loadingTime = endTime - startTime;

        setLoadingTime(loadingTime);
        console.log('Loading time:', loadingTime);
      } catch (error) {
        console.error('Error fetching loading time:', error);
      }
    };

    fetchLoadingTime();
  }, []);

  const animationDelay = `${(loadingTime / 1000) * 80}%`; // Convert loading time to animation delay percentage

  return (
    <div className='icon-container'>
      <span
        className="text text-e"
        style={{
          fontSize: windowWidth < 800 ? 50 : 100,
          fontFamily: "bold",
          animationDelay: animationDelay,
        }}
      >
        E
      </span>
      <span
        className="text text-l"
        style={{
          fontSize: windowWidth < 800 ? 50 : 100,
          fontFamily: "bold",
          animationDelay: animationDelay,
        }}
      >
        L
      </span>
      <TranslateIcon
        className="icon translate"
        style={{
          fontSize: windowWidth < 800 ? 50 : 100,
          animationDelay: animationDelay,
        }}
      />
      <LanguageIcon
        className="icon language"
        style={{
          fontSize: windowWidth < 800 ? 50 : 100,
          animationDelay: animationDelay ,
        }}
      />
      <PublicIcon
        className="icon public"
        style={{
          fontSize: windowWidth < 800 ? 50 : 100,
          animationDelay: animationDelay,
        }}
      />
    </div>
  );
};

export default LoadingPage;
