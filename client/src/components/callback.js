import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/callback.css';

export function Callback() {
  const [isLoading, setIsLoading] = useState(true);
  const [playback, setPlayback] = useState(null);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    async function sendCodeToServer() {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          const response = await axios.post('http://localhost:3100/api/callback', { code });
          var accessToken = response.data.token.access_token;
          var refreshToken = response.data.token.refresh_token;
          if (accessToken && refreshToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Error sending code to server:', error);
        }
      } else {
        console.error('Code not found in URL');
      }
    }
    sendCodeToServer();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(async () => {
        try {
          const response = await axios.post('http://localhost:3100/api/spotify/getPlaying', {
            accessToken: localStorage.getItem('accessToken')
          }, 
          {
            headers: { 'Content-Type': 'application/json' }
          });

          console.log(response.data);
          setPlayback(response.data.playback);

        } catch (error) {
          console.error('Error fetching current playback:', error);
        }
      }, 1000); // Polls the server every second
  
      return () => clearInterval(interval);
    }
  }, [isLoading]);  

  if (isLoading) {
    return (
      <div>
        <h1>Callback</h1>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="message-feed">
        </div>
        {playback && playback.item && (
        <div className="content">
          <div className="playback">
            <img
              src={playback.item.images[0].url}
              alt="Cover art"
              className="cover-art"
            />
            <div className="song-info">
              <h3>{playback.item.name}</h3>
              <h4>{playback.item.show.name}</h4>
            </div>
          </div>
        </div>
      )}
      </div>
    );
  }
}