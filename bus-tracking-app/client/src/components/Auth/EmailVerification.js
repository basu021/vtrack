import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EmailVerification = () => {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState('Verifying...');

  useEffect(() => {
    // Make a request to your backend to verify the email using the token
    // Update the verificationStatus state based on the response
    // Display appropriate messages to the user
    // You can use your authService or apiService for making API calls
  }, [token]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{verificationStatus}</p>
    </div>
  );
};

export default EmailVerification;
