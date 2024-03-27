import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

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
          
          // Extraire le paramètre session_id du fragment
          const sessionId = new URLSearchParams(hashParams).get('session_id');

          // Effectuer une requête GET avec le token d'authentification inclus dans les en-têtes
          if (!sessionId) {
            console.error('Session ID not found in URL hash');
            return;
          }
          const response = await axios.get(`http://localhost:3000/checkout/success?session_id=${sessionId}`, {
            headers: {
              Authorization: Cookies.get('token'), // Inclure le token dans l'en-tête Authorization
            },
          });

          // Mettre à jour le message d'état avec le contenu de la réponse
          setMessage(response.data.message);
          setIsFetched(true); // Marquer la requête comme effectuée
        } catch (error) {
          // En cas d'erreur, afficher l'erreur dans la console
          console.error('Error fetching success message:', error);
        }
      };

      // Appeler la fonction fetchData
      fetchData();
    }
  }, [isFetched]); // Utilisez isFetched comme dépendance pour que useEffect soit déclenché uniquement lorsque isFetched change

  return (
    <div>
      <h2>Payment Successful</h2>
      <p>{message}</p>
    </div>
  );
};

export default SuccessPayment;
