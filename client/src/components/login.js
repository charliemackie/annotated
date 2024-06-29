import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import '../css/login.css';

export function Login() {
  const [link, setLink] = useState('');

  useEffect(() => {
    axios.post('http://localhost:3100/api/authenticate')
      .then(res => {
        console.log(res);
        setLink(res.data.loginUrl);
      })
      .catch(error => {
        console.error('Error fetching login URL:', error);
      });
  }, []);

  return (
    <div className="login-container">
      <a href={link}>
        <Button>
          Start Listening!
        </Button>
      </a>
    </div>
  );
}
