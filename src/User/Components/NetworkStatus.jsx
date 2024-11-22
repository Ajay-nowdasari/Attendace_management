import React, { useState, useEffect } from 'react';

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsClosed(false); // Reopen the alert if network is restored
    };
    const handleOffline = () => {
      setIsOnline(false);
      setIsClosed(false); // Ensure the alert shows again if network goes offline
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    !isOnline && !isClosed && (
      <div
        className="alert alert-danger d-flex justify-content-between align-items-center text-center"
        style={{ position: 'fixed', top: 0, width: '100%', zIndex: 9999 }}
      >
        <span>No Internet Connection. Please check your network.</span>
        <button
          className="btn-close"
          aria-label="Close"
          onClick={() => setIsClosed(true)}
          style={{ background: 'none', border: 'none' }}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  );
};

export default NetworkStatus;
