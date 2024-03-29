import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL } from '../constants';
const SuccessPayment = () => {
  const [message, setMessage] = useState('');
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (!isFetched) {
      const fetchData = async () => {
        try {
          const url = window.location.href;
          const hashIndex = url.indexOf('#');
          const hashParams = hashIndex !== -1 ? url.slice(hashIndex + 1) : '';
          const sessionId = new URLSearchParams(hashParams).get('session_id');
          if (!sessionId) {
            console.error('Session ID not found in URL hash');
            return;
          }
          const response = await axios.get(`${API_URL}/checkout/success?session_id=${sessionId}`, {
            headers: {
              Authorization: Cookies.get('token'),
            },
          });
          setMessage(response.data.message);
          setIsFetched(true);
        } catch (error) {
          console.error('Error fetching success message:', error);
        }
      };
      fetchData();
    }
  }, [isFetched]); 

  return (
    <div>
      <h2>Payment Successful</h2>
      <p>{message}</p>
    </div>
  );
};

export default SuccessPayment;
